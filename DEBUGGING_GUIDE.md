# React Native Debugging Guide

This guide covers all the debugging tools and techniques configured in this project.

---

## Table of Contents

1. [Chrome DevTools (JavaScript Debugging)](#1-chrome-devtools)
2. [Reactotron (Most Popular RN Debugger)](#2-reactotron)
3. [React DevTools](#3-react-devtools)
4. [Flipper (Meta's Official Debugger)](#4-flipper)
5. [Debugging Utilities](#5-debugging-utilities)
6. [Common Debugging Scenarios](#6-common-debugging-scenarios)

---

## 1. Chrome DevTools (JavaScript Debugging)

### What it is
Built-in JavaScript debugger using Chrome's DevTools.

### When to use
- Setting breakpoints in your code
- Inspecting variables and call stacks
- Stepping through code execution
- Viewing console.log outputs

### How to use

**Enable:**
1. Run your app: `npm run android` or `npm run ios`
2. Open the developer menu:
   - **Android**: Shake device or press `Cmd/Ctrl + M`
   - **iOS**: Shake device or press `Cmd + D`
3. Select "Open Debugger" or press `J` in Metro terminal

**Tips:**
- Set breakpoints by clicking line numbers in Sources tab
- Use `debugger;` statement in code to trigger breakpoint
- Console tab shows all `console.log()` outputs
- Network tab shows fetch/XHR requests

---

## 2. Reactotron (Most Popular RN Debugger)

### What it is
A powerful desktop app for debugging React Native apps. Think of it as a control center for your app.

### Why it's useful
- **Custom logging**: Better than console.log
- **State inspection**: View Redux/MobX state
- **API monitoring**: Track all network requests
- **Performance monitoring**: Measure render times
- **Custom commands**: Trigger actions from desktop app
- **Timeline view**: See all events chronologically

### Setup

**1. Download Reactotron Desktop App:**
- macOS: https://github.com/infinitered/reactotron/releases
- Linux: https://github.com/infinitered/reactotron/releases
- Windows: https://github.com/infinitered/reactotron/releases

**2. Launch Reactotron app** before starting your React Native app

**3. Run your app:**
```bash
npm start
npm run android  # or npm run ios
```

**4. Your app will automatically connect** to Reactotron

### How to use

**Basic Logging:**
```typescript
// Instead of console.log
console.tron.log('Hello from Reactotron!');

// Warning
console.tron.warn('This is a warning');

// Error
console.tron.error('This is an error');

// Display formatted data
console.tron.display({
  name: 'USER_LOGIN',
  value: { username: 'john', timestamp: Date.now() },
  preview: 'User logged in successfully'
});
```

**Using Debug Utilities:**
```typescript
import { logger } from './src/utils/debugUtils';

// Enhanced logging
logger.log('Counter value:', count);
logger.warn('Something might be wrong');
logger.error('An error occurred');

// Performance measurement
const fetchData = measurePerformanceAsync(async () => {
  const response = await fetch('https://api.example.com/data');
  return response.json();
}, 'API: Fetch Data');
```

**Network Monitoring:**
```typescript
import { debugFetch } from './src/utils/networkLogger';

// Automatically logs requests and responses in Reactotron
const response = await debugFetch('https://api.example.com/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'John' }),
});
```

**Component Lifecycle Logging:**
```typescript
import { useLifecycleLogger, useRenderCount } from './src/utils/debugUtils';

function MyComponent() {
  useLifecycleLogger('MyComponent'); // Logs mount/unmount
  useRenderCount('MyComponent'); // Logs render count

  return <View>...</View>;
}
```

### Reactotron Features

- **Timeline**: See all events in chronological order
- **State**: Inspect Redux/MobX state (when configured)
- **API**: View all network requests/responses
- **Custom Commands**: Add buttons to trigger actions
- **Snapshots**: Save app state for later inspection

---

## 3. React DevTools

### What it is
Official React debugging tool for inspecting component hierarchy and props.

### When to use
- Inspect component tree
- View/edit component props and state
- Debug React hooks
- Profile component performance

### How to use

**1. Start React DevTools:**
```bash
npm run devtools
```

**2. Run your app** (in another terminal):
```bash
npm run android  # or npm run ios
```

**3. DevTools will automatically connect**

### Features

- **Components Tab**:
  - Browse component tree
  - Select components to inspect props/state
  - Edit props/state in real-time
  - Search for components by name

- **Profiler Tab**:
  - Record component renders
  - Identify performance bottlenecks
  - See why components re-rendered
  - Flame graph visualization

### Tips

- Click the eye icon to highlight component on screen
- Use search box to find components quickly
- Right-click components for more options
- Enable "Highlight updates" to see which components re-render

---

## 4. Flipper (Meta's Official Debugger)

### What it is
Meta's official debugging platform for mobile apps (iOS & Android).

### When to use
- Inspect layout hierarchy
- View native logs
- Debug network requests
- Inspect databases (SQLite)
- View shared preferences
- Profile app performance

### Setup

**1. Download Flipper:**
- https://fbflipper.com/

**2. Run Flipper app**

**3. Run your React Native app:**
```bash
npm run android  # or npm run ios
```

**4. Your app should appear in Flipper's device list**

### Features

- **Layout Inspector**: Visualize view hierarchy (like Chrome DevTools for native views)
- **Network**: Monitor all network traffic
- **Logs**: View native Android/iOS logs
- **Databases**: Inspect SQLite databases
- **Shared Preferences**: View AsyncStorage data
- **React DevTools**: Built-in React component inspector
- **Hermes Debugger**: Debug Hermes JS engine

### Common Plugins

- **React Native**: Core RN debugging
- **Hermes Debugger**: JavaScript debugging with Hermes
- **Layout**: Inspect view hierarchy
- **Network**: Monitor API calls
- **Databases**: View local databases
- **Shared Preferences**: Inspect AsyncStorage

---

## 5. Debugging Utilities

We've created custom utilities to make debugging easier.

### Logger

Located in [src/utils/debugUtils.ts](src/utils/debugUtils.ts)

```typescript
import { logger } from './src/utils/debugUtils';

// Basic logging (works with Reactotron if available)
logger.log('Simple message');
logger.warn('Warning message');
logger.error('Error message');

// Structured logging
logger.display({
  name: 'USER_ACTION',
  value: { action: 'button_click', screen: 'home' },
  preview: 'User clicked button on home screen'
});
```

### Performance Measurement

```typescript
import { measurePerformance, measurePerformanceAsync } from './src/utils/debugUtils';

// Synchronous function
const expensiveCalculation = measurePerformance(
  (data) => {
    // Your expensive logic
    return result;
  },
  'Expensive Calculation'
);

// Async function
const fetchUser = measurePerformanceAsync(
  async (userId) => {
    const response = await fetch(`/api/users/${userId}`);
    return response.json();
  },
  'Fetch User'
);
```

### React Hooks for Debugging

```typescript
import {
  useLifecycleLogger,
  useRenderCount,
  usePropsLogger
} from './src/utils/debugUtils';

function MyComponent({ userId, name }) {
  // Log when component mounts/unmounts
  useLifecycleLogger('MyComponent');

  // Count renders
  useRenderCount('MyComponent');

  // Log when props change
  usePropsLogger('MyComponent', { userId, name });

  return <View>...</View>;
}
```

### Network Logger

Located in [src/utils/networkLogger.ts](src/utils/networkLogger.ts)

```typescript
import { debugFetch } from './src/utils/networkLogger';

// Automatically logs request/response to Reactotron
const response = await debugFetch('https://api.example.com/data');
const data = await response.json();
```

---

## 6. Common Debugging Scenarios

### Scenario 1: App crashes on startup

**Steps:**
1. Open Flipper → Logs tab to see native crash logs
2. Check Metro bundler terminal for JS errors
3. Open Chrome DevTools for JS stack trace

### Scenario 2: Component not re-rendering

**Steps:**
1. Open React DevTools → Components tab
2. Find your component in the tree
3. Check if props/state are actually changing
4. Enable "Highlight updates" to see render cycles
5. Use Profiler to see why component didn't re-render

### Scenario 3: API call failing

**Steps:**
1. Use `debugFetch` instead of `fetch`
2. Open Reactotron → Timeline
3. Find the API request event
4. Inspect request headers, body, response
5. Or use Flipper → Network tab for native network layer

### Scenario 4: Performance issues

**Steps:**
1. React DevTools → Profiler → Start recording
2. Interact with your app
3. Stop recording
4. Analyze flame graph for expensive renders
5. Use `measurePerformance` for specific functions
6. Check Reactotron timeline for slow operations

### Scenario 5: Memory leak

**Steps:**
1. React DevTools → Profiler → Record
2. Navigate through screens multiple times
3. Look for components that don't unmount
4. Add `useLifecycleLogger` to suspect components
5. Check if event listeners are being cleaned up

### Scenario 6: Layout issues

**Steps:**
1. Open Flipper → Layout Inspector
2. Click "Target" icon, then tap element on device
3. View element properties, constraints, position
4. Check computed styles and margins

### Scenario 7: State not updating correctly

**Steps:**
1. Add `logger.log()` before and after setState
2. Open Reactotron to see state changes
3. Use React DevTools to inspect current state
4. Check if state updates are batched
5. Verify you're not mutating state directly

---

## Quick Reference Commands

```bash
# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Open React DevTools
npm run devtools

# Run tests
npm test

# Type checking
npx tsc --noEmit

# Lint code
npm run lint
```

## Development Menu Shortcuts

### Android
- **Open Dev Menu**: `Cmd/Ctrl + M` or shake device
- **Reload**: `R` twice in Metro terminal or `Cmd/Ctrl + M` → Reload
- **Open Debugger**: `Cmd/Ctrl + M` → Debug

### iOS
- **Open Dev Menu**: `Cmd + D` or shake device
- **Reload**: `Cmd + R`
- **Open Debugger**: `Cmd + D` → Debug

---

## Best Practices

1. **Use Reactotron for everything** - It's the most comprehensive tool
2. **Remove debug logs before production** - All our utilities check `__DEV__`
3. **Use structured logging** - `logger.display()` instead of `console.log()`
4. **Profile regularly** - Use React DevTools Profiler to catch performance issues early
5. **Debug on real devices** - Emulators can hide performance issues
6. **Use breakpoints** - Step through code instead of littering with logs
7. **Monitor network** - Use `debugFetch` for all API calls

---

## Troubleshooting

### Reactotron not connecting

1. Make sure Reactotron desktop app is running BEFORE starting your app
2. For Android emulator, check ReactotronConfig.ts uses correct host
3. For physical device, use your computer's local IP address
4. Restart both Reactotron and your app

### React DevTools not connecting

1. Make sure you ran `npm run devtools` first
2. Restart Metro bundler
3. Reload your app

### Flipper not detecting app

1. Make sure Flipper is running before launching app
2. For iOS, try `cd ios && pod install && cd ..`
3. For Android, check USB debugging is enabled
4. Restart Flipper and rebuild app

### Chrome DevTools blank screen

1. Close all Chrome DevTools windows
2. Open Dev Menu → Stop Debugging
3. Open Dev Menu → Start Debugging
4. Try incognito mode in Chrome

---

## Additional Resources

- [React Native Debugging Docs](https://reactnative.dev/docs/debugging)
- [Reactotron Documentation](https://github.com/infinitered/reactotron)
- [Flipper Documentation](https://fbflipper.com/docs/features/react-native)
- [React DevTools Tutorial](https://react.dev/learn/react-developer-tools)
