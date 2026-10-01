# Moment.js & React Native WebView - Setup Complete

## ✅ Packages Installed

1. **moment** - Date/time manipulation library
2. **react-native-webview** - WebView component for React Native

## 📦 What Was Done

### 1. Package Installation
```bash
npm install moment react-native-webview
```

### 2. WebView Component Created
- Location: `src/components/ui/WebViewComponent.tsx`
- Features:
  - Loading indicator
  - Error handling
  - Customizable URI
  - Optional title
  - Clean, reusable wrapper

### 3. HomeScreen Updated
Added two new showcase sections:
- **Moment.js Section** - Displays various date/time formats
- **WebView Section** - Button to open React Native website in WebView modal

### 4. UI Components Index Updated
- Exported `WebViewComponent` from `src/components/ui/index.ts`

## 🕐 Moment.js Usage

### What's Showcased in HomeScreen

1. **Current Date/Time** - Full formatted date and time
2. **Relative Time** - "a few seconds ago" format
3. **Calendar** - Calendar format ("Today at 2:30 PM")
4. **Start of Week** - First day of current week
5. **End of Month** - Last day of current month
6. **Days in Month** - Total days in current month
7. **Week of Year** - Current week number
8. **Unix Timestamp** - Unix epoch time

### Common Moment.js Examples

```typescript
import moment from 'moment';

// Current date/time
const now = moment();

// Formatting
moment().format('MMMM Do YYYY, h:mm:ss a');  // "December 25th 2025, 2:30:45 pm"
moment().format('MMM DD, YYYY');              // "Dec 25, 2025"
moment().format('YYYY-MM-DD');                // "2025-12-25"
moment().format('HH:mm:ss');                  // "14:30:45"

// Relative time
moment().fromNow();                           // "a few seconds ago"
moment().subtract(5, 'days').fromNow();       // "5 days ago"
moment().add(7, 'days').fromNow();            // "in 7 days"

// Calendar time
moment().calendar();                          // "Today at 2:30 PM"
moment().subtract(1, 'days').calendar();      // "Yesterday at 2:30 PM"
moment().add(1, 'days').calendar();           // "Tomorrow at 2:30 PM"

// Manipulation
moment().add(7, 'days');                      // Add 7 days
moment().subtract(1, 'months');               // Subtract 1 month
moment().startOf('month');                    // First day of month
moment().endOf('year');                       // Last day of year

// Comparison
moment().isBefore('2026-01-01');              // true/false
moment().isAfter('2024-01-01');               // true/false
moment().isBetween('2025-01-01', '2026-01-01'); // true/false

// Query
moment().daysInMonth();                       // 31
moment().week();                              // 52
moment().day();                               // 4 (Thursday)
moment().hour();                              // 14
moment().unix();                              // 1735134645

// Parse dates
moment('2025-12-25');
moment('12/25/2025', 'MM/DD/YYYY');
moment(1735134645000);  // From milliseconds
```

## 🌐 WebView Usage

### What's Showcased in HomeScreen

1. **Button** - Opens WebView in modal
2. **Modal** - Full-screen WebView display
3. **WebView Component** - Loads React Native website
4. **Loading Indicator** - Shows while page loads
5. **Close Button** - Dismiss modal

### WebViewComponent Props

```typescript
interface WebViewComponentProps {
  uri: string;              // Required - URL to load
  title?: string;           // Optional - Header title
  onLoadEnd?: () => void;   // Optional - Callback when loaded
  onError?: (error: any) => void; // Optional - Error callback
  style?: any;              // Optional - Custom styles
}
```

### Usage Examples

#### Basic Usage
```typescript
import {WebViewComponent} from '../components/ui';

<WebViewComponent uri="https://reactnative.dev" />
```

#### With Title
```typescript
<WebViewComponent
  uri="https://reactnative.dev"
  title="React Native Docs"
/>
```

#### With Callbacks
```typescript
<WebViewComponent
  uri="https://reactnative.dev"
  onLoadEnd={() => console.log('Page loaded')}
  onError={(error) => console.error('Error:', error)}
/>
```

#### In a Modal (like HomeScreen)
```typescript
import {Modal} from 'react-native';
import {WebViewComponent} from '../components/ui';

const [showWebView, setShowWebView] = useState(false);

<Modal
  visible={showWebView}
  animationType="slide"
  onRequestClose={() => setShowWebView(false)}>
  <SafeAreaView style={{flex: 1}}>
    <View style={styles.header}>
      <Text>My Website</Text>
      <TouchableOpacity onPress={() => setShowWebView(false)}>
        <Text>Close</Text>
      </TouchableOpacity>
    </View>
    <WebViewComponent uri="https://example.com" />
  </SafeAreaView>
</Modal>
```

#### Load HTML Content
```typescript
import WebView from 'react-native-webview';

const htmlContent = `
  <html>
    <body>
      <h1>Hello from HTML</h1>
      <p>This is inline HTML content</p>
    </body>
  </html>
`;

<WebView
  source={{html: htmlContent}}
  style={{flex: 1}}
/>
```

#### Post Data to WebView
```typescript
<WebView
  source={{
    uri: 'https://example.com/login',
    method: 'POST',
    body: 'username=user&password=pass',
  }}
/>
```

#### Inject JavaScript
```typescript
const injectedJavaScript = `
  document.body.style.backgroundColor = 'lightblue';
  true; // Must return a value
`;

<WebView
  source={{uri: 'https://example.com'}}
  injectedJavaScript={injectedJavaScript}
/>
```

#### Handle Navigation
```typescript
<WebView
  source={{uri: 'https://example.com'}}
  onNavigationStateChange={(navState) => {
    console.log('URL:', navState.url);
    console.log('Can go back:', navState.canGoBack);
    console.log('Can go forward:', navState.canGoForward);
  }}
/>
```

## 📱 Real-World Examples

### Example 1: Birthday Countdown
```typescript
import moment from 'moment';

const birthday = moment('2026-01-15');
const today = moment();
const daysUntil = birthday.diff(today, 'days');

<Text>Days until birthday: {daysUntil}</Text>
```

### Example 2: Age Calculator
```typescript
import moment from 'moment';

const birthDate = moment('1990-05-20');
const age = moment().diff(birthDate, 'years');

<Text>Age: {age} years old</Text>
```

### Example 3: Event Timer
```typescript
import moment from 'moment';

const eventDate = moment('2025-12-31 23:59:59');
const duration = moment.duration(eventDate.diff(moment()));

<Text>
  Time remaining: {duration.days()}d {duration.hours()}h {duration.minutes()}m
</Text>
```

### Example 4: Date Picker Formatted
```typescript
import moment from 'moment';

const [selectedDate, setSelectedDate] = useState(moment());

<Text>Selected: {selectedDate.format('MMMM Do, YYYY')}</Text>
```

### Example 5: In-App Browser
```typescript
const [url, setUrl] = useState('https://github.com');

<WebViewComponent
  uri={url}
  title="GitHub"
  onLoadEnd={() => console.log('GitHub loaded')}
/>
```

### Example 6: Help/Support Page
```typescript
<WebViewComponent
  uri="https://your-app.com/help"
  title="Help & Support"
/>
```

### Example 7: Terms & Conditions
```typescript
<WebViewComponent
  uri="https://your-app.com/terms"
  title="Terms & Conditions"
/>
```

## 🎯 Demo Location

Open the app and check **HomeScreen** to see:
- Live moment.js date/time formats
- WebView button that opens React Native website

## 🔧 Files Created/Modified

### Created:
- `src/components/ui/WebViewComponent.tsx` - Reusable WebView wrapper

### Modified:
- `src/components/ui/index.ts` - Added WebViewComponent export
- `src/screens/HomeScreen.tsx` - Added moment & WebView showcase
- `package.json` - Added moment and react-native-webview

## ⚠️ Important Notes

### For Android:
WebView should work out of the box after running:
```bash
npm run android
```

### For iOS:
Need to install pods first:
```bash
cd ios && pod install && cd ..
npm run ios
```

### WebView Permissions

If loading external URLs, ensure you have proper permissions:

**iOS:** Add to `Info.plist`:
```xml
<key>NSAppTransportSecurity</key>
<dict>
  <key>NSAllowsArbitraryLoads</key>
  <true/>
</dict>
```

**Android:** Internet permission is already in `AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.INTERNET" />
```

## 📚 Additional Resources

### Moment.js
- [Official Documentation](https://momentjs.com/docs/)
- [Format Tokens](https://momentjs.com/docs/#/displaying/format/)
- [Manipulation Methods](https://momentjs.com/docs/#/manipulating/)

### React Native WebView
- [GitHub Repository](https://github.com/react-native-webview/react-native-webview)
- [API Reference](https://github.com/react-native-webview/react-native-webview/blob/master/docs/Reference.md)
- [Guide](https://github.com/react-native-webview/react-native-webview/blob/master/docs/Guide.md)

## 🚀 Next Steps

1. Run the app to see the showcase
2. Try modifying moment formats in HomeScreen
3. Change the WebView URI to load different websites
4. Create your own date/time utilities using moment
5. Build custom WebView screens for your app content

---

**Ready to use!** 🎉 Moment.js and WebView are fully integrated and showcased in HomeScreen.
