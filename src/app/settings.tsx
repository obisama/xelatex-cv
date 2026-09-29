import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

import { Card, Icon, IconButton, Row, Screen, Segmented, T } from '@/components/ui';
import { LANGUAGES } from '@/i18n/strings';
import { useProgress } from '@/state/progress';
import { useSettings, type Appearance } from '@/state/settings';
import { ARABIC_FONT, THEME_ORDER, THEMES } from '@/theme/themes';

const SCALES = [0.85, 1, 1.2, 1.4];

export default function SettingsScreen() {
  const { t, colors, settings, update, rtl, isDark, theme } = useSettings();
  const { resetToday } = useProgress();
  const [resetDone, setResetDone] = useState(false);
  const lang = settings.language;

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Row style={{ gap: 12, marginBottom: 8 }}>
          <IconButton
            icon={rtl ? 'arrow-right' : 'arrow-left'}
            label={t.backHome}
            onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}
          />
          <T variant="title">{t.settings}</T>
        </Row>

        <Section icon="translate" title={t.language}>
          <Segmented
            value={lang}
            onChange={(language) => update({ language })}
            options={LANGUAGES.map((l) => ({ id: l.id, label: l.label }))}
          />
        </Section>

        <Section icon="theme-light-dark" title={t.appearance}>
          <Segmented<Appearance>
            value={settings.appearance}
            onChange={(appearance) => update({ appearance })}
            options={[
              { id: 'system', label: t.appearanceSystem, icon: 'cellphone' },
              { id: 'light', label: t.appearanceLight, icon: 'white-balance-sunny' },
              { id: 'dark', label: t.appearanceDark, icon: 'moon-waning-crescent' },
            ]}
          />
        </Section>

        <Section icon="palette" title={t.theme}>
          <View style={{ gap: 10 }}>
            {THEME_ORDER.map((id) => {
              const th = THEMES[id];
              const pal = isDark ? th.dark : th.light;
              const active = settings.themeId === id;
              return (
                <Pressable
                  key={id}
                  onPress={() => update({ themeId: id })}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: active }}
                  style={[
                    styles.themeRow,
                    {
                      flexDirection: rtl ? 'row-reverse' : 'row',
                      backgroundColor: pal.background,
                      borderRadius: theme.radius.card * 0.6,
                      borderColor: active ? colors.primary : colors.border,
                      borderWidth: active ? 2 : 1,
                    },
                  ]}>
                  {/* Mini preview of the theme */}
                  <View
                    style={[
                      styles.swatch,
                      { backgroundColor: pal.surface, borderRadius: th.radius.control, borderColor: pal.border },
                    ]}>
                    <View style={{ flexDirection: 'row', gap: 3 }}>
                      <View style={[styles.chip, { backgroundColor: pal.primary }]} />
                      <View style={[styles.chip, { backgroundColor: pal.accent }]} />
                      <View style={[styles.chip, { backgroundColor: pal.primaryContainer }]} />
                    </View>
                    <Text style={{ fontFamily: ARABIC_FONT, color: pal.text, fontSize: 16 }}>ذِكْر</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        color: pal.text,
                        fontSize: 16,
                        fontWeight: th.headingFont ? 'normal' : '700',
                        fontFamily: th.headingFont,
                        textAlign: rtl ? 'right' : 'left',
                      }}>
                      {th.name[lang]}
                    </Text>
                    <Text style={{ color: pal.textMuted, fontSize: 12, textAlign: rtl ? 'right' : 'left' }}>
                      {th.description[lang]}
                    </Text>
                  </View>
                  {active && <Icon name="check-circle" color={pal.primary} />}
                </Pressable>
              );
            })}
          </View>
        </Section>

        <Section icon="format-size" title={t.reading}>
          <Card style={{ padding: 16, gap: 14 }}>
            <T variant="label" muted>
              {t.arabicSize}
            </T>
            <Segmented
              value={String(settings.arabicScale)}
              onChange={(v) => update({ arabicScale: Number(v) })}
              options={SCALES.map((s) => ({ id: String(s), label: `${Math.round(s * 100)}%` }))}
            />
            <Text
              style={{
                fontFamily: ARABIC_FONT,
                fontSize: 24 * settings.arabicScale,
                lineHeight: 24 * settings.arabicScale * 1.9,
                color: colors.text,
                textAlign: 'center',
              }}>
              سُبْحَانَ اللَّهِ وَبِحَمْدِهِ
            </Text>
          </Card>
          <Card style={{ marginTop: 10 }}>
            {lang !== 'ar' && (
              <Toggle
                label={t.showTranslation}
                value={settings.showTranslation}
                onChange={(showTranslation) => update({ showTranslation })}
              />
            )}
            <Toggle
              label={t.autoAdvance}
              value={settings.autoAdvance}
              onChange={(autoAdvance) => update({ autoAdvance })}
            />
            <Toggle label={t.haptics} value={settings.haptics} onChange={(haptics) => update({ haptics })} last />
          </Card>
        </Section>

        <Section icon="database" title={t.data}>
          <Card
            style={{ padding: 16 }}
            onPress={() => {
              resetToday();
              setResetDone(true);
            }}>
            <Row style={{ gap: 12 }}>
              <Icon name={resetDone ? 'check' : 'restart'} color={resetDone ? colors.success : colors.accent} />
              <T variant="heading">{resetDone ? t.resetDone : t.resetToday}</T>
            </Row>
          </Card>
        </Section>

        <T variant="caption" muted style={{ marginTop: 24, textAlign: 'center' }}>
          {t.about}
        </T>
      </ScrollView>
    </Screen>
  );
}

function Section({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  const { colors } = useSettings();
  return (
    <View style={{ marginTop: 24 }}>
      <Row style={{ gap: 8, marginBottom: 10 }}>
        <Icon name={icon} size={18} color={colors.primary} />
        <T variant="label" muted style={{ textTransform: 'uppercase' }}>
          {title}
        </T>
      </Row>
      {children}
    </View>
  );
}

function Toggle({
  label,
  value,
  onChange,
  last,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
  last?: boolean;
}) {
  const { colors } = useSettings();
  return (
    <Row
      style={{
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: last ? 0 : StyleSheet.hairlineWidth,
        borderBottomColor: colors.border,
        gap: 12,
      }}>
      <View style={{ flex: 1 }}>
        <T variant="body">{label}</T>
      </View>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ true: colors.primary, false: colors.track }}
        thumbColor={colors.surface}
      />
    </Row>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, paddingBottom: 48 },
  themeRow: { alignItems: 'center', gap: 14, padding: 12 },
  swatch: {
    width: 64,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    borderWidth: 1,
  },
  chip: { width: 12, height: 12, borderRadius: 6 },
});
