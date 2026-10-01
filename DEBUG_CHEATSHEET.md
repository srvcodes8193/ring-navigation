# Debugging Cheat Sheet

Quick reference for day-to-day debugging.

## 🚀 Start Debugging Session

```bash
# Terminal 1: Start Metro
npm start

# Terminal 2: Launch Reactotron desktop app first, then:
npm run android  # or npm run ios

# Terminal 3 (optional): React DevTools
npm run devtools
```

## 📱 Device Shortcuts

| Action | Android | iOS |
|--------|---------|-----|
| Dev Menu | `Cmd+M` / Shake | `Cmd+D` / Shake |
| Reload | `R` twice | `Cmd+R` |
| Debugger | Dev Menu → Debug | Dev Menu → Debug |

## 🔍 Quick Logging

```typescript
// Basic (goes to Reactotron if available)
console.tron.log('message');
console.tron.warn('warning');
console.tron.error('error');

// Or use our utilities
import { logger } from './src/utils/debugUtils';
logger.log('Enhanced logging');
```

## 🎯 Common Tasks

### Debug API Call
```typescript
import { debugFetch } from './src/utils/networkLogger';
const response = await debugFetch('https://api.example.com/data');
```

### Track Component Renders
```typescript
import { useRenderCount } from './src/utils/debugUtils';
useRenderCount('MyComponent');
```

### Measure Performance
```typescript
import { measurePerformance } from './src/utils/debugUtils';
const result = measurePerformance(expensiveFunc, 'Label')();
```

## 🛠️ Debugging Tools

| Tool | Best For | How to Access |
|------|----------|---------------|
| **Reactotron** | Logs, API, State | Launch desktop app |
| **React DevTools** | Component tree, Props | `npm run devtools` |
| **Chrome DevTools** | Breakpoints, Console | Dev Menu → Debug |
| **Flipper** | Native logs, Layout | Launch Flipper app |

## 🐛 Troubleshooting

**App won't start:** Check Metro bundler terminal for errors

**Reactotron not connecting:** Launch Reactotron BEFORE starting app

**Network errors:** Use `debugFetch` to see request/response

**Performance issues:** React DevTools → Profiler → Record

**Layout problems:** Flipper → Layout Inspector

## 📋 Checklist Before Debugging

- [ ] Metro bundler running (`npm start`)
- [ ] Reactotron desktop app launched
- [ ] Clear app cache if needed
- [ ] Check for TypeScript errors (`npx tsc --noEmit`)

## 🎓 Pro Tips

1. **Always use Reactotron** - Best all-in-one debugger
2. **Import debug utils** - Better than console.log
3. **Profile early** - Catch performance issues sooner
4. **Debug on real devices** - Emulators hide issues
5. **Check both JS and native logs** - Use Flipper for native

---

For detailed guide, see [DEBUGGING_GUIDE.md](DEBUGGING_GUIDE.md)
