import * as Haptics from 'expo-haptics';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DhikrCard } from '@/components/DhikrCard';
import { ProgressBar, ProgressRing } from '@/components/Progress';
import { Button, Card, Icon, IconButton, Row, Screen, Segmented, T } from '@/components/ui';
import { getCategory } from '@/data/adhkar';
import type { Category } from '@/data/types';
import { formatNumber } from '@/i18n/strings';
import { useProgress } from '@/state/progress';
import { useSettings } from '@/state/settings';
import { ARABIC_FONT } from '@/theme/themes';

type Mode = 'focus' | 'list';

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const category = getCategory(id);
  if (!category) return null;
  return <Session category={category} />;
}

function Session({ category }: { category: Category }) {
  const { t, colors, settings, rtl } = useSettings();
  const progress = useProgress();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const lang = settings.language;
  const n = (x: number) => formatNumber(x, lang);

  const p = progress.progressOf(category.id);
  const items = category.items;
  const firstIncomplete = items.findIndex((i) => progress.countOf(category.id, i.id) < i.repeat);

  const [mode, setMode] = useState<Mode>('focus');
  const [index, setIndex] = useState(Math.max(0, firstIncomplete));
  // Show the celebration when opening an already finished routine, and when finishing it.
  const [celebrate, setCelebrate] = useState(p.complete);
  const listRef = useRef<FlatList>(null);
  const wasComplete = useRef(p.complete);

  useEffect(() => {
    if (p.complete && !wasComplete.current) {
      if (settings.haptics) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      const timer = setTimeout(() => setCelebrate(true), 450);
      wasComplete.current = true;
      return () => clearTimeout(timer);
    }
    wasComplete.current = p.complete;
  }, [p.complete, settings.haptics]);

  const goTo = (i: number, animated = true) => {
    const next = Math.max(0, Math.min(items.length - 1, i));
    setIndex(next);
    listRef.current?.scrollToIndex({ index: next, animated });
  };

  const onMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setIndex(Math.round(e.nativeEvent.contentOffset.x / width));
  };

  const item = items[index];
  const count = progress.countOf(category.id, item.id);

  const tap = () => {
    if (count >= item.repeat) {
      goTo(index + 1);
      return;
    }
    const next = progress.increment(category.id, item.id);
    const done = next >= item.repeat;
    if (settings.haptics) {
      (done
        ? Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
        : Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      ).catch(() => {});
    }
    if (done && settings.autoAdvance && index < items.length - 1) {
      setTimeout(() => goTo(index + 1), 380);
    }
  };

  const restart = () => {
    progress.resetCategory(category.id);
    wasComplete.current = false;
    setCelebrate(false);
    setMode('focus');
    setTimeout(() => goTo(0, false), 0);
  };

  const back = () => (router.canGoBack() ? router.back() : router.replace('/'));

  return (
    <Screen>
      {/* Header */}
      <View style={styles.header}>
        <Row style={{ gap: 12 }}>
          <IconButton icon={rtl ? 'arrow-right' : 'arrow-left'} label={t.backHome} onPress={back} />
          <View style={{ flex: 1 }}>
            <T variant="title" numberOfLines={1}>
              {category.title[lang]}
            </T>
          </View>
          <IconButton icon="restart" label={t.restart} onPress={restart} />
        </Row>

        <Row style={{ justifyContent: 'space-between', marginTop: 16, marginBottom: 8 }}>
          <T variant="label" muted>
            {n(p.done)} / {n(p.total)}
          </T>
          <T variant="label" color={colors.primary}>
            {n(Math.round((p.done / p.total) * 100))}%
          </T>
        </Row>
        <ProgressBar value={p.done / p.total} height={10} />

        {!celebrate && (
          <View style={{ marginTop: 14 }}>
            <Segmented
              value={mode}
              onChange={(m) => {
                setMode(m);
                if (m === 'focus') setTimeout(() => goTo(index, false), 0);
              }}
              options={[
                { id: 'focus', label: t.focusMode, icon: 'target' },
                { id: 'list', label: t.listMode, icon: 'format-list-checks' },
              ]}
            />
          </View>
        )}
      </View>

      {celebrate ? (
        <Completion
          category={category}
          onHome={back}
          onRestart={restart}
          onReview={() => {
            setCelebrate(false);
            setMode('list');
          }}
        />
      ) : mode === 'focus' ? (
        <View style={{ flex: 1 }}>
          <FlatList
            ref={listRef}
            data={items}
            extraData={progress}
            keyExtractor={(i) => i.id}
            horizontal
            pagingEnabled
            inverted={rtl}
            initialScrollIndex={index}
            getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={onMomentumEnd}
            renderItem={({ item: d }) => (
              <Pressable style={{ width, paddingHorizontal: 20, paddingVertical: 12 }} onPress={tap}>
                <DhikrCard item={d} count={progress.countOf(category.id, d.id)} />
              </Pressable>
            )}
          />

          {/* Counter */}
          <Row style={[styles.controls, { paddingBottom: 16 + insets.bottom }]}>
            <IconButton
              icon={rtl ? 'chevron-right' : 'chevron-left'}
              label={t.previous}
              onPress={() => goTo(index - 1)}
            />
            <View style={{ alignItems: 'center', gap: 6 }}>
              <Counter value={count} target={item.repeat} onPress={tap} />
              <T variant="caption" muted style={{ textAlign: 'center' }}>
                {n(index + 1)} / {n(items.length)} · {t.tapToCount}
              </T>
            </View>
            <IconButton
              icon={rtl ? 'chevron-left' : 'chevron-right'}
              label={t.next}
              onPress={() => goTo(index + 1)}
            />
          </Row>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(i) => i.id}
          contentContainerStyle={{ padding: 20, paddingBottom: 40 + insets.bottom, gap: 10 }}
          renderItem={({ index: i }) => (
            <ListRow
              category={category}
              index={i}
              onOpen={() => {
                setMode('focus');
                setIndex(i);
                setTimeout(() => goTo(i, false), 0);
              }}
            />
          )}
        />
      )}
    </Screen>
  );
}

/** Big circular tap target showing repetitions. */
function Counter({ value, target, onPress }: { value: number; target: number; onPress: () => void }) {
  const { colors, settings } = useSettings();
  const scale = useRef(new Animated.Value(1)).current;
  const done = value >= target;

  const pulse = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.92, duration: 70, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 4, useNativeDriver: true }),
    ]).start();
    onPress();
  };

  return (
    <Pressable onPress={pulse} accessibilityRole="button" accessibilityLabel={`${value} / ${target}`}>
      <Animated.View style={{ transform: [{ scale }] }}>
        <ProgressRing value={value / target} size={112} stroke={9} color={done ? colors.success : colors.primary}>
          <View
            style={[
              styles.counterInner,
              { backgroundColor: done ? colors.success : colors.primary },
            ]}>
            {done ? (
              <Icon name="check" size={38} color={colors.onPrimary} />
            ) : (
              <>
                <Text style={[styles.counterText, { color: colors.onPrimary }]}>
                  {formatNumber(value, settings.language)}
                </Text>
                <Text style={{ color: colors.onPrimary, fontSize: 13, fontWeight: '600', opacity: 0.75 }}>
                  {formatNumber(target, settings.language)}
                </Text>
              </>
            )}
          </View>
        </ProgressRing>
      </Animated.View>
    </Pressable>
  );
}

function ListRow({ category, index, onOpen }: { category: Category; index: number; onOpen: () => void }) {
  const { colors, settings, theme } = useSettings();
  const progress = useProgress();
  const item = category.items[index];
  const count = progress.countOf(category.id, item.id);
  const done = count >= item.repeat;
  const lang = settings.language;

  const toggle = () => {
    progress.setCount(category.id, item.id, done ? 0 : item.repeat);
    if (settings.haptics) Haptics.selectionAsync().catch(() => {});
  };

  return (
    <Card style={{ padding: 14, opacity: done ? 0.75 : 1 }} onPress={onOpen}>
      <Row style={{ gap: 12, alignItems: 'flex-start' }}>
        <Pressable
          onPress={toggle}
          hitSlop={10}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: done }}
          style={[
            styles.check,
            {
              borderRadius: Math.min(theme.radius.control, 14),
              borderColor: done ? colors.success : colors.border,
              backgroundColor: done ? colors.success : 'transparent',
            },
          ]}>
          {done ? (
            <Icon name="check" size={18} color={colors.onPrimary} />
          ) : (
            <Text style={{ color: colors.textMuted, fontSize: 12, fontWeight: '700' }}>
              {formatNumber(index + 1, lang)}
            </Text>
          )}
        </Pressable>
        <View style={{ flex: 1, gap: 6 }}>
          <Text
            numberOfLines={2}
            style={{
              fontFamily: ARABIC_FONT,
              fontSize: Math.round(18 * settings.arabicScale),
              lineHeight: Math.round(18 * settings.arabicScale * 1.8),
              color: colors.text,
              textAlign: 'right',
              writingDirection: 'rtl',
            }}>
            {item.arabic}
          </Text>
          <Row style={{ gap: 8 }}>
            <View style={{ flex: 1 }}>
              <ProgressBar value={count / item.repeat} height={4} color={done ? colors.success : undefined} />
            </View>
            <T variant="caption" muted>
              {formatNumber(count, lang)}/{formatNumber(item.repeat, lang)}
            </T>
          </Row>
        </View>
      </Row>
    </Card>
  );
}

function Completion({
  category,
  onHome,
  onRestart,
  onReview,
}: {
  category: Category;
  onHome: () => void;
  onRestart: () => void;
  onReview: () => void;
}) {
  const { t, colors } = useSettings();
  const appear = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(appear, { toValue: 1, friction: 6, useNativeDriver: true }).start();
  }, [appear]);

  return (
    <View style={styles.completion}>
      <Animated.View
        style={{
          width: '100%',
          opacity: appear,
          transform: [{ scale: appear.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1] }) }],
        }}>
        <Card tone="container" style={{ padding: 28, alignItems: 'center', gap: 14 }}>
          <ProgressRing value={1} size={104} stroke={8} color={colors.success} trackColor={colors.surface}>
            <Icon name={category.icon} size={40} color={colors.onPrimaryContainer} />
          </ProgressRing>
          <T variant="title" color={colors.onPrimaryContainer} style={{ textAlign: 'center' }}>
            {t.completedTitle}
          </T>
          <Text
            style={{
              fontFamily: ARABIC_FONT,
              fontSize: 26,
              lineHeight: 48,
              color: colors.onPrimaryContainer,
              textAlign: 'center',
            }}>
            {t.completedArabic}
          </Text>
          <T variant="body" color={colors.onPrimaryContainer} style={{ textAlign: 'center' }}>
            {t.completedBody}
          </T>
        </Card>
      </Animated.View>
      <View style={{ width: '100%', gap: 10, marginTop: 20 }}>
        <Button label={t.backHome} icon="home-heart" onPress={onHome} />
        <Button label={t.review} icon="format-list-checks" variant="tonal" onPress={onReview} />
        <Button label={t.restart} icon="restart" variant="outline" onPress={onRestart} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingTop: 8 },
  controls: { justifyContent: 'space-between', paddingHorizontal: 28, paddingTop: 4 },
  counterInner: { width: 86, height: 86, borderRadius: 43, alignItems: 'center', justifyContent: 'center' },
  counterText: { fontSize: 30, fontWeight: '800', lineHeight: 34 },
  check: { width: 30, height: 30, borderWidth: 2, alignItems: 'center', justifyContent: 'center', marginTop: 4 },
  completion: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
});
