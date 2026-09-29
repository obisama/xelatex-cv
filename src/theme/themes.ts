import type { Language } from '@/i18n/strings';

export type ThemeId = 'material' | 'modern' | 'ancient' | 'andalus';
export type Pattern = 'none' | 'dots' | 'star' | 'zellige';

export interface Palette {
  background: string;
  surface: string;
  surfaceAlt: string;
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  accent: string;
  text: string;
  textMuted: string;
  border: string;
  track: string;
  success: string;
  pattern: string;
}

export interface AppTheme {
  id: ThemeId;
  name: Record<Language, string>;
  description: Record<Language, string>;
  radius: { card: number; control: number };
  /** Whether cards get a hairline border (flat look) instead of a shadow. */
  outlined: boolean;
  pattern: Pattern;
  patternOpacity: number;
  /** Font used for headings; undefined uses the system font. */
  headingFont?: string;
  light: Palette;
  dark: Palette;
}

export const ARABIC_FONT = 'Amiri_400Regular';
export const ARABIC_FONT_BOLD = 'Amiri_700Bold';

export const THEMES: Record<ThemeId, AppTheme> = {
  material: {
    id: 'material',
    name: { en: 'Material', fr: 'Material', ar: 'ماتيريال' },
    description: {
      en: 'Soft tonal colours, rounded shapes',
      fr: 'Couleurs tonales douces, formes arrondies',
      ar: 'ألوان هادئة وأشكال دائرية',
    },
    radius: { card: 28, control: 20 },
    outlined: false,
    pattern: 'none',
    patternOpacity: 0,
    light: {
      background: '#F5FBF8',
      surface: '#FFFFFF',
      surfaceAlt: '#E3EFEA',
      primary: '#0F6B5C',
      onPrimary: '#FFFFFF',
      primaryContainer: '#A7F2DF',
      onPrimaryContainer: '#00201A',
      accent: '#4A6360',
      text: '#161D1B',
      textMuted: '#5A6663',
      border: '#DCE5E1',
      track: '#D5E3DE',
      success: '#1E8E5A',
      pattern: '#0F6B5C',
    },
    dark: {
      background: '#0E1513',
      surface: '#18211F',
      surfaceAlt: '#223A34',
      primary: '#8AD6C3',
      onPrimary: '#00382F',
      primaryContainer: '#005144',
      onPrimaryContainer: '#A7F2DF',
      accent: '#B1CCC6',
      text: '#DDE4E1',
      textMuted: '#9AA7A3',
      border: '#2A3532',
      track: '#2A3532',
      success: '#6FD3A0',
      pattern: '#8AD6C3',
    },
  },
  modern: {
    id: 'modern',
    name: { en: 'Modern', fr: 'Moderne', ar: 'عصري' },
    description: {
      en: 'Minimal, crisp and focused',
      fr: 'Minimal, net et épuré',
      ar: 'بسيط وواضح ومركّز',
    },
    radius: { card: 16, control: 12 },
    outlined: true,
    pattern: 'dots',
    patternOpacity: 0.07,
    light: {
      background: '#FAFAFA',
      surface: '#FFFFFF',
      surfaceAlt: '#F1F1F4',
      primary: '#18181B',
      onPrimary: '#FFFFFF',
      primaryContainer: '#EEF0FF',
      onPrimaryContainer: '#2E3A8C',
      accent: '#5B6CF0',
      text: '#18181B',
      textMuted: '#71717A',
      border: '#E4E4E7',
      track: '#E4E4E7',
      success: '#5B6CF0',
      pattern: '#18181B',
    },
    dark: {
      background: '#09090B',
      surface: '#131316',
      surfaceAlt: '#1C1C21',
      primary: '#FAFAFA',
      onPrimary: '#09090B',
      primaryContainer: '#1F2450',
      onPrimaryContainer: '#C7CEFF',
      accent: '#8B98FF',
      text: '#FAFAFA',
      textMuted: '#A1A1AA',
      border: '#27272A',
      track: '#27272A',
      success: '#8B98FF',
      pattern: '#FAFAFA',
    },
  },
  ancient: {
    id: 'ancient',
    name: { en: 'Manuscript', fr: 'Manuscrit', ar: 'مخطوطة' },
    description: {
      en: 'Parchment, gold leaf and geometric stars',
      fr: 'Parchemin, feuille d’or et étoiles géométriques',
      ar: 'رَقّ وذهب ونجوم هندسية',
    },
    radius: { card: 6, control: 4 },
    outlined: true,
    pattern: 'star',
    patternOpacity: 0.12,
    headingFont: 'Amiri_700Bold',
    light: {
      background: '#F3E9D2',
      surface: '#FBF5E6',
      surfaceAlt: '#EADBB8',
      primary: '#7A2E1D',
      onPrimary: '#FBF5E6',
      primaryContainer: '#E9CF97',
      onPrimaryContainer: '#3E1C0E',
      accent: '#A67C2E',
      text: '#2B1D12',
      textMuted: '#6D5842',
      border: '#C9AE78',
      track: '#E2CFA3',
      success: '#2F6B4F',
      pattern: '#8C5A1E',
    },
    dark: {
      background: '#14110D',
      surface: '#1E1914',
      surfaceAlt: '#2B231A',
      primary: '#D8B26A',
      onPrimary: '#241A0C',
      primaryContainer: '#4A3719',
      onPrimaryContainer: '#F2DDAF',
      accent: '#C7954A',
      text: '#EFE4CC',
      textMuted: '#AE9D80',
      border: '#4A3D2A',
      track: '#3A2F20',
      success: '#8CC7A1',
      pattern: '#D8B26A',
    },
  },
  andalus: {
    id: 'andalus',
    name: { en: 'Andalus', fr: 'Andalousie', ar: 'أندلسي' },
    description: {
      en: 'Zellige tiles, terracotta and deep blue',
      fr: 'Zellige, terre cuite et bleu profond',
      ar: 'زليج وطين وأزرق عميق',
    },
    radius: { card: 20, control: 14 },
    outlined: false,
    pattern: 'zellige',
    patternOpacity: 0.1,
    headingFont: 'Amiri_700Bold',
    light: {
      background: '#F6F1EA',
      surface: '#FFFCF7',
      surfaceAlt: '#EDE2D3',
      primary: '#1D4E89',
      onPrimary: '#FFFFFF',
      primaryContainer: '#F5D5C0',
      onPrimaryContainer: '#5A2310',
      accent: '#C2562E',
      text: '#1D2433',
      textMuted: '#626B7A',
      border: '#E3D6C4',
      track: '#E7DACA',
      success: '#1F7A64',
      pattern: '#1D4E89',
    },
    dark: {
      background: '#0B1422',
      surface: '#122036',
      surfaceAlt: '#1A2C47',
      primary: '#F0A27F',
      onPrimary: '#3A1406',
      primaryContainer: '#1D4E89',
      onPrimaryContainer: '#DCE8FA',
      accent: '#5FB3C9',
      text: '#E8EDF5',
      textMuted: '#9AA7BC',
      border: '#223654',
      track: '#223654',
      success: '#6CD1B2',
      pattern: '#5FB3C9',
    },
  },
};

export const THEME_ORDER: ThemeId[] = ['material', 'modern', 'ancient', 'andalus'];
