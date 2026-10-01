# Moment.js & WebView - Quick Reference

## 📅 Moment.js - Quick Examples

```typescript
import moment from 'moment';

// FORMAT DATES
moment().format('MMMM Do YYYY');        // December 25th 2025
moment().format('MMM DD, YYYY');        // Dec 25, 2025
moment().format('YYYY-MM-DD');          // 2025-12-25
moment().format('h:mm A');              // 2:30 PM

// RELATIVE TIME
moment().fromNow();                     // "a few seconds ago"
moment('2025-12-20').fromNow();         // "5 days ago"

// CALENDAR
moment().calendar();                    // "Today at 2:30 PM"

// MANIPULATE
moment().add(7, 'days')                 // Add 7 days
moment().subtract(1, 'month')           // Subtract 1 month
moment().startOf('week')                // Start of week
moment().endOf('month')                 // End of month

// QUERY
moment().daysInMonth()                  // 31
moment().week()                         // 52
moment().unix()                         // 1735134645
```

## 🌐 WebView - Quick Examples

```typescript
import {WebViewComponent} from '../components/ui';

// BASIC
<WebViewComponent uri="https://reactnative.dev" />

// WITH TITLE
<WebViewComponent
  uri="https://reactnative.dev"
  title="React Native Docs"
/>

// IN MODAL (see HomeScreen for full example)
<Modal visible={showWebView}>
  <WebViewComponent uri="https://example.com" />
</Modal>
```

## 🎯 See It In Action

Run the app and open **HomeScreen** to see:
- 8 different moment.js date formats
- Button to open React Native website in WebView

## 📁 Files

- **WebView Component:** `src/components/ui/WebViewComponent.tsx`
- **Documentation:** `MOMENT_WEBVIEW_SETUP.md`
- **Demo:** `src/screens/HomeScreen.tsx`

---

Full documentation in [MOMENT_WEBVIEW_SETUP.md](MOMENT_WEBVIEW_SETUP.md)
