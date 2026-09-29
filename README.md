# Adhkar

A multilingual Android & iOS app for daily Islamic remembrance (adhkār):
morning and evening adhkār, before sleep, after prayer, travel, home, meals
and moments of distress. It tracks your progress one prayer at a time.

Built with [Expo](https://expo.dev) (React Native + TypeScript, Expo Router).

## Features

- **Guided sessions**: one remembrance at a time, with a large tap counter
  (e.g. 0/33) that vibrates and moves to the next one when the count is done.
  You can swipe between cards or use the arrows.
- **Progress tracking**: a `5/18` progress bar per session, a daily progress
  ring on the home screen, a 7-day history strip and a day streak.
  Progress resets each day.
- **List mode**: tick off each remembrance from a checklist.
- **Multilingual**: English, French and Arabic, with a full right-to-left
  layout and Arabic-Indic digits in Arabic. Every text shows the
  vocalised Arabic original, and translations appear in the chosen language.
- **Themes**: Material, Modern, Manuscript (parchment and gold with an
  eight-pointed-star pattern) and Andalus (zellige pattern). Each theme has a
  light and a dark variant, and the app can follow the system setting.
- **Reading comfort**: the Amiri Arabic typeface, adjustable Arabic text size,
  and toggles for translation, auto-advance and vibration.

## Getting started

```bash
npm install
npx expo start        # then press a (Android), i (iOS) or scan the QR code with Expo Go
npm run typecheck
```

To build installable apps, use [EAS Build](https://docs.expo.dev/build/introduction/):

```bash
npx eas-cli@latest build --platform android   # or ios
```

## Project structure

```
src/
  app/                  Screens (Expo Router)
    _layout.tsx         Providers, fonts, navigation stack
    index.tsx           Home: daily progress, streak, categories
    category/[id].tsx   Session: focus/list modes, counter, completion
    settings.tsx        Language, appearance, theme, reading options
  components/           UI kit, progress bar/ring, patterned backgrounds
  data/adhkar.ts        All remembrance texts, counts, translations and sources
  i18n/strings.ts       UI strings per language
  state/                Settings and progress (persisted with AsyncStorage)
  theme/themes.ts       Theme palettes (light and dark for each theme)
```

### Adding a language

1. Add the language code to `Language` and `LANGUAGES` in `src/i18n/strings.ts`,
   and add a strings object for it.
2. Add `title` and `subtitle` for each category, plus a `translation` field
   for each item, in `src/data/adhkar.ts`. When an item's translation is
   missing, the English one is shown. TypeScript flags any missing category
   titles.
3. Add the theme `name` and `description` in `src/theme/themes.ts`.

### Adding a theme

Add an entry to `THEMES` in `src/theme/themes.ts` with a light and a dark
`Palette`, corner radii, and a background pattern (`none`, `dots`, `star`
or `zellige`). Then add it to `THEME_ORDER`.

## Content

The texts come from the Qur'an and from authentic hadith as compiled in
*Ḥiṣn al-Muslim*. Each item cites its source. The translations convey the
meaning and are not word for word. Please have the content reviewed by a
qualified person before publishing.
