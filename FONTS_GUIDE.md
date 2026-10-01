# Font Configuration Guide

Your React Native app now uses **Ubuntu** from Google Fonts as the default font.

---

## ✨ Fonts Installed

**Ubuntu** - A clean, modern sans-serif font designed for readability

- **Source**: Google Fonts
- **Style**: Sans-serif, Modern, Clean
- **Weights Installed**:
  - Regular (400)
  - Medium (500)
  - Bold (700)
- **Files**:
  - `assets/fonts/Ubuntu-Regular.ttf`
  - `assets/fonts/Ubuntu-Medium.ttf`
  - `assets/fonts/Ubuntu-Bold.ttf`

---

## 📦 What Was Set Up

### 1. **Font Files**
- Downloaded Ubuntu from Google Fonts
- Placed in `assets/fonts/` directory
- Linked to iOS and Android projects

### 2. **Configuration**
- **react-native.config.js** - Configured asset linking
- **Theme system** - Added font family to theme configuration
- Both light and dark themes use the same fonts

### 3. **Theme Integration**
The fonts are now available through the theme:

```typescript
theme.fonts.regular   // Ubuntu-Regular
theme.fonts.medium    // Ubuntu-Medium
theme.fonts.bold      // Ubuntu-Bold
theme.fonts.heading   // Ubuntu-Bold
```

---

## 🚀 Usage

### In Components

```typescript
import {useTheme} from '../hooks/useTheme';

function MyComponent() {
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    title: {
      fontFamily: theme.fonts.heading,
      fontSize: 32,
      color: theme.colors.text,
    },
    body: {
      fontFamily: theme.fonts.regular,
      fontSize: 16,
      color: theme.colors.text,
    },
  });

  return (
    <View>
      <Text style={styles.title}>Ubuntu Title</Text>
      <Text style={styles.body}>Body text in Ubuntu</Text>
    </View>
  );
}
```

### Direct Usage

```typescript
<Text style={{fontFamily: 'Ubuntu-Regular'}}>
  Hello World!
</Text>

<Text style={{fontFamily: 'Ubuntu-Bold'}}>
  Bold Text!
</Text>
```

---

## 📁 File Structure

```
MyApp/
├── assets/
│   └── fonts/
│       ├── Ubuntu-Regular.ttf  ← Regular weight
│       ├── Ubuntu-Medium.ttf   ← Medium weight
│       └── Ubuntu-Bold.ttf     ← Bold weight
├── react-native.config.js      ← Font linking config
└── src/
    └── config/
        └── theme.ts            ← Font configuration
```

---

## 🔧 Adding More Fonts

### Step 1: Download Font Files

Download `.ttf` or `.otf` files and place in `assets/fonts/`:

```bash
assets/fonts/
├── Ubuntu-Regular.ttf
├── Ubuntu-Medium.ttf
├── Ubuntu-Bold.ttf
├── YourFont-Regular.ttf
├── YourFont-Bold.ttf
└── YourFont-Italic.ttf
```

### Step 2: Link Font Assets

```bash
npx react-native-asset
```

This command links fonts to both iOS and Android automatically.

### Step 3: Add to Theme

Edit `src/config/theme.ts`:

```typescript
const fonts = {
  regular: 'YourFont-Regular',
  medium: 'YourFont-Medium',
  bold: 'YourFont-Bold',
  heading: 'Ubuntu-Bold',  // Keep Ubuntu for headings
};
```

### Step 4: Use in Components

```typescript
<Text style={{fontFamily: theme.fonts.bold}}>
  Bold Text
</Text>
```

---

## 🎨 Font Weights

Ubuntu font comes with multiple weights already installed. The current setup includes:

### Installed Weights

- **Ubuntu-Regular.ttf** (400) - Normal text
- **Ubuntu-Medium.ttf** (500) - Slightly heavier than regular
- **Ubuntu-Bold.ttf** (700) - Bold text and headings

### Additional Weights Available

If you need more weights, download from Google Fonts:
- Ubuntu-Light.ttf (300)
- Ubuntu-Italic.ttf (400 Italic)
- Ubuntu-MediumItalic.ttf (500 Italic)
- Ubuntu-BoldItalic.ttf (700 Italic)

Place additional files in `assets/fonts/` and run `npx react-native-asset`.

### Using Different Weights

```typescript
// Regular weight
<Text style={{fontFamily: 'Ubuntu-Regular'}}>
  Regular Text
</Text>

// Medium weight
<Text style={{fontFamily: 'Ubuntu-Medium'}}>
  Medium Text
</Text>

// Bold weight
<Text style={{fontFamily: 'Ubuntu-Bold'}}>
  Bold Text
</Text>
```

**Note**: Always use the specific font file names rather than fontWeight property for reliable cross-platform support.

---

## 🔄 After Adding/Changing Fonts

### iOS
```bash
cd ios
pod install
cd ..
npm run ios
```

### Android
```bash
# No additional steps needed
npm run android
```

### If Font Doesn't Appear

1. **Check font file name** - Must match exactly (case-sensitive)
2. **Rebuild app** - Fonts require a rebuild, not just reload
3. **Clear cache**:
   ```bash
   npm start -- --reset-cache
   ```
4. **Verify linking**:
   - iOS: Check `ios/MyApp/Info.plist` for `UIAppFonts` array
   - Android: Check `android/app/src/main/assets/fonts/`

---

## 🌐 Google Fonts Resources

- **Browse fonts**: https://fonts.google.com/
- **Dancing Script**: https://fonts.google.com/specimen/Dancing+Script
- **Download fonts**: Click font → Download family

---

## 💡 Best Practices

### ✅ DO

```typescript
// Use theme fonts for consistency
fontFamily: theme.fonts.heading

// Use appropriate font for content type
<Text style={{fontFamily: theme.fonts.heading}}>Title</Text>
<Text style={{fontFamily: theme.fonts.regular}}>Body</Text>

// Combine with other text styles
fontFamily: theme.fonts.regular,
fontSize: 16,
color: theme.colors.text
```

### ❌ DON'T

```typescript
// Don't hardcode font names
fontFamily: 'Ubuntu-Regular'  // ❌ Use theme.fonts instead

// Don't forget fontFamily
fontSize: 32  // ❌ Will use system default font

// Don't mix font styles inconsistently
// Use the same font throughout for consistency
```

---

## 🎯 Font in Current App

The Ubuntu font is currently used in:

- **HomeScreen.tsx**
  - Title: "Hello World!" (48px, heading font - Ubuntu Bold)
  - Subtitle: "Welcome to React Native" (20px, regular font - Ubuntu Regular)

All text in the app will use Ubuntu unless you specify a different font.

---

## 🔍 Troubleshooting

### Font Not Showing

**Problem**: Text appears in system default font instead of Ubuntu

**Solution**:
1. Rebuild the app completely:
   ```bash
   # iOS
   cd ios && pod install && cd ..
   npm run ios

   # Android
   npm run android
   ```

2. Verify font file exists:
   ```bash
   ls assets/fonts/
   ```

3. Check font name in theme matches file name exactly

### Wrong Font on Android

**Problem**: Font works on iOS but not Android

**Solution**:
- Font names are case-sensitive on Android
- Use exact filename without extension: `Ubuntu-Regular`, `Ubuntu-Medium`, `Ubuntu-Bold`
- Rebuild app: `npm run android`

### Font Looks Different on iOS vs Android

**Problem**: Font renders differently on each platform

**Solution**:
- This is normal - rendering engines differ
- Adjust `fontSize` or `lineHeight` per platform if needed:
  ```typescript
  fontSize: Platform.OS === 'ios' ? 20 : 18
  ```

---

## 📖 Related Documentation

- [THEME_GUIDE.md](THEME_GUIDE.md) - Theme system documentation
- [QUICKSTART.md](QUICKSTART.md) - General development guide

---

**Your app now has beautiful custom typography with Ubuntu! ✨**
