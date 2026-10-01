# TypeScript Absolute Imports - Setup Guide

## ✅ What Was Configured

TypeScript absolute imports (path mapping) allows you to use clean import statements like:

```typescript
import { Button } from '@components/ui/Button';
```

Instead of messy relative paths:

```typescript
import { Button } from '../../../components/ui/Button';
```

## 📦 What Was Done

### 1. Package Installation

Installed `babel-plugin-module-resolver` for runtime path resolution:

```bash
npm install --save-dev babel-plugin-module-resolver
```

**Version:** ^5.0.2

### 2. TypeScript Configuration

Updated [tsconfig.json](tsconfig.json) with path mappings:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@screens/*": ["src/screens/*"],
      "@hooks/*": ["src/hooks/*"],
      "@utils/*": ["src/utils/*"],
      "@services/*": ["src/services/*"],
      "@config/*": ["src/config/*"],
      "@types/*": ["src/types/*"],
      "@assets/*": ["assets/*"]
    }
  }
}
```

This enables TypeScript's intellisense and type checking for absolute imports.

### 3. Babel Configuration

Updated [babel.config.js](babel.config.js) with module resolver plugin:

```javascript
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@screens': './src/screens',
          '@hooks': './src/hooks',
          '@utils': './src/utils',
          '@services': './src/services',
          '@config': './src/config',
          '@types': './src/types',
          '@assets': './assets',
        },
      },
    ],
  ],
};
```

This enables Metro bundler to resolve absolute imports at runtime.

### 4. Metro Configuration

No changes needed! Metro uses Babel for transpilation, so the babel-plugin-module-resolver handles path resolution automatically.

## 🎯 How It Works

### TypeScript Compilation (Development)

1. You write: `import { Button } from '@components/ui/Button';`
2. TypeScript reads `tsconfig.json` paths
3. VSCode provides autocomplete and type checking
4. TypeScript compiler validates the import

### Metro Bundler (Runtime)

1. Metro reads your source files
2. Babel transpiles the code
3. `babel-plugin-module-resolver` transforms:
   - `@components/ui/Button` → `./src/components/ui/Button`
4. Metro bundles the resolved paths
5. App runs with correct file references

## 📋 Available Path Aliases

| Alias | Maps To | Use For |
|-------|---------|---------|
| `@/*` | `src/*` | Any file in src (generic) |
| `@components/*` | `src/components/*` | React components |
| `@screens/*` | `src/screens/*` | Screen/Page components |
| `@hooks/*` | `src/hooks/*` | Custom React hooks |
| `@utils/*` | `src/utils/*` | Utility/helper functions |
| `@services/*` | `src/services/*` | API, storage, analytics |
| `@config/*` | `src/config/*` | Configuration files |
| `@types/*` | `src/types/*` | TypeScript type definitions |
| `@assets/*` | `assets/*` | Images, fonts, icons |

## 🚀 Usage Examples

See [ABSOLUTE_IMPORTS_EXAMPLES.md](ABSOLUTE_IMPORTS_EXAMPLES.md) for detailed usage examples and best practices.

### Quick Example

```typescript
// src/screens/Home/HomeScreen.tsx
import React from 'react';

// ✅ Absolute imports - clean and clear
import { Button } from '@components/ui/Button';
import { useAuth } from '@hooks/useAuth';
import { api } from '@services/api';
import { formatDate } from '@utils/dateUtils';
import { User } from '@types/user';
import logo from '@assets/images/logo.png';

// ✅ Relative imports - for files in same directory
import { HomeHeader } from './HomeHeader';
import styles from './styles';

const HomeScreen: React.FC = () => {
  const { user } = useAuth();

  return (
    <View>
      <HomeHeader />
      <Button title="Click me" />
    </View>
  );
};
```

## 🔧 IDE Setup

### VSCode (Recommended)

**Good news!** VSCode automatically detects `tsconfig.json` and enables:

✅ Autocomplete for absolute imports
✅ Go to definition (Cmd/Ctrl + Click)
✅ Find all references
✅ Rename refactoring
✅ Import path suggestions

**If autocomplete doesn't work:**

1. **Reload VSCode:**
   - Press `Cmd/Ctrl + Shift + P`
   - Type "Reload Window"

2. **Restart TypeScript Server:**
   - Press `Cmd/Ctrl + Shift + P`
   - Type "TypeScript: Restart TS Server"

### WebStorm / IntelliJ IDEA

Automatic! IntelliJ-based IDEs read `tsconfig.json` and enable absolute imports.

### Other Editors

Most modern editors with TypeScript support will work. Ensure:
- Editor is opened at the project root (where `tsconfig.json` exists)
- TypeScript extension/plugin is installed and enabled

## 🛠️ Troubleshooting

### Issue 1: TypeScript Can't Find Module

**Problem:**
```
Cannot find module '@components/Button' or its corresponding type declarations.
```

**Solution:**

1. **Check file exists:**
   ```bash
   ls src/components/Button.tsx
   ```

2. **Verify tsconfig.json paths match:**
   - Alias: `@components/*` → `src/components/*`
   - Import: `@components/Button` → `src/components/Button.tsx`

3. **Restart TypeScript server:**
   - VSCode: Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"

4. **Check baseUrl is set:**
   ```json
   {
     "compilerOptions": {
       "baseUrl": "."  // Must be present!
     }
   }
   ```

### Issue 2: Metro Bundler Can't Resolve Module

**Problem:**
```
Error: Unable to resolve module @components/Button from src/screens/Home.tsx
```

**Solution:**

1. **Clear Metro cache:**
   ```bash
   npm start -- --reset-cache
   ```

2. **Verify babel.config.js:**
   - Check `babel-plugin-module-resolver` is in plugins array
   - Check alias paths match tsconfig.json

3. **Restart the bundler:**
   ```bash
   # Kill the bundler (Ctrl+C)
   npm start -- --reset-cache
   ```

4. **Clean rebuild:**
   ```bash
   # iOS
   cd ios && rm -rf Pods && pod install && cd ..

   # Android
   cd android && ./gradlew clean && cd ..
   ```

### Issue 3: VSCode Autocomplete Not Working

**Problem:** Typing `@components/` doesn't show suggestions

**Solution:**

1. **Make sure workspace is at project root:**
   - VSCode should be opened at `/path/to/MyApp`
   - Not at `/path/to/MyApp/src`

2. **Check tsconfig.json is not excluded:**
   - Look for `files.exclude` or `search.exclude` in VSCode settings

3. **Reload window:**
   - Cmd/Ctrl + Shift + P → "Reload Window"

4. **Check TypeScript version:**
   ```bash
   # Should be 5.8.3 (from package.json)
   npx tsc --version
   ```

### Issue 4: Jest Tests Failing

**Problem:**
```
Cannot find module '@components/Button' from 'tests/MyTest.test.tsx'
```

**Solution:**

Jest needs its own configuration to understand path mappings.

Add to `jest.config.js`:

```javascript
module.exports = {
  preset: '@react-native/jest-preset',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@screens/(.*)$': '<rootDir>/src/screens/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@types/(.*)$': '<rootDir>/src/types/$1',
    '^@assets/(.*)$': '<rootDir>/assets/$1',
  },
};
```

### Issue 5: Build Errors After Setup

**Problem:** App builds but crashes or shows errors

**Solution:**

1. **Clear all caches:**
   ```bash
   # Metro
   npm start -- --reset-cache

   # Watchman
   watchman watch-del-all

   # Temp files
   rm -rf $TMPDIR/react-*
   rm -rf $TMPDIR/metro-*
   ```

2. **Clean iOS build:**
   ```bash
   cd ios
   rm -rf Pods Podfile.lock
   pod install
   cd ..
   ```

3. **Clean Android build:**
   ```bash
   cd android
   ./gradlew clean
   cd ..
   ```

4. **Reinstall node_modules:**
   ```bash
   rm -rf node_modules
   npm install
   ```

## 📝 Best Practices

### 1. Prefer Specific Aliases

```typescript
// ✅ Good - clear and specific
import { Button } from '@components/ui/Button';
import { useAuth } from '@hooks/useAuth';

// ❌ Avoid - generic, less clear
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
```

### 2. Use Relative Imports for Same Directory

```typescript
// src/screens/Profile/ProfileScreen.tsx

// ✅ Good - relative for same directory
import { ProfileHeader } from './ProfileHeader';
import styles from './styles';

// ✅ Good - absolute for different directories
import { Button } from '@components/ui/Button';
import { useAuth } from '@hooks/useAuth';

// ❌ Avoid - unnecessarily long
import { ProfileHeader } from '@screens/Profile/ProfileHeader';
```

### 3. Organize Imports

```typescript
// 1. React/React Native
import React from 'react';
import { View, Text } from 'react-native';

// 2. Third-party libraries
import axios from 'axios';

// 3. Absolute imports (grouped by type)
import { Button } from '@components/ui/Button';
import { useAuth } from '@hooks/useAuth';
import { api } from '@services/api';
import { User } from '@types/user';

// 4. Relative imports (local files)
import { LocalComponent } from './LocalComponent';
import styles from './styles';
```

### 4. Use Index Files

Create barrel exports for cleaner imports:

```typescript
// src/components/ui/index.ts
export { Button } from './Button';
export { Card } from './Card';
export { Input } from './Input';

// Usage:
import { Button, Card, Input } from '@components/ui';
```

## 🎯 Migration Strategy

### For New Projects
✅ **Already set up!** Just start using absolute imports.

### For Existing Projects

#### Option 1: Gradual Migration (Recommended)

1. **Use absolute imports in all new files**
2. **Update files as you modify them**
3. **Don't rush to change everything at once**

#### Option 2: Bulk Migration

Use VSCode's search and replace:

1. Press `Cmd/Ctrl + Shift + H` (Find in Files)
2. Enable regex (.*)
3. Search: `from ['\"](\.\./)+components/`
4. Replace: `from '@components/`
5. Review each change before applying

**Warning:** Test thoroughly after bulk changes!

## 🔍 How to Verify Setup

### 1. Check TypeScript Configuration

```bash
# Read tsconfig.json
cat tsconfig.json | grep -A 15 "paths"
```

Should show all path mappings.

### 2. Check Babel Configuration

```bash
# Read babel.config.js
cat babel.config.js
```

Should have `module-resolver` plugin with alias configuration.

### 3. Test Import in VSCode

Create a test file:

```typescript
// src/test-imports.ts
import { } from '@components/'
//                           ^ Put cursor here and press Ctrl+Space
```

You should see autocomplete suggestions for available components.

### 4. Test Metro Bundler

```bash
# Start Metro with cache reset
npm start -- --reset-cache

# In another terminal, run the app
npm run android  # or npm run ios
```

App should build and run without import errors.

## 📚 Configuration Files Reference

### tsconfig.json

```json
{
  "extends": "@react-native/typescript-config",
  "compilerOptions": {
    "types": ["jest"],
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@screens/*": ["src/screens/*"],
      "@hooks/*": ["src/hooks/*"],
      "@utils/*": ["src/utils/*"],
      "@services/*": ["src/services/*"],
      "@config/*": ["src/config/*"],
      "@types/*": ["src/types/*"],
      "@assets/*": ["assets/*"]
    }
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "exclude": ["**/node_modules", "**/Pods"]
}
```

**Key points:**
- `baseUrl: "."` - Required for path mapping
- `paths` - Maps aliases to actual directories
- Paths are relative to `baseUrl`

### babel.config.js

```javascript
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@screens': './src/screens',
          '@hooks': './src/hooks',
          '@utils': './src/utils',
          '@services': './src/services',
          '@config': './src/config',
          '@types': './src/types',
          '@assets': './assets',
        },
      },
    ],
  ],
};
```

**Key points:**
- `root` - Base directory for module resolution
- `extensions` - File types to resolve
- `alias` - Must match `tsconfig.json` paths exactly
- Paths are relative to project root

### package.json (relevant section)

```json
{
  "devDependencies": {
    "babel-plugin-module-resolver": "^5.0.2",
    "@react-native/babel-preset": "0.83.1",
    "@react-native/typescript-config": "0.83.1",
    "typescript": "^5.8.3"
  }
}
```

## ✅ Benefits Summary

1. **Cleaner Code**
   - No more `../../../` import hell
   - Easier to read and understand

2. **Better Refactoring**
   - Move files without updating imports
   - Rename folders safely

3. **Improved Autocomplete**
   - VSCode suggests correct paths
   - Fewer typos and import errors

4. **Consistent Style**
   - Team uses same import pattern
   - Easier code reviews

5. **Faster Development**
   - Less time calculating relative paths
   - Focus on writing code

## 🚀 Next Steps

1. **Read the examples:** Check [ABSOLUTE_IMPORTS_EXAMPLES.md](ABSOLUTE_IMPORTS_EXAMPLES.md)
2. **Test it out:** Create a new file and use absolute imports
3. **Restart Metro:** `npm start -- --reset-cache`
4. **Start coding:** Enjoy cleaner imports!

## 📖 Additional Resources

### TypeScript Path Mapping
- [TypeScript Module Resolution](https://www.typescriptlang.org/docs/handbook/module-resolution.html)
- [TypeScript Compiler Options](https://www.typescriptlang.org/tsconfig#paths)

### Babel Module Resolver
- [babel-plugin-module-resolver](https://github.com/tleunen/babel-plugin-module-resolver)
- [Plugin Documentation](https://www.npmjs.com/package/babel-plugin-module-resolver)

### React Native
- [Metro Bundler Configuration](https://metrobundler.dev/docs/configuration)
- [React Native TypeScript](https://reactnative.dev/docs/typescript)

---

**Setup complete!** 🎉 You can now use clean, absolute imports throughout your React Native project.
