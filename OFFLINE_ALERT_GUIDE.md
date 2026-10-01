# Offline Alert Guide

Your React Native app now detects when there's no internet connection and displays a clear, user-friendly alert to the user.

---

## ✨ Features

- ✅ **Automatic Detection**: Monitors network connectivity in real-time
- ✅ **User-Friendly UI**: Clear alert banner with icon and message
- ✅ **Smooth Animations**: Slides down when offline, slides up when back online
- ✅ **Multilingual**: Supports all 4 languages (English, Spanish, French, Hindi)
- ✅ **Theme Support**: Adapts to light/dark mode
- ✅ **Non-Intrusive**: Appears at top of screen, doesn't block content
- ✅ **Debugging**: Network state changes logged to Reactotron

---

## 📦 What Was Set Up

### 1. **Network Detection Package**
- `@react-native-community/netinfo` - Industry standard for network state monitoring
- Auto-detects: WiFi, Cellular, Offline, etc.
- Checks both connection state AND internet reachability

### 2. **Network Context**
[src/context/NetworkContext.tsx](src/context/NetworkContext.tsx)
- Manages global network state
- Provides `isConnected` and `isInternetReachable` to all components
- Logs network changes to Reactotron for debugging

### 3. **Custom Hook**
[src/hooks/useNetwork.ts](src/hooks/useNetwork.ts)
- Easy access to network state from any component
- Usage: `const {isConnected, isInternetReachable} = useNetwork();`

### 4. **OfflineAlert Component**
[src/components/OfflineAlert.tsx](src/components/OfflineAlert.tsx)
- Beautiful alert banner with 📡 icon
- Smooth slide-down/slide-up animations
- Automatically shows when offline, hides when online
- Fully themed and translated

### 5. **Translations**
Added to all language files:
- [src/locales/en.json](src/locales/en.json) - English
- [src/locales/es.json](src/locales/es.json) - Spanish
- [src/locales/fr.json](src/locales/fr.json) - French
- [src/locales/hi.json](src/locales/hi.json) - Hindi

---

## 🚀 How It Works

### Automatic Detection Flow
```
App starts
    ↓
NetworkProvider subscribes to NetInfo
    ↓
Network state changes detected
    ↓
Context updates isConnected & isInternetReachable
    ↓
OfflineAlert component reacts to state
    ↓
Alert slides down (offline) or up (online)
```

### What Triggers the Alert?
The alert appears when EITHER condition is true:
- `isConnected === false` - No network connection (WiFi/Cellular off)
- `isInternetReachable === false` - Connected to network but no internet

---

## 💻 Usage

### The Alert is Already Active!
No additional setup needed. The alert automatically:
- Monitors network state
- Shows when offline
- Hides when back online

### Using Network State in Your Components

```typescript
import {useNetwork} from '../hooks/useNetwork';

function MyComponent() {
  const {isConnected, isInternetReachable, connectionType} = useNetwork();

  if (!isConnected) {
    return <Text>You are offline</Text>;
  }

  return (
    <View>
      <Text>Connected via: {connectionType}</Text>
      <Text>Internet reachable: {isInternetReachable ? 'Yes' : 'No'}</Text>
    </View>
  );
}
```

### Conditional API Calls

```typescript
import {useNetwork} from '../hooks/useNetwork';

function DataScreen() {
  const {isInternetReachable} = useNetwork();

  const fetchData = async () => {
    if (!isInternetReachable) {
      Alert.alert('Offline', 'Cannot fetch data without internet');
      return;
    }

    // Proceed with API call
    const response = await fetch('https://api.example.com/data');
    // ...
  };

  return (
    <Button
      title="Load Data"
      onPress={fetchData}
      disabled={!isInternetReachable}
    />
  );
}
```

---

## 🎨 Customization

### Changing Alert Appearance

Edit [src/components/OfflineAlert.tsx](src/components/OfflineAlert.tsx):

**Change Colors:**
```typescript
container: {
  backgroundColor: theme.colors.error,  // Change to theme.colors.warning or custom color
  // ...
}
```

**Change Icon:**
```typescript
<Text style={styles.icon}>🌐</Text>  // Change 📡 to any emoji
```

**Change Position:**
```typescript
container: {
  position: 'absolute',
  top: 0,  // Change to 'bottom: 0' for bottom alert
  // ...
}
```

**Adjust Animation Speed:**
```typescript
Animated.spring(slideAnim, {
  toValue: 0,
  useNativeDriver: true,
  tension: 50,  // Increase for faster, decrease for slower
  friction: 8,
}).start();
```

### Customizing Messages

Edit the translation files to change the alert text:

**src/locales/en.json:**
```json
{
  "offline": {
    "title": "You're Offline",
    "message": "Connect to the internet to continue"
  }
}
```

Do the same for `es.json`, `fr.json`, and `hi.json`.

### Adding a Retry Button

Add to [src/components/OfflineAlert.tsx](src/components/OfflineAlert.tsx):

```typescript
import {TouchableOpacity} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

// Inside component, add:
const checkConnection = async () => {
  const state = await NetInfo.fetch();
  if (__DEV__ && console.tron) {
    console.tron.log('Manual network check:', state);
  }
};

// In JSX, add button:
<TouchableOpacity onPress={checkConnection}>
  <Text style={styles.retryButton}>Retry</Text>
</TouchableOpacity>
```

---

## 🔍 Debugging

### Reactotron Integration

Network state changes appear in Reactotron:

```
NETWORK_STATE_CHANGED {
  isConnected: false,
  isInternetReachable: false,
  type: "none"
}
```

### Manual Testing

**Simulate Offline Mode:**

**iOS Simulator:**
1. Go to Settings > WiFi
2. Turn WiFi OFF

**Android Emulator:**
1. Settings > Network & internet > WiFi
2. Turn WiFi OFF

**Physical Device:**
- Enable Airplane mode
- Or turn off WiFi/Cellular data

**Test Recovery:**
1. Turn network back on
2. Alert should slide up automatically

### Checking Network State

```typescript
import NetInfo from '@react-native-community/netinfo';

// Get current state
NetInfo.fetch().then(state => {
  console.log('Connection type', state.type);
  console.log('Is connected?', state.isConnected);
  console.log('Is internet reachable?', state.isInternetReachable);
});
```

---

## 📁 File Structure

```
src/
├── components/
│   └── OfflineAlert.tsx          # Alert UI component
├── context/
│   └── NetworkContext.tsx        # Network state management
├── hooks/
│   └── useNetwork.ts             # Network hook
└── locales/
    ├── en.json                   # English translations
    ├── es.json                   # Spanish translations
    ├── fr.json                   # French translations
    └── hi.json                   # Hindi translations

App.tsx                           # NetworkProvider integration
```

---

## 🎯 Translation Keys

```typescript
t('offline.title')      // "No Internet Connection"
t('offline.message')    // "Please check your network settings"
```

**Available in:**
- 🇺🇸 English: "No Internet Connection"
- 🇪🇸 Spanish: "Sin Conexión a Internet"
- 🇫🇷 French: "Pas de Connexion Internet"
- 🇮🇳 Hindi: "इंटरनेट कनेक्शन नहीं है"

---

## 🔧 Advanced Customization

### Different Alerts for Different States

```typescript
// In OfflineAlert.tsx, modify to show different messages:

const getAlertType = () => {
  if (isConnected === false) {
    return {
      title: t('offline.noConnection'),
      message: t('offline.checkDevice'),
      color: theme.colors.error,
    };
  }
  if (isInternetReachable === false) {
    return {
      title: t('offline.limitedConnection'),
      message: t('offline.noInternet'),
      color: theme.colors.warning,
    };
  }
  return null;
};
```

### Disable Alert for Specific Screens

```typescript
// Pass prop to OfflineAlert
<OfflineAlert hideOnScreens={['Login', 'Offline']} />

// In OfflineAlert component:
interface OfflineAlertProps {
  hideOnScreens?: string[];
}

export const OfflineAlert: React.FC<OfflineAlertProps> = ({hideOnScreens = []}) => {
  // Add logic to check current screen
  // Return null if should hide
}
```

### Persistent Storage Warning

Show warning if offline for extended period:

```typescript
const [offlineDuration, setOfflineDuration] = useState(0);

useEffect(() => {
  if (isOffline) {
    const timer = setInterval(() => {
      setOfflineDuration(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  } else {
    setOfflineDuration(0);
  }
}, [isOffline]);

// Show different message after 30 seconds
{offlineDuration > 30 && (
  <Text>{t('offline.extendedOffline')}</Text>
)}
```

---

## 🐛 Troubleshooting

### Alert Not Appearing

**Check 1: NetworkProvider is wrapped correctly**
```typescript
// In App.tsx, ensure order:
<NetworkProvider>
  <ThemeProvider>
    <AppContent />  // OfflineAlert must be inside NetworkProvider
  </ThemeProvider>
</NetworkProvider>
```

**Check 2: Verify NetInfo is installed**
```bash
npm list @react-native-community/netinfo
```

**Check 3: Rebuild app**
```bash
# iOS
cd ios && pod install && cd ..
npm run ios

# Android
npm run android
```

### Alert Shows but Doesn't Hide

**Check:** Internet reachability vs connection
- Device might be connected to WiFi but WiFi has no internet
- This is correct behavior - alert should stay visible

**Solution:** Connect to working internet connection

### Alert Appears on Startup

**This is normal** - NetInfo takes a moment to detect connection state
- Initial state is `null`
- Alert only shows when state is explicitly `false`

---

## 📊 Network State Values

| State | isConnected | isInternetReachable | What It Means |
|-------|-------------|---------------------|---------------|
| Online | `true` | `true` | Connected with internet |
| WiFi No Internet | `true` | `false` | Connected to WiFi but no internet |
| Offline | `false` | `null` | No network connection |
| Loading | `null` | `null` | Checking connection |

---

## 🎓 Best Practices

### ✅ DO

```typescript
// Use network state to disable features gracefully
const {isInternetReachable} = useNetwork();

<Button
  title="Upload Photo"
  disabled={!isInternetReachable}
  onPress={uploadPhoto}
/>

// Show cached data when offline
if (!isInternetReachable) {
  return <CachedDataView />;
}

// Queue actions for when back online
if (!isInternetReachable) {
  queueAction(action);
  return;
}
```

### ❌ DON'T

```typescript
// Don't rely solely on try-catch for network errors
try {
  await fetch('https://api.example.com');
} catch (e) {
  // User already saw offline alert, no need to show another error
}

// Don't block the entire app when offline
if (!isConnected) {
  return <OfflineScreen />;  // ❌ Too aggressive
}

// Don't spam the user with multiple network alerts
// The global OfflineAlert is enough
```

---

## 📖 Related Documentation

- [@react-native-community/netinfo docs](https://github.com/react-native-netinfo/react-native-netinfo)
- [THEME_GUIDE.md](THEME_GUIDE.md) - Theme customization
- [I18N_GUIDE.md](I18N_GUIDE.md) - Translation system
- [QUICKSTART.md](QUICKSTART.md) - General project guide

---

## 🎉 Summary

Your app now:
- ✅ Detects offline/online state automatically
- ✅ Shows clear, user-friendly alert when offline
- ✅ Hides alert when connection restored
- ✅ Provides network state to all components
- ✅ Supports all 4 languages
- ✅ Integrates with theme system
- ✅ Logs to Reactotron for debugging
- ✅ Easy to customize

**Test it now: Turn off WiFi and watch the alert slide down!** 📡
