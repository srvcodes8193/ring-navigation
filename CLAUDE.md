# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React Native 0.83.1 application built with TypeScript, featuring:
- Complete theming system (Light/Dark mode with system detection)
- Internationalization (i18n) with 4 languages (English, Spanish, French, Hindi)
- Comprehensive debugging tools (Reactotron, React DevTools, Flipper)

The app uses React Native CLI (not Expo).

**Node Version Required:** >=20

## Development Commands

### Start Development
```bash
npm start                # Start Metro bundler
npm run android          # Run on Android emulator/device
npm run ios              # Run on iOS simulator/device (macOS only)
```

### iOS-Specific Setup
iOS requires CocoaPods. On first setup or after updating native dependencies:
```bash
cd ios
pod install
cd ..
npm run ios
```

### Code Quality
```bash
npm run lint            # Run ESLint
npm test                # Run Jest tests
npx tsc --noEmit        # TypeScript type checking
```

### Debugging Tools
```bash
npm run devtools        # Launch React DevTools (standalone)
```

For Reactotron debugging: Launch the Reactotron desktop app BEFORE starting the React Native app.

## Architecture

### Provider Hierarchy (App.tsx)

The app uses a nested provider pattern:
```
SafeAreaProvider (react-native-safe-area-context)
  └─ ThemeProvider (src/context/ThemeContext.tsx)
      └─ AppContent (uses theme)
```

**Critical:** Reactotron is initialized BEFORE React imports via `require()` in a DEV check at the top of App.tsx. This must remain first to ensure proper debugging setup.

### Theme System

**Pattern:** Context + Hook architecture
- **Configuration:** `src/config/theme.ts` defines `lightTheme` and `darkTheme` objects
- **Provider:** `src/context/ThemeContext.tsx` manages theme state and system preference detection
- **Hook:** `src/hooks/useTheme.ts` provides `{ theme, themeMode, toggleTheme, isSystemTheme }`

**Theme Features:**
- Automatically follows system dark mode by default
- Manual override via toggle (user preference stored in state, not persisted)
- StatusBar color syncs with theme via `theme.colors.statusBar`

**Using Theme in Components:**
```typescript
import {useTheme} from '../hooks/useTheme';

function MyComponent() {
  const {theme} = useTheme();

  // Create styles INSIDE component (dynamic)
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      padding: theme.spacing.md,
    },
  });
}
```

**Never** create StyleSheet outside components - styles won't update on theme changes.

### Debugging Infrastructure

**Reactotron Setup:** `src/config/ReactotronConfig.ts`
- Auto-detects host for Android emulator from `scriptURL` (with fallback to localhost)
- Uses optional chaining (`?.`) to prevent crashes when `scriptURL` is undefined
- Extends `console.tron` globally for easy logging

**Debug Utilities:** `src/utils/debugUtils.ts`
- `logger.log/warn/error()` - Routes to Reactotron if available
- `measurePerformance()` - Function performance timing
- `useLifecycleLogger()` - Component mount/unmount tracking
- `useRenderCount()` - Render count tracking

**Network Logger:** `src/utils/networkLogger.ts`
- `debugFetch()` - Wrapper for fetch that logs requests/responses to Reactotron

**Type Declarations:** `src/types/reactotron.d.ts` extends `Console` interface with `tron` property

### Internationalization (i18n)

**Pattern:** react-i18next with AsyncStorage persistence
- **Configuration:** `src/config/i18n.ts` - Initializes i18next with language detector
- **Translations:** `src/locales/[lang].json` - JSON files for each language (en, es, fr, hi)
- **Component:** `src/components/LanguageSelector.tsx` - Modal-based language picker
- **Hook:** `useTranslation()` from react-i18next

**i18n Features:**
- Auto-detects device language on first launch
- Saves user's language choice to AsyncStorage
- Changes language without app restart
- Logs language changes to Reactotron in DEV mode

**Using Translations:**
```typescript
import {useTranslation} from 'react-i18next';

function MyComponent() {
  const {t, i18n} = useTranslation();

  return <Text>{t('home.title')}</Text>;  // Translates to current language

  // Change language
  i18n.changeLanguage('es');  // Switch to Spanish
}
```

**Adding New Language:**
1. Create `src/locales/[code].json` with all translation keys
2. Import in `src/config/i18n.ts` and add to resources
3. Add to `LANGUAGES` array in `src/components/LanguageSelector.tsx`

### File Structure

```
src/
├── config/
│   ├── theme.ts              # Theme colors, spacing, shadows
│   ├── i18n.ts               # i18n configuration
│   └── ReactotronConfig.ts   # Reactotron initialization
├── context/
│   └── ThemeContext.tsx      # Theme state management
├── hooks/
│   └── useTheme.ts           # Theme access hook
├── components/
│   └── LanguageSelector.tsx  # Language picker UI
├── locales/
│   ├── en.json               # English translations
│   ├── es.json               # Spanish translations
│   ├── fr.json               # French translations
│   └── hi.json               # Hindi translations
├── screens/
│   └── HomeScreen.tsx        # Example screen
├── utils/
│   ├── debugUtils.ts         # Logging & performance utilities
│   └── networkLogger.ts      # API debugging wrapper
└── types/
    ├── index.ts              # Custom type definitions
    └── reactotron.d.ts       # Reactotron type extensions
```

## Common Patterns

### Adding a New Screen
1. Create component in `src/screens/`
2. Use `useTheme()` hook for styling
3. Create dynamic styles inside component function
4. Use theme values: `theme.colors.*`, `theme.spacing.*`, `theme.borderRadius.*`

### Theme Color Palette
- **Light Mode:** Light gray background (#F5F5F5), white cards, dark text
- **Dark Mode:** True black background (#000000, OLED-friendly), dark gray cards, white text
- **Primary:** iOS blue (#007AFF light, #0A84FF dark)

### Adding Theme Values
1. Update `Theme` interface in `src/config/theme.ts`
2. Add value to both `lightTheme` and `darkTheme` objects
3. TypeScript will enforce consistency

### Debugging Best Practices
- Use `console.tron.log()` instead of `console.log()` for Reactotron
- Use `logger.display()` for structured event logging
- Wrap API calls with `debugFetch()` for automatic request/response logging
- Theme changes are automatically logged when using `toggleTheme()`

## Dependencies

**Key Libraries:**
- `react-native` 0.83.1 (Hermes enabled by default)
- `react-native-safe-area-context` - Safe area handling (use this, not deprecated RN SafeAreaView)
- `reactotron-react-native` - Main debugging tool
- `react-devtools` - Component inspection

## Known Issues & Workarounds

### Reactotron scriptURL Error
If `NativeModules.SourceCode.scriptURL` is undefined, the config safely falls back to 'localhost'. This is handled in ReactotronConfig.ts with optional chaining and try-catch.

### TypeScript & Theme Types
When creating dynamic styles, TypeScript may not infer the `Theme` type. Import it explicitly:
```typescript
import type {Theme} from '../config/theme';
const createStyles = (theme: Theme) => StyleSheet.create({...});
```

## Documentation

Comprehensive guides are available in markdown files:
- `THEME_GUIDE.md` - Complete theming documentation
- `DEBUGGING_GUIDE.md` - Full debugging reference
- `DEBUG_CHEATSHEET.md` - Quick debugging commands
- `QUICKSTART.md` - General development guide
- `START_HERE.md` - New developer onboarding
