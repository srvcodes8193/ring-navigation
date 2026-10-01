# Debugging Tools Overview

Visual guide to understanding which tool to use and when.

---

## 🎯 Tool Selection Guide

```
Need to debug...                     Use This Tool
────────────────────────────────────────────────────────
📝 Log messages                   → Reactotron
🌐 API requests/responses         → Reactotron / debugFetch
⚡ Performance issues              → React DevTools Profiler
🎨 Component hierarchy            → React DevTools
🔍 Step through code              → Chrome DevTools
📱 Native crashes                 → Flipper
📐 Layout problems                → Flipper Layout Inspector
💾 AsyncStorage data              → Flipper
🔄 State management               → Reactotron + React DevTools
```

---

## 🏗️ Architecture Diagram

```
Your React Native App
        │
        ├──────────────────────────────────────────┐
        │                                          │
        ↓                                          ↓
┌───────────────────┐                    ┌──────────────────┐
│   JavaScript      │                    │   Native Layer   │
│   (Hermes/JSC)    │                    │   (iOS/Android)  │
│                   │                    │                  │
│  Your Code        │                    │  Native Modules  │
│  React Components │                    │  Views           │
└────────┬──────────┘                    └────────┬─────────┘
         │                                        │
         │ Debugged by:                          │ Debugged by:
         │                                        │
         ↓                                        ↓
┌──────────────────────────────────────┐  ┌─────────────────┐
│ Reactotron                           │  │ Flipper         │
│ - Logs                               │  │ - Native logs   │
│ - Network requests                   │  │ - Layout        │
│ - Custom displays                    │  │ - Databases     │
└──────────────────────────────────────┘  │ - Preferences   │
                                          └─────────────────┘
┌──────────────────────────────────────┐
│ React DevTools                       │
│ - Component tree                     │
│ - Props/State                        │
│ - Hooks                              │
│ - Profiler                           │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│ Chrome DevTools                      │
│ - Breakpoints                        │
│ - Call stack                         │
│ - Console                            │
│ - Sources                            │
└──────────────────────────────────────┘
```

---

## 🔄 Debugging Workflow

### Typical Development Day

```
Morning:
1. ☕ Start coding session
2. 🚀 Launch Reactotron desktop app
3. 📱 Run: npm start && npm run android
4. 👀 Keep Reactotron open in second monitor
5. 💻 Code with real-time logging feedback

When Issue Occurs:
┌─────────────────────────────────────────┐
│ Issue Type          → First Tool        │
├─────────────────────────────────────────┤
│ Something not working → Reactotron logs │
│ API failing         → Reactotron/Flipper│
│ Component issue     → React DevTools    │
│ Logic bug           → Chrome DevTools   │
│ App crash           → Flipper logs      │
│ Slow performance    → React Profiler    │
│ Layout broken       → Flipper Layout    │
└─────────────────────────────────────────┘
```

---

## 📊 Tool Capabilities Matrix

|                          | Reactotron | React DevTools | Chrome DevTools | Flipper |
|--------------------------|------------|----------------|-----------------|---------|
| **JavaScript Logs**      | ✅ Best    | ❌             | ✅              | ❌      |
| **Component Tree**       | ❌         | ✅ Best        | ❌              | ✅      |
| **Props/State**          | ✅         | ✅ Best        | ✅              | ✅      |
| **Breakpoints**          | ❌         | ❌             | ✅ Best         | ❌      |
| **Network Requests**     | ✅ Best    | ❌             | ✅              | ✅ Best |
| **Performance Profile**  | ⚠️         | ✅ Best        | ✅              | ✅      |
| **Native Logs**          | ❌         | ❌             | ❌              | ✅ Best |
| **Layout Inspector**     | ❌         | ⚠️             | ❌              | ✅ Best |
| **AsyncStorage/DB**      | ❌         | ❌             | ❌              | ✅ Best |
| **Custom Commands**      | ✅ Best    | ❌             | ❌              | ✅      |
| **Timeline View**        | ✅ Best    | ❌             | ❌              | ⚠️      |
| **Easy Setup**           | ✅         | ✅             | ✅              | ⚠️      |

**Legend:** ✅ = Supported, ✅ Best = Best tool for this, ⚠️ = Partial, ❌ = Not supported

---

## 🎮 Interactive Features

### Reactotron Desktop App

```
┌─────────────────────────────────────────────────────┐
│ Reactotron                                    [x]   │
├─────────────────────────────────────────────────────┤
│ Timeline | State | API | Custom                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ✅ Counter updated: 5                              │
│  🌐 GET https://api.example.com/users (234ms)      │
│  ⚠️  Counter reset to 0                            │
│  📊 INCREMENT { value: 6 }                         │
│                                                     │
│  [Clear] [Pause] [Search...]                       │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### React DevTools

```
┌─────────────────────────────────────────────────────┐
│ React DevTools - Components                  [x]   │
├─────────────────────────────────────────────────────┤
│ ▼ App                          │ Props              │
│   ▼ SafeAreaProvider           │                    │
│     ▶ StatusBar                │ count: 5           │
│     ▼ HomeScreen     ← Selected│                    │
│       ▶ SafeAreaView           │ Hooks:             │
│         ▶ View                 │  State: 5          │
│           ▶ Text               │                    │
│           ▶ View               │ [Edit] [Log]       │
└─────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start Commands

```bash
# Start everything at once (recommended)
# Terminal 1
npm start

# Terminal 2 (after launching Reactotron desktop app)
npm run android

# Optional Terminal 3
npm run devtools
```

---

## 💡 Pro Tips

### 1. Use Reactotron for 90% of debugging
```typescript
// Instead of console.log everywhere
import { logger } from './src/utils/debugUtils';

logger.log('User pressed button');
logger.display({
  name: 'USER_ACTION',
  value: { action: 'login', timestamp: Date.now() }
});
```

### 2. Profile before optimizing
```typescript
// Don't guess - measure!
import { measurePerformance } from './src/utils/debugUtils';

const expensiveCalc = measurePerformance(
  (data) => {
    // Complex calculation
    return result;
  },
  'Expensive Calculation'
);
```

### 3. Debug API calls properly
```typescript
// See full request/response in Reactotron
import { debugFetch } from './src/utils/networkLogger';

const response = await debugFetch('https://api.example.com/users');
```

### 4. Monitor component lifecycle
```typescript
// Know when components mount/unmount
import { useLifecycleLogger } from './src/utils/debugUtils';

function MyComponent() {
  useLifecycleLogger('MyComponent');
  // ...
}
```

---

## 🎓 Learning Path

**Week 1: Basics**
- [ ] Install Reactotron desktop app
- [ ] Try `console.tron.log()` in HomeScreen
- [ ] Watch Timeline while clicking buttons
- [ ] Try `logger.display()` with custom data

**Week 2: Intermediate**
- [ ] Install React DevTools: `npm run devtools`
- [ ] Inspect component tree
- [ ] Edit props/state in real-time
- [ ] Record a performance profile

**Week 3: Advanced**
- [ ] Use `debugFetch` for API calls
- [ ] Set breakpoints in Chrome DevTools
- [ ] Use Flipper to inspect layout
- [ ] Create custom Reactotron commands

**Week 4: Master**
- [ ] Profile and optimize performance
- [ ] Debug native crashes with Flipper
- [ ] Use all debug utilities in production app
- [ ] Teach others your workflow

---

## 📖 Documentation Index

1. **[DEBUGGING_SETUP_SUMMARY.md](DEBUGGING_SETUP_SUMMARY.md)** - Start here! Overview of setup
2. **[DEBUGGING_GUIDE.md](DEBUGGING_GUIDE.md)** - Complete reference (detailed)
3. **[DEBUG_CHEATSHEET.md](DEBUG_CHEATSHEET.md)** - Quick commands (bookmark this!)
4. **[DEBUGGING_TOOLS_OVERVIEW.md](DEBUGGING_TOOLS_OVERVIEW.md)** - This file (visual guide)
5. **[QUICKSTART.md](QUICKSTART.md)** - General project guide

---

## 🆘 Quick Help

**Reactotron not connecting?**
→ Launch desktop app BEFORE starting React Native app

**How do I log to Reactotron?**
→ `console.tron.log('message')` or `logger.log('message')`

**Best tool for component bugs?**
→ React DevTools (`npm run devtools`)

**Best tool for API bugs?**
→ Reactotron Timeline or `debugFetch()`

**App crashing?**
→ Check Flipper → Logs tab

**Need to step through code?**
→ Chrome DevTools → Set breakpoint → Dev Menu → Debug

---

## 🎉 Remember

- **Reactotron** = Your main debugging buddy (use daily)
- **React DevTools** = Component inspector (use often)
- **Chrome DevTools** = Breakpoint debugger (use when needed)
- **Flipper** = Native issues (use occasionally)

**Start simple**: Just use Reactotron for now. Add other tools as needed!

Happy debugging! 🐛✨
