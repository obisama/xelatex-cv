import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { ComponentProps, ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View, type StyleProp, type TextStyle, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useSettings } from '@/state/settings';
import { PatternBackground } from './PatternBackground';

export type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

export function Icon({ name, size = 22, color }: { name: string; size?: number; color?: string }) {
  const { colors } = useSettings();
  return <MaterialCommunityIcons name={name as IconName} size={size} color={color ?? colors.text} />;
}

export function Screen({ children }: { children: ReactNode }) {
  const { colors } = useSettings();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <PatternBackground />
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
        {children}
      </SafeAreaView>
    </View>
  );
}

/** Row that follows the reading direction of the UI language. */
export function Row({ style, children }: { style?: StyleProp<ViewStyle>; children: ReactNode }) {
  const { rtl } = useSettings();
  return <View style={[{ flexDirection: rtl ? 'row-reverse' : 'row', alignItems: 'center' }, style]}>{children}</View>;
}

type TextVariant = 'display' | 'title' | 'heading' | 'body' | 'label' | 'caption';

const sizes: Record<TextVariant, TextStyle> = {
  display: { fontSize: 30, fontWeight: '700', letterSpacing: -0.5 },
  title: { fontSize: 22, fontWeight: '700' },
  heading: { fontSize: 17, fontWeight: '600' },
  body: { fontSize: 15, lineHeight: 22 },
  label: { fontSize: 13, fontWeight: '600', letterSpacing: 0.3 },
  caption: { fontSize: 12 },
};

export function T({
  variant = 'body',
  muted,
  color,
  style,
  children,
  numberOfLines,
}: {
  variant?: TextVariant;
  muted?: boolean;
  color?: string;
  style?: StyleProp<TextStyle>;
  children: ReactNode;
  numberOfLines?: number;
}) {
  const { colors, rtl, theme } = useSettings();
  const isHeading = variant === 'display' || variant === 'title' || variant === 'heading';
  const fontFamily = isHeading && theme.headingFont ? theme.headingFont : undefined;
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        sizes[variant],
        { color: color ?? (muted ? colors.textMuted : colors.text), textAlign: rtl ? 'right' : 'left' },
        fontFamily && { fontFamily, fontWeight: 'normal' },
        style,
      ]}>
      {children}
    </Text>
  );
}

export function Card({
  children,
  style,
  onPress,
  tone = 'surface',
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  tone?: 'surface' | 'primary' | 'container';
}) {
  const { colors, theme, isDark } = useSettings();
  const bg = tone === 'primary' ? colors.primary : tone === 'container' ? colors.primaryContainer : colors.surface;
  const base: ViewStyle = {
    backgroundColor: bg,
    borderRadius: theme.radius.card,
    ...(theme.outlined
      ? { borderWidth: StyleSheet.hairlineWidth * 2, borderColor: colors.border }
      : {
          shadowColor: '#000',
          shadowOpacity: isDark ? 0 : 0.06,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 4 },
          elevation: isDark ? 0 : 2,
        }),
  };
  if (!onPress) return <View style={[base, style]}>{children}</View>;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [base, style, pressed && { opacity: 0.85, transform: [{ scale: 0.985 }] }]}>
      {children}
    </Pressable>
  );
}

export function IconButton({
  icon,
  onPress,
  label,
  color,
  background,
}: {
  icon: string;
  onPress: () => void;
  label: string;
  color?: string;
  background?: string;
}) {
  const { colors, theme } = useSettings();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={8}
      onPress={onPress}
      style={({ pressed }) => ({
        width: 44,
        height: 44,
        borderRadius: theme.radius.control,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: background ?? colors.surfaceAlt,
        opacity: pressed ? 0.7 : 1,
      })}>
      <Icon name={icon} color={color ?? colors.text} />
    </Pressable>
  );
}

export function Button({
  label,
  onPress,
  icon,
  variant = 'filled',
  style,
}: {
  label: string;
  onPress: () => void;
  icon?: string;
  variant?: 'filled' | 'tonal' | 'outline';
  style?: StyleProp<ViewStyle>;
}) {
  const { colors, theme } = useSettings();
  const fg =
    variant === 'filled' ? colors.onPrimary : variant === 'tonal' ? colors.onPrimaryContainer : colors.primary;
  const bg =
    variant === 'filled' ? colors.primary : variant === 'tonal' ? colors.primaryContainer : 'transparent';
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        {
          height: 50,
          paddingHorizontal: 22,
          borderRadius: theme.radius.control,
          backgroundColor: bg,
          borderWidth: variant === 'outline' ? 1.5 : 0,
          borderColor: colors.primary,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: pressed ? 0.8 : 1,
        },
        style,
      ]}>
      <Row style={{ gap: 8 }}>
        {icon && <Icon name={icon} size={20} color={fg} />}
        <Text style={{ color: fg, fontSize: 15, fontWeight: '700' }}>{label}</Text>
      </Row>
    </Pressable>
  );
}

/** Pill-shaped segmented control. */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { id: T; label: string; icon?: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  const { colors, theme, rtl } = useSettings();
  return (
    <View
      style={{
        flexDirection: rtl ? 'row-reverse' : 'row',
        backgroundColor: colors.surfaceAlt,
        borderRadius: theme.radius.control,
        padding: 4,
        gap: 4,
      }}>
      {options.map((o) => {
        const active = o.id === value;
        return (
          <Pressable
            key={o.id}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            onPress={() => onChange(o.id)}
            style={{
              flex: 1,
              paddingVertical: 9,
              borderRadius: Math.max(theme.radius.control - 4, 2),
              backgroundColor: active ? colors.surface : 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              gap: 6,
            }}>
            {o.icon && <Icon name={o.icon} size={16} color={active ? colors.primary : colors.textMuted} />}
            <Text style={{ fontSize: 13, fontWeight: '600', color: active ? colors.text : colors.textMuted }}>
              {o.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
