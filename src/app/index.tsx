import { router } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ProgressBar, ProgressRing } from '@/components/Progress';
import { Button, Card, Icon, IconButton, Row, Screen, T } from '@/components/ui';
import { CATEGORIES, suggestedCategoryId } from '@/data/adhkar';
import type { Category } from '@/data/types';
import { formatNumber } from '@/i18n/strings';
import { useProgress } from '@/state/progress';
import { useSettings } from '@/state/settings';
import { dayKey } from '@/state/storage';

function greetingKey(h: number) {
  if (h >= 3 && h < 12) return 'greetingMorning' as const;
  if (h >= 12 && h < 21) return 'greetingEvening' as const;
  return 'greetingNight' as const;
}

const open = (id: string) => router.push({ pathname: '/category/[id]', params: { id } });

export default function Home() {
  const { t, colors, settings, rtl } = useSettings();
  const { progressOf, streak, history } = useProgress();
  const lang = settings.language;
  const n = (x: number) => formatNumber(x, lang);

  const daily = CATEGORIES.filter((c) => c.daily);
  const occasions = CATEGORIES.filter((c) => !c.daily);
  const totals = daily.map((c) => progressOf(c.id));
  const done = totals.reduce((s, p) => s + p.done, 0);
  const total = totals.reduce((s, p) => s + p.total, 0);

  const suggested = CATEGORIES.find((c) => c.id === suggestedCategoryId())!;
  const sp = progressOf(suggested.id);

  // Last seven days, oldest first.
  const week = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const key = dayKey(d);
    return { key, label: d.getDate(), done: (history[key] ?? []).some((id) => daily.some((c) => c.id === id)) };
  });
  const todayKey = dayKey();

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Row style={{ justifyContent: 'space-between', marginBottom: 20 }}>
          <View style={{ flex: 1 }}>
            <T variant="label" muted>
              {t[greetingKey(new Date().getHours())]}
            </T>
            <T variant="display">{t.appName}</T>
          </View>
          <IconButton icon="cog" label={t.settings} onPress={() => router.push('/settings')} />
        </Row>

        {/* Today overview */}
        <Card tone="container" style={styles.hero}>
          <Row style={{ gap: 18 }}>
            <ProgressRing
              value={total ? done / total : 0}
              size={108}
              stroke={10}
              color={colors.primary}
              trackColor={colors.surface}>
              <T variant="title" color={colors.onPrimaryContainer} style={{ textAlign: 'center' }}>
                {n(Math.round(total ? (done / total) * 100 : 0))}%
              </T>
            </ProgressRing>
            <View style={{ flex: 1, gap: 6 }}>
              <T variant="heading" color={colors.onPrimaryContainer}>
                {t.todayProgress}
              </T>
              <T variant="body" color={colors.onPrimaryContainer}>
                {n(done)} / {n(total)} {t.itemsDone}
              </T>
              <Row style={{ gap: 6 }}>
                <Icon name="fire" size={18} color={colors.accent} />
                <T variant="label" color={colors.onPrimaryContainer}>
                  {n(streak)} {streak === 1 ? t.dayStreak : t.dayStreakPlural}
                </T>
              </Row>
            </View>
          </Row>
          <Row style={{ justifyContent: 'space-between', marginTop: 18 }}>
            {(rtl ? [...week].reverse() : week).map((d) => (
              <View key={d.key} style={{ alignItems: 'center', gap: 6 }}>
                <View
                  style={[
                    styles.dot,
                    {
                      backgroundColor: d.done ? colors.primary : 'transparent',
                      borderColor: d.key === todayKey ? colors.primary : colors.onPrimaryContainer + '40',
                    },
                  ]}>
                  {d.done && <Icon name="check" size={14} color={colors.onPrimary} />}
                </View>
                <T variant="caption" color={colors.onPrimaryContainer} style={{ textAlign: 'center' }}>
                  {n(d.label)}
                </T>
              </View>
            ))}
          </Row>
        </Card>

        {/* Suggested routine */}
        <T variant="label" muted style={styles.section}>
          {t.suggested}
        </T>
        <Card style={{ padding: 20, gap: 14 }} onPress={() => open(suggested.id)}>
          <Row style={{ gap: 14 }}>
            <View style={[styles.iconBubble, { backgroundColor: colors.primary }]}>
              <Icon name={suggested.icon} size={26} color={colors.onPrimary} />
            </View>
            <View style={{ flex: 1 }}>
              <T variant="title">{suggested.title[lang]}</T>
              <T variant="body" muted>
                {suggested.subtitle[lang]}
              </T>
            </View>
          </Row>
          <ProgressBar value={sp.done / sp.total} height={10} />
          <Row style={{ justifyContent: 'space-between' }}>
            <T variant="label" muted>
              {n(sp.done)}/{n(sp.total)}
            </T>
            <Button
              label={sp.complete ? t.review : sp.reps > 0 ? t.continue : t.start}
              icon={sp.complete ? 'check-circle' : 'play'}
              onPress={() => open(suggested.id)}
            />
          </Row>
        </Card>

        <T variant="label" muted style={styles.section}>
          {t.daily}
        </T>
        <View style={{ gap: 12 }}>
          {daily.map((c) => (
            <CategoryRow key={c.id} category={c} />
          ))}
        </View>

        <T variant="label" muted style={styles.section}>
          {t.occasions}
        </T>
        <Row style={{ flexWrap: 'wrap', gap: 12, alignItems: 'stretch' }}>
          {occasions.map((c) => (
            <CategoryTile key={c.id} category={c} />
          ))}
        </Row>

        <T variant="caption" muted style={{ marginTop: 28, textAlign: 'center' }}>
          {t.about}
        </T>
      </ScrollView>
    </Screen>
  );
}

function CategoryRow({ category }: { category: Category }) {
  const { colors, settings } = useSettings();
  const p = useProgress().progressOf(category.id);
  const n = (x: number) => formatNumber(x, settings.language);
  return (
    <Card style={{ padding: 16 }} onPress={() => open(category.id)}>
      <Row style={{ gap: 14 }}>
        <View style={[styles.iconBubbleSm, { backgroundColor: colors.surfaceAlt }]}>
          <Icon name={p.complete ? 'check' : category.icon} color={p.complete ? colors.success : colors.primary} />
        </View>
        <View style={{ flex: 1, gap: 8 }}>
          <Row style={{ justifyContent: 'space-between' }}>
            <T variant="heading">{category.title[settings.language]}</T>
            <T variant="label" muted>
              {n(p.done)}/{n(p.total)}
            </T>
          </Row>
          <ProgressBar value={p.done / p.total} height={6} color={p.complete ? colors.success : undefined} />
        </View>
      </Row>
    </Card>
  );
}

function CategoryTile({ category }: { category: Category }) {
  const { colors, settings } = useSettings();
  const p = useProgress().progressOf(category.id);
  return (
    <Card style={styles.tile} onPress={() => open(category.id)}>
      <Row style={{ justifyContent: 'space-between' }}>
        <View style={[styles.iconBubbleSm, { backgroundColor: colors.surfaceAlt }]}>
          <Icon name={category.icon} color={colors.primary} />
        </View>
        {p.complete && <Icon name="check-circle" size={20} color={colors.success} />}
      </Row>
      <View style={{ gap: 2 }}>
        <T variant="heading" numberOfLines={1}>
          {category.title[settings.language]}
        </T>
        <T variant="caption" muted numberOfLines={2}>
          {category.subtitle[settings.language]}
        </T>
      </View>
      <ProgressBar value={p.total ? p.done / p.total : 0} height={4} color={p.complete ? colors.success : undefined} />
    </Card>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, paddingBottom: 48 },
  hero: { padding: 20 },
  dot: { width: 26, height: 26, borderRadius: 13, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  section: { marginTop: 28, marginBottom: 12, textTransform: 'uppercase' },
  iconBubble: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
  iconBubbleSm: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center' },
  tile: { flexBasis: '47%', flexGrow: 1, padding: 16, gap: 12 },
});
