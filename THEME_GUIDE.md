# Theme System Guide (Light & Dark Mode)

Your React Native app now has a fully-featured theme system with Light and Dark mode support following React Native best practices.

---

## ✨ Features

- ✅ **Light and Dark themes** with iOS-inspired colors
- ✅ **System preference detection** - Automatically follows device theme
- ✅ **Manual override** - Users can choose their preferred theme
- ✅ **Type-safe** - Full TypeScript support
- ✅ **Context-based** - Easy to use in any component
- ✅ **Dynamic styling** - Styles update automatically
- ✅ **Status bar integration** - Adapts to theme
- ✅ **Debugging support** - Theme changes logged in Reactotron

---

## 🎨 How It Works

### Architecture

```
ThemeProvider (Context)
    ↓
ThemeContext
    ↓
useTheme() Hook
    ↓
Your Components
```

### Files Created

```
src/
├── config/
│   └── theme.ts              ← Theme colors & configuration
├── context/
│   └── ThemeContext.tsx      ← Theme provider & logic
└── hooks/
    └── useTheme.ts           ← Hook to access theme
```

---

## 🚀 Usage

### In Any Component

```typescript
import {useTheme} from '../hooks/useTheme';

function MyComponent() {
  // Get theme from hook
  const {theme, themeMode, toggleTheme} = useTheme();

  // Create dynamic styles
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
    },
    text: {
      color: theme.colors.text,
    },
    card: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.md,
      ...theme.shadows.medium,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello!</Text>
    </View>
  );
}
```

### Toggle Theme

```typescript
import {useTheme} from '../hooks/useTheme';

function ThemeToggleButton() {
  const {toggleTheme, themeMode} = useTheme();

  return (
    <Button
      title={`Switch to ${themeMode === 'dark' ? 'Light' : 'Dark'}`}
      onPress={toggleTheme}
    />
  );
}
```

### Using Switch (iOS-style)

```typescript
import {Switch} from 'react-native';
import {useTheme} from '../hooks/useTheme';

function ThemeSwitch() {
  const {theme, themeMode, toggleTheme} = useTheme();

  return (
    <Switch
      value={themeMode === 'dark'}
      onValueChange={toggleTheme}
      trackColor={{
        false: theme.colors.border,
        true: theme.colors.primary,
      }}
      thumbColor={theme.colors.surface}
    />
  );
}
```

---

## 🎨 Available Theme Values

### Colors

```typescript
theme.colors.background      // Main background
theme.colors.surface         // Surface/container background
theme.colors.card            // Card background

theme.colors.text            // Primary text
theme.colors.textSecondary   // Secondary/muted text
theme.colors.textInverse     // Text on colored backgrounds

theme.colors.primary         // Primary brand color
theme.colors.primaryDark     // Darker primary variant

theme.colors.accent          // Accent color
theme.colors.error           // Error/danger color
theme.colors.success         // Success color
theme.colors.warning         // Warning color

theme.colors.border          // Border color
theme.colors.divider         // Divider/separator color
```

### Spacing

```typescript
theme.spacing.xs    // 4px
theme.spacing.sm    // 8px
theme.spacing.md    // 16px
theme.spacing.lg    // 24px
theme.spacing.xl    // 32px
```

### Border Radius

```typescript
theme.borderRadius.sm    // 4px
theme.borderRadius.md    // 8px
theme.borderRadius.lg    // 12px
theme.borderRadius.xl    // 16px
```

### Shadows

```typescript
theme.shadows.small     // Small elevation
theme.shadows.medium    // Medium elevation
```

---

## 📱 Theme Modes

### Light Mode Colors

- Background: `#F5F5F5` (Light gray)
- Surface/Card: `#FFFFFF` (White)
- Text: `#1A1A1A` (Near black)
- Primary: `#007AFF` (iOS blue)

### Dark Mode Colors

- Background: `#000000` (True black - OLED friendly)
- Surface: `#1C1C1E` (Dark gray)
- Card: `#2C2C2E` (Lighter dark gray)
- Text: `#FFFFFF` (White)
- Primary: `#0A84FF` (Brighter iOS blue)

### System Mode

By default, the app follows the system preference:
- If device is in dark mode → Dark theme
- If device is in light mode → Light theme

Users can override this by toggling the switch.

---

## 🔧 Customizing Themes

### Edit Colors

Open [src/config/theme.ts](src/config/theme.ts):

```typescript
export const lightTheme: Theme = {
  mode: 'light',
  colors: {
    primary: '#FF6B6B',  // Change to your brand color
    // ... other colors
  },
  // ...
};
```

### Add New Colors

```typescript
// In src/config/theme.ts, add to Theme interface:
export interface Theme {
  colors: {
    // ... existing colors
    customColor: string;  // Add new color
  };
}

// Then add to both themes:
export const lightTheme: Theme = {
  colors: {
    customColor: '#FF6B6B',
  },
};

export const darkTheme: Theme = {
  colors: {
    customColor: '#FF8E8E',
  },
};
```

---

## 💡 Best Practices

### ✅ DO

```typescript
// Use theme colors
backgroundColor: theme.colors.background

// Use theme spacing
padding: theme.spacing.md

// Use theme border radius
borderRadius: theme.borderRadius.lg

// Create dynamic styles inside component
function MyComponent() {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  // ...
}
```

### ❌ DON'T

```typescript
// Don't hardcode colors
backgroundColor: '#FFFFFF'  // ❌

// Don't hardcode spacing
padding: 16  // ❌ Use theme.spacing.md instead

// Don't create styles outside component (they won't update)
const styles = StyleSheet.create({  // ❌
  container: {
    backgroundColor: '#fff'
  }
});
```

---

## 🎯 Example: Complete Themed Component

```typescript
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from '../hooks/useTheme';
import type {Theme} from '../config/theme';

function ProfileCard() {
  const {theme} = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.card}>
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.email}>john@example.com</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.lg,
      ...theme.shadows.medium,
    },
    name: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
    },
    email: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.md,
    },
    button: {
      backgroundColor: theme.colors.primary,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
    },
    buttonText: {
      color: theme.colors.textInverse,
      fontWeight: '600',
      textAlign: 'center',
    },
  });

export default ProfileCard;
```

---

## 🐛 Debugging

Theme changes are automatically logged to Reactotron:

```typescript
// When theme changes, you'll see in Reactotron:
{
  name: 'THEME_CHANGED',
  mode: 'dark',
  actualTheme: 'dark'
}
```

You can also log theme values:

```typescript
const {theme} = useTheme();
console.tron.log('Current theme colors:', theme.colors);
```

---

## 🔄 How Theme Updates Work

1. User toggles switch → `toggleTheme()` called
2. ThemeContext updates `themeMode` state
3. All components using `useTheme()` re-render
4. Styles recalculated with new theme
5. UI updates instantly

---

## 📋 Common Patterns

### Pattern 1: Conditional Rendering Based on Theme

```typescript
const {themeMode} = useTheme();

return themeMode === 'dark' ? (
  <DarkModeIcon />
) : (
  <LightModeIcon />
);
```

### Pattern 2: Different Values for Light/Dark

```typescript
const {themeMode} = useTheme();
const iconName = themeMode === 'dark' ? 'moon' : 'sun';
```

### Pattern 3: Theme-Aware Images

```typescript
const {themeMode} = useTheme();
const logo = themeMode === 'dark'
  ? require('./assets/logo-light.png')
  : require('./assets/logo-dark.png');
```

---

## 🎓 Advanced: Persisting Theme Preference

Want to save user's theme choice? Add AsyncStorage:

```bash
npm install @react-native-async-storage/async-storage
```

Then update [ThemeContext.tsx](src/context/ThemeContext.tsx):

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Load saved theme on mount
useEffect(() => {
  AsyncStorage.getItem('theme').then(saved => {
    if (saved) setUserThemeMode(saved as ThemeMode | 'system');
  });
}, []);

// Save when theme changes
const setThemeMode = (mode: ThemeMode | 'system') => {
  setUserThemeMode(mode);
  AsyncStorage.setItem('theme', mode);
};
```

---

## 🌟 Try It Now!

1. Run your app: `npm run android` or `npm run ios`
2. See the theme toggle at the top
3. Flip the switch to see instant theme change
4. Check Reactotron to see theme change events
5. Try changing your device's system theme

---

## 📖 Related Documentation

- [QUICKSTART.md](QUICKSTART.md) - General app guide
- [DEBUGGING_GUIDE.md](DEBUGGING_GUIDE.md) - Debug theme issues
- [src/config/theme.ts](src/config/theme.ts) - Edit theme colors
- [src/screens/HomeScreen.tsx](src/screens/HomeScreen.tsx) - Example usage

---

**Your app now has professional Light/Dark mode support! 🎨✨**
