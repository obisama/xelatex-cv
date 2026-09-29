import { ScrollView, StyleSheet, Text, View } from 'react-native';

import type { Dhikr } from '@/data/types';
import { localize, translate } from '@/data/types';
import { formatNumber } from '@/i18n/strings';
import { useSettings } from '@/state/settings';
import { ARABIC_FONT } from '@/theme/themes';
import { Card, Icon, Row, T } from './ui';

/** The full text of one remembrance, scrollable when long. */
export function DhikrCard({ item, count }: { item: Dhikr; count: number }) {
  const { colors, settings, t, theme } = useSettings();
  const lang = settings.language;
  const translation = settings.showTranslation ? translate(item.translation, lang) : undefined;
  const note = localize(item.note, lang);
  const complete = count >= item.repeat;
  const fontSize = Math.round(24 * settings.arabicScale);

  return (
    <Card style={[styles.card, complete && { borderColor: colors.success, borderWidth: 1.5 }]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Row style={{ justifyContent: 'space-between', marginBottom: 16 }}>
          <View
            style={[
              styles.badge,
              { backgroundColor: colors.surfaceAlt, borderRadius: theme.radius.control },
            ]}>
            <Icon name="restart" size={14} color={colors.textMuted} />
            <Text style={{ color: colors.textMuted, fontSize: 12, fontWeight: '600' }}>
              {item.repeat === 1 ? t.once : `${formatNumber(item.repeat, lang)} ${t.times}`}
            </Text>
          </View>
          {complete && <Icon name="check-circle" size={22} color={colors.success} />}
        </Row>

        <Text
          style={{
            fontFamily: ARABIC_FONT,
            fontSize,
            lineHeight: fontSize * 1.9,
            color: colors.text,
            textAlign: 'center',
            writingDirection: 'rtl',
          }}>
          {item.arabic}
        </Text>

        {translation && (
          <>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <T variant="body" muted style={{ textAlign: 'center', lineHeight: 23 }}>
              {translation}
            </T>
          </>
        )}

        {note && (
          <View style={[styles.note, { backgroundColor: colors.surfaceAlt, borderRadius: theme.radius.control }]}>
            <T variant="caption">{note}</T>
          </View>
        )}

        <T variant="caption" muted style={{ textAlign: 'center', marginTop: 18 }}>
          {t.source}: {item.source}
        </T>
      </ScrollView>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, overflow: 'hidden' },
  scroll: { padding: 22, paddingBottom: 28 },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 5 },
  divider: { height: 1, marginVertical: 18, marginHorizontal: 40 },
  note: { padding: 12, marginTop: 16 },
});
