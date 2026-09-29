import { getLocales } from 'expo-localization';
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';

import { isRTL, STRINGS, type Language, type Strings } from '@/i18n/strings';
import { THEMES, type AppTheme, type Palette, type ThemeId } from '@/theme/themes';
import { loadJSON, saveJSON } from './storage';

export type Appearance = 'system' | 'light' | 'dark';

export interface Settings {
  language: Language;
  appearance: Appearance;
  themeId: ThemeId;
  /** Multiplier applied to Arabic text. */
  arabicScale: number;
  showTranslation: boolean;
  haptics: boolean;
  autoAdvance: boolean;
}

const KEY = 'settings/v1';

function deviceLanguage(): Language {
  const code = getLocales()[0]?.languageCode;
  return code === 'ar' || code === 'fr' ? code : 'en';
}

const defaults = (): Settings => ({
  language: deviceLanguage(),
  appearance: 'system',
  themeId: 'material',
  arabicScale: 1,
  showTranslation: true,
  haptics: true,
  autoAdvance: true,
});

interface SettingsContextValue {
  settings: Settings;
  ready: boolean;
  update: (patch: Partial<Settings>) => void;
  /** Derived values used everywhere in the UI. */
  t: Strings;
  rtl: boolean;
  theme: AppTheme;
  colors: Palette;
  isDark: boolean;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaults);
  const [ready, setReady] = useState(false);
  const systemScheme = useColorScheme();

  useEffect(() => {
    loadJSON<Partial<Settings>>(KEY).then((stored) => {
      if (stored) setSettings((s) => ({ ...s, ...stored }));
      setReady(true);
    });
  }, []);

  const value = useMemo<SettingsContextValue>(() => {
    const isDark =
      settings.appearance === 'system' ? systemScheme === 'dark' : settings.appearance === 'dark';
    const theme = THEMES[settings.themeId] ?? THEMES.material;
    return {
      settings,
      ready,
      update: (patch) =>
        setSettings((s) => {
          const next = { ...s, ...patch };
          saveJSON(KEY, next);
          return next;
        }),
      t: STRINGS[settings.language],
      rtl: isRTL(settings.language),
      theme,
      colors: isDark ? theme.dark : theme.light,
      isDark,
    };
  }, [settings, ready, systemScheme]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used inside SettingsProvider');
  return ctx;
}
