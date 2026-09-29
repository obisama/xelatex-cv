import { useEffect, useRef, type ReactNode } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { useSettings } from '@/state/settings';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

function useAnimatedValue(target: number) {
  const value = useRef(new Animated.Value(target)).current;
  useEffect(() => {
    Animated.timing(value, {
      toValue: target,
      duration: 450,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [target, value]);
  return value;
}

export function ProgressBar({
  value,
  height = 8,
  color,
}: {
  /** 0..1 */
  value: number;
  height?: number;
  color?: string;
}) {
  const { colors, rtl } = useSettings();
  const anim = useAnimatedValue(Math.max(0, Math.min(1, value)));
  const width = anim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });
  return (
    <View
      style={[
        styles.track,
        { height, borderRadius: height / 2, backgroundColor: colors.track },
        rtl && { flexDirection: 'row-reverse' },
      ]}>
      <Animated.View
        style={{ width, height, borderRadius: height / 2, backgroundColor: color ?? colors.primary }}
      />
    </View>
  );
}

export function ProgressRing({
  value,
  size = 120,
  stroke = 10,
  color,
  trackColor,
  children,
}: {
  value: number;
  size?: number;
  stroke?: number;
  color?: string;
  trackColor?: string;
  children?: ReactNode;
}) {
  const { colors } = useSettings();
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const anim = useAnimatedValue(Math.max(0, Math.min(1, value)));
  const dashOffset = anim.interpolate({ inputRange: [0, 1], outputRange: [circumference, 0] });

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={trackColor ?? colors.track}
          strokeWidth={stroke}
          fill="none"
        />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color ?? colors.primary}
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={dashOffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  track: { width: '100%', overflow: 'hidden', flexDirection: 'row' },
});
