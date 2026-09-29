import type { Language } from '@/i18n/strings';

/** Localized text. Missing languages fall back to English. */
export type Translated = { en: string } & Partial<Record<Exclude<Language, 'en'>, string>>;

export interface Dhikr {
  id: string;
  /** Original Arabic text, fully vocalised. */
  arabic: string;
  /** How many times it is recited. */
  repeat: number;
  translation: Translated;
  /** Optional practical note (when / how to recite). */
  note?: Translated;
  /** Qur'an reference or hadith collection. */
  source: string;
}

export interface Category {
  id: string;
  icon: string;
  title: Record<Language, string>;
  subtitle: Record<Language, string>;
  /** Daily routines are counted in the "today" progress ring and the streak. */
  daily: boolean;
  items: Dhikr[];
}

export function localize(t: Translated | undefined, lang: Language): string | undefined {
  if (!t) return undefined;
  return t[lang] ?? t.en;
}

/** The meaning of an Arabic text; not shown when the reader already uses Arabic. */
export function translate(t: Translated, lang: Language): string | undefined {
  return lang === 'ar' ? undefined : localize(t, lang);
}
