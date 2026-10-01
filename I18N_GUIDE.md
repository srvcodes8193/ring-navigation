# Internationalization (i18n) Guide

Your React Native app now supports multiple languages and regions using `react-i18next`.

---

## ✨ Features

- ✅ **4 languages supported**: English, Spanish, French, Hindi
- ✅ **Auto-detection**: Uses device language automatically
- ✅ **Persistent choice**: Saves user's language preference
- ✅ **Easy language switching**: Beautiful modal selector
- ✅ **Type-safe translations**: Full TypeScript support
- ✅ **RTL support ready**: Prepared for right-to-left languages
- ✅ **Debugging integration**: Language changes logged to Reactotron

---

## 🌍 Supported Languages

| Code | Language | Native Name |
|------|----------|-------------|
| `en` | English  | English     |
| `es` | Spanish  | Español     |
| `fr` | French   | Français    |
| `hi` | Hindi    | हिंदी        |

---

## 🚀 How It Works

### 1. Auto-Detection
On first app launch:
1. Checks if user has saved a language preference
2. If not, detects device language
3. Falls back to English if language not supported

### 2. Language Switching
User can change language anytime:
1. Tap "Language" selector on home screen
2. Select desired language from modal
3. Choice is saved to AsyncStorage
4. App updates instantly

### 3. Persistence
- Language choice saved with AsyncStorage
- Persists across app restarts
- User sees their chosen language on next launch

---

## 💻 Usage

### In Components

```typescript
import {useTranslation} from 'react-i18next';

function MyComponent() {
  const {t, i18n} = useTranslation();

  return (
    <View>
      {/* Basic translation */}
      <Text>{t('home.title')}</Text>

      {/* Get current language */}
      <Text>Current language: {i18n.language}</Text>

      {/* Change language programmatically */}
      <Button
        title="Switch to Spanish"
        onPress={() => i18n.changeLanguage('es')}
      />
    </View>
  );
}
```

### Translation Keys

Translations are organized in namespaces:

```typescript
// Common UI elements
t('common.ok')          // "OK"
t('common.cancel')      // "Cancel"
t('common.save')        // "Save"

// Home screen
t('home.title')         // "Hello World!"
t('home.subtitle')      // "Welcome to React Native"
t('home.darkMode')      // "Dark Mode"

// Settings
t('settings.language')  // "Language"
t('settings.theme')     // "Theme"

// Language names
t('languages.en')       // "English"
t('languages.es')       // "Spanish"
```

---

## 📁 File Structure

```
src/
├── locales/
│   ├── en.json         # English translations
│   ├── es.json         # Spanish translations
│   ├── fr.json         # French translations
│   └── hi.json         # Hindi translations
├── config/
│   └── i18n.ts         # i18n configuration
└── components/
    └── LanguageSelector.tsx  # Language picker UI
```

---

## 🔧 Adding New Languages

### Step 1: Create Translation File

Create `src/locales/[code].json`:

```json
{
  "common": {
    "appName": "Your App Name",
    "ok": "OK in that language",
    ...
  },
  "home": {
    "title": "Hello World in that language",
    ...
  },
  ...
}
```

### Step 2: Import in i18n Config

Edit `src/config/i18n.ts`:

```typescript
import de from '../locales/de.json';  // Add import

i18n.use(initReactI18next).init({
  resources: {
    en: {translation: en},
    es: {translation: es},
    fr: {translation: fr},
    hi: {translation: hi},
    de: {translation: de},  // Add here
  },
  // ...
});
```

### Step 3: Add to Language Selector

Edit `src/components/LanguageSelector.tsx`:

```typescript
const LANGUAGES: Language[] = [
  {code: 'en', name: 'English'},
  {code: 'es', name: 'Español'},
  {code: 'fr', name: 'Français'},
  {code: 'hi', name: 'हिंदी'},
  {code: 'de', name: 'Deutsch'},  // Add here
];
```

### Step 4: Add Translation in All Files

Add the language name to all locale files:

```json
// In each locale file (en.json, es.json, etc.)
{
  "languages": {
    "de": "German"  // Or appropriate translation
  }
}
```

---

## 🎯 Adding New Translation Keys

### Step 1: Add to English (Primary)

Edit `src/locales/en.json`:

```json
{
  "myNewSection": {
    "title": "My New Title",
    "description": "My description"
  }
}
```

### Step 2: Add to All Other Languages

Add the same structure to `es.json`, `fr.json`, `hi.json` with translations.

### Step 3: Use in Components

```typescript
const {t} = useTranslation();

<Text>{t('myNewSection.title')}</Text>
```

---

## 🔍 Translation Tips

### Interpolation

```typescript
// In locale file:
{
  "welcome": "Welcome, {{name}}!"
}

// In component:
t('welcome', {name: 'John'})  // "Welcome, John!"
```

### Pluralization

```typescript
// In locale file:
{
  "items": "{{count}} item",
  "items_other": "{{count}} items"
}

// In component:
t('items', {count: 1})   // "1 item"
t('items', {count: 5})   // "5 items"
```

### Nested Keys

```typescript
// Access deeply nested translations
t('settings.privacy.deleteAccount')
```

---

## 🐛 Debugging

Language changes are logged to Reactotron:

```typescript
{
  name: 'LANGUAGE_CHANGED',
  language: 'es',
  preview: 'Language changed to es'
}
```

Check current language:
```typescript
const {i18n} = useTranslation();
console.log('Current language:', i18n.language);
```

---

## 🌐 Right-to-Left (RTL) Support

To add RTL languages (Arabic, Hebrew):

### Step 1: Install I18nManager

```typescript
import {I18nManager} from 'react-native';
```

### Step 2: Detect RTL Language

Edit `src/config/i18n.ts`:

```typescript
const RTL_LANGUAGES = ['ar', 'he', 'fa'];

i18n.on('languageChanged', (lng) => {
  const isRTL = RTL_LANGUAGES.includes(lng);
  I18nManager.forceRTL(isRTL);
  // Requires app restart
});
```

---

## 📱 Language Selector Component

The `LanguageSelector` component provides:
- Current language display
- Modal popup with language list
- Visual selection indicator (checkmark)
- Themed styling (adapts to light/dark mode)
- Smooth animations

**Location:** Automatically shown at top of HomeScreen

---

## 🎓 Best Practices

### ✅ DO

```typescript
// Use semantic keys
t('user.profile.edit')

// Keep translations in namespaces
{
  "user": {...},
  "settings": {...},
  "common": {...}
}

// Provide fallback language
fallbackLng: 'en'
```

### ❌ DON'T

```typescript
// Don't use hardcoded strings
<Text>Hello World</Text>  // ❌

// Don't use translations as keys
t('Hello World')  // ❌

// Don't nest too deeply
t('a.b.c.d.e.f.g.key')  // ❌ (max 3-4 levels)
```

---

## 🔄 How Auto-Detection Works

```
App Launch
    ↓
Check AsyncStorage for saved language
    ↓
Found? → Use saved language
    ↓
Not found? → Detect device language
    ↓
Supported? → Use device language
    ↓
Not supported? → Use English (fallback)
```

---

## 🚀 Try It Now!

1. Run your app
2. See "Language" selector at top
3. Tap it to open language picker
4. Select a language
5. Watch app update instantly
6. Restart app - your choice is saved!

---

## 📖 Related Documentation

- [react-i18next Documentation](https://react.i18next.com/)
- [i18next Documentation](https://www.i18next.com/)
- [THEME_GUIDE.md](THEME_GUIDE.md) - Theme system
- [QUICKSTART.md](QUICKSTART.md) - General guide

---

**Your app is now fully internationalized! 🌍✨**
