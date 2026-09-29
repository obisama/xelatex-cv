import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Defs, G, Line, Path, Pattern, Polygon, Rect } from 'react-native-svg';

import { useSettings } from '@/state/settings';

/**
 * Full-screen decorative background. Each theme picks a tile:
 * dots (modern), an eight-pointed star lattice (manuscript) or a zellige
 * rosette (andalus).
 */
export function PatternBackground() {
  const { theme, colors, isDark } = useSettings();
  if (theme.pattern === 'none') return null;
  const opacity = theme.patternOpacity * (isDark ? 0.8 : 1);
  const c = colors.pattern;

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <Svg width="100%" height="100%">
        <Defs>
          {theme.pattern === 'dots' && (
            <Pattern id="tile" width={22} height={22} patternUnits="userSpaceOnUse">
              <Circle cx={11} cy={11} r={1.2} fill={c} />
            </Pattern>
          )}
          {theme.pattern === 'star' && (
            <Pattern id="tile" width={56} height={56} patternUnits="userSpaceOnUse">
              <G stroke={c} strokeWidth={1} fill="none">
                {/* Eight-pointed star: two overlapping squares. */}
                <Rect x={16} y={16} width={24} height={24} />
                <Polygon points="28,11 45,28 28,45 11,28" />
                <Circle cx={28} cy={28} r={5} />
                {/* Lattice joining neighbouring stars. */}
                <Line x1={28} y1={0} x2={28} y2={11} />
                <Line x1={28} y1={45} x2={28} y2={56} />
                <Line x1={0} y1={28} x2={11} y2={28} />
                <Line x1={45} y1={28} x2={56} y2={28} />
                <Path d="M0 8 L8 0 M48 0 L56 8 M56 48 L48 56 M8 56 L0 48" />
              </G>
            </Pattern>
          )}
          {theme.pattern === 'zellige' && (
            <Pattern id="tile" width={64} height={64} patternUnits="userSpaceOnUse">
              <G stroke={c} strokeWidth={1.1} fill="none">
                <Path d="M32 8 L38 22 L52 16 L46 30 L60 32 L46 34 L52 48 L38 42 L32 56 L26 42 L12 48 L18 34 L4 32 L18 30 L12 16 L26 22 Z" />
                <Circle cx={32} cy={32} r={7} />
                <Circle cx={0} cy={0} r={6} />
                <Circle cx={64} cy={0} r={6} />
                <Circle cx={0} cy={64} r={6} />
                <Circle cx={64} cy={64} r={6} />
              </G>
              <Circle cx={32} cy={32} r={2} fill={c} />
            </Pattern>
          )}
        </Defs>
        <Rect x={0} y={0} width="100%" height="100%" fill="url(#tile)" opacity={opacity} />
      </Svg>
    </View>
  );
}
