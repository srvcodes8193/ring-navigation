# React Native App - Quick Start Guide

## 🧭 Navigation

**This app has React Navigation fully configured!**

- See [NAVIGATION_SETUP.md](NAVIGATION_SETUP.md) for complete navigation documentation
- Stack Navigator with Home and Details screens
- Bottom Tab Navigator available (optional)
- Type-safe navigation with TypeScript
- Themed navigation bars
- Easy to add more screens

## 🎨 App Icon

**This app has a custom app icon configured!**

- See [APP_ICON_SETUP.md](APP_ICON_SETUP.md) for complete app icon documentation
- Blue design with "MA" branding
- All required sizes generated for Android and iOS
- Professional appearance on all devices
- Easy to customize with your own design

## 📡 Offline Alert

**This app detects when there's no internet connection!**

- See [OFFLINE_ALERT_GUIDE.md](OFFLINE_ALERT_GUIDE.md) for complete offline detection documentation
- Automatic network state monitoring
- User-friendly alert banner when offline
- Supports all 4 languages
- Easy to customize appearance and behavior

## ✍️ Custom Fonts

**This app uses Ubuntu from Google Fonts!**

- See [FONTS_GUIDE.md](FONTS_GUIDE.md) for font customization guide
- Default font: Ubuntu (clean, modern sans-serif)
- Multiple weights: Regular, Medium, Bold
- Fully integrated with theme system
- Easy to add more fonts

## 🌍 Internationalization (i18n)

**This app supports multiple languages!**

- See [I18N_GUIDE.md](I18N_GUIDE.md) for complete localization documentation
- Supports: English, Spanish, French, Hindi
- Automatically detects device language
- Easy language switching with built-in selector
- User's language choice is saved

## 🎨 Theme Support

**This app has full Light & Dark mode support!**

- See [THEME_GUIDE.md](THEME_GUIDE.md) for complete theme documentation
- Toggle between Light/Dark mode with the switch in the app
- Automatically follows system preference by default
- Fully type-safe with TypeScript

## 🐛 Debugging

**This project is fully configured with the best debugging tools!**

- See [DEBUGGING_GUIDE.md](DEBUGGING_GUIDE.md) for comprehensive debugging documentation
- See [DEBUG_CHEATSHEET.md](DEBUG_CHEATSHEET.md) for quick reference

**Installed tools:**
- ✅ Reactotron - Best all-in-one debugger
- ✅ React DevTools - Component inspector
- ✅ Chrome DevTools - JavaScript debugger
- ✅ Flipper - Native debugging (built-in)
- ✅ Custom debug utilities

## Project Structure

```
MyApp/
├── src/
│   ├── screens/          # App screens
│   │   └── HomeScreen.tsx
│   ├── components/       # Reusable components
│   ├── context/          # React contexts
│   │   └── ThemeContext.tsx  # Theme provider
│   ├── hooks/            # Custom hooks
│   │   └── useTheme.ts       # Theme hook
│   ├── navigation/       # Navigation configuration
│   ├── utils/            # Utility functions & debug helpers
│   │   ├── debugUtils.ts
│   │   └── networkLogger.ts
│   ├── config/           # Configuration files
│   │   ├── ReactotronConfig.ts
│   │   └── theme.ts          # Theme colors & values
│   └── types/            # TypeScript type definitions
├── android/              # Android native code
├── ios/                  # iOS native code
├── App.tsx               # Root component
└── index.js              # App entry point
```

## Development Commands

### Start Metro Bundler
The Metro bundler compiles your JavaScript code.

```bash
cd MyApp
npm start
# or
yarn start
```

### Run on Android

Make sure you have an Android emulator running or a device connected via USB.

```bash
npm run android
# or
yarn android
```

**First time setup:**
1. Open Android Studio
2. Go to Tools > Device Manager
3. Create a new Virtual Device (e.g., Pixel 5)
4. Start the emulator

### Run on iOS (macOS only)

```bash
npm run ios
# or
yarn ios
```

**First time setup (macOS only):**
```bash
cd ios
pod install
cd ..
npm run ios
```

To run on a specific simulator:
```bash
npm run ios -- --simulator="iPhone 15 Pro"
```

### TypeScript Type Checking

```bash
npx tsc --noEmit
```

### Linting

```bash
npm run lint
# or
yarn lint
```

## Code Location

### Main App Entry
- **App.tsx** - Root component that renders HomeScreen

### Example Screen
- **src/screens/HomeScreen.tsx** - Hello World screen with a counter example
  - Demonstrates state management with `useState`
  - Shows styling with `StyleSheet`
  - Includes interactive buttons with `TouchableOpacity`

### Making Changes

1. Open [src/screens/HomeScreen.tsx](src/screens/HomeScreen.tsx)
2. Edit the JSX or styles
3. Save the file
4. The app will automatically reload (Fast Refresh)

## Adding New Screens

1. Create a new file in `src/screens/` (e.g., `ProfileScreen.tsx`)
2. Import and use it in `App.tsx`
3. For navigation between screens, install `@react-navigation/native`

## Common Issues

### Metro bundler cache issues
```bash
npm start -- --reset-cache
```

### Android build issues
```bash
cd android
./gradlew clean
cd ..
npm run android
```

### iOS build issues
```bash
cd ios
pod install
cd ..
npm run ios
```

## Next Steps

- Add [React Navigation](https://reactnavigation.org/) for multi-screen apps
- Add state management (Redux, Zustand, or Context API)
- Add API calls with fetch or axios
- Add testing with Jest and React Native Testing Library
- Add icons with react-native-vector-icons

## Resources

- [React Native Documentation](https://reactnative.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Navigation](https://reactnavigation.org/)
