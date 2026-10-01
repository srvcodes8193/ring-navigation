# 🚀 START HERE - React Native Debugging Setup

## ⚡ Quick Start (First Time)

### 1. Download Reactotron (Required)
**Download the desktop app first:**
- macOS/Linux/Windows: https://github.com/infinitered/reactotron/releases
- Get the latest version for your OS

### 2. Start Debugging Session

```bash
# Step 1: Launch Reactotron desktop app (downloaded above)

# Step 2: Start Metro (in terminal)
cd MyApp
npm start

# Step 3: Run app (in another terminal)
npm run android  # or npm run ios
```

### 3. Watch Reactotron
Your app will automatically connect to Reactotron and you'll see:
- ✅ App connected message
- 📝 All logs from the app
- 🌐 Network requests (when you use `debugFetch`)
- 📊 Custom events from your code

---

## 📚 What to Read Next

**New to debugging React Native?**
1. Read [DEBUGGING_SETUP_SUMMARY.md](DEBUGGING_SETUP_SUMMARY.md) first
2. Keep [DEBUG_CHEATSHEET.md](DEBUG_CHEATSHEET.md) open while coding
3. Reference [DEBUGGING_GUIDE.md](DEBUGGING_GUIDE.md) when needed

**Want to understand the tools?**
- Read [DEBUGGING_TOOLS_OVERVIEW.md](DEBUGGING_TOOLS_OVERVIEW.md) for visual guide

**General React Native questions?**
- See [QUICKSTART.md](QUICKSTART.md)

---

## 🔥 Try This Now

Open [src/screens/HomeScreen.tsx](src/screens/HomeScreen.tsx) and look for the example code that uses Reactotron:

```typescript
// This logs to Reactotron when you click "Increment"
console.tron.display({
  name: 'INCREMENT',
  value: newCount,
  preview: `Counter incremented to ${newCount}`,
});
```

**Try it:**
1. Launch Reactotron desktop app
2. Run `npm run android`
3. Click the "Increment" button in your app
4. Watch the message appear in Reactotron!

---

## 📖 Documentation Map

```
START_HERE.md  ← You are here
    │
    ├─→ DEBUGGING_SETUP_SUMMARY.md (Overview - read this first!)
    │       │
    │       ├─→ DEBUGGING_GUIDE.md (Complete reference)
    │       ├─→ DEBUG_CHEATSHEET.md (Quick reference)
    │       └─→ DEBUGGING_TOOLS_OVERVIEW.md (Visual guide)
    │
    └─→ QUICKSTART.md (General React Native guide)
```

---

## ✅ Installed Tools

Your project has these debugging tools ready to use:

| Tool | Status | How to Use |
|------|--------|-----------|
| **Reactotron** | ✅ Configured | Launch desktop app, then run app |
| **React DevTools** | ✅ Installed | Run `npm run devtools` |
| **Chrome DevTools** | ✅ Built-in | Dev Menu → "Open Debugger" |
| **Flipper** | ✅ Built-in | Download from fbflipper.com |
| **Debug Utilities** | ✅ Ready | Import from `src/utils/debugUtils` |

---

## 🎯 Your First Debugging Task

Let's make sure everything works:

**Task:** Add a log message when the app loads

1. Open [App.tsx](App.tsx)

2. Add this inside the `App` function:
   ```typescript
   React.useEffect(() => {
     console.tron.log('🎉 App started successfully!');
   }, []);
   ```

3. Save the file

4. Look at Reactotron - you should see "🎉 App started successfully!"

**It worked?** 🎉 You're ready to debug!

**Didn't work?**
- Make sure Reactotron desktop app is running
- Restart your app
- Check [DEBUGGING_GUIDE.md](DEBUGGING_GUIDE.md) troubleshooting section

---

## 💡 Daily Workflow

```bash
# Morning routine:
1. Launch Reactotron desktop app
2. cd MyApp && npm start
3. npm run android (in another terminal)
4. Keep Reactotron visible while coding
5. Use logger.log() instead of console.log()

# That's it! 🚀
```

---

## 🆘 Need Help?

**Reactotron not connecting?**
→ See [DEBUGGING_GUIDE.md](DEBUGGING_GUIDE.md) → Troubleshooting section

**Don't know which tool to use?**
→ See [DEBUGGING_TOOLS_OVERVIEW.md](DEBUGGING_TOOLS_OVERVIEW.md) → Tool Selection Guide

**Want to learn more?**
→ See [DEBUGGING_GUIDE.md](DEBUGGING_GUIDE.md) → Complete guide

**Quick command reference?**
→ See [DEBUG_CHEATSHEET.md](DEBUG_CHEATSHEET.md)

---

## 🎓 Next Steps

1. ✅ Download Reactotron desktop app
2. ✅ Run the app and see it connect
3. ✅ Complete the "First Debugging Task" above
4. 📖 Read DEBUGGING_SETUP_SUMMARY.md
5. 💻 Start building your app with great debugging!

---

**You're all set! Happy coding! 🚀**
