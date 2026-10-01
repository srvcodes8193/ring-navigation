# TypeScript Absolute Imports - Examples

## ✅ Available Path Mappings

| Alias | Maps to | Usage |
|-------|---------|-------|
| `@/*` | `src/*` | Any file in src directory |
| `@components/*` | `src/components/*` | UI components |
| `@screens/*` | `src/screens/*` | Screen components |
| `@hooks/*` | `src/hooks/*` | Custom React hooks |
| `@utils/*` | `src/utils/*` | Utility functions |
| `@services/*` | `src/services/*` | API services, storage |
| `@config/*` | `src/config/*` | Configuration files |
| `@types/*` | `src/types/*` | TypeScript types |
| `@assets/*` | `assets/*` | Images, fonts, etc. |

## 🔄 Before vs After

### Example 1: Importing Components

**Before (Relative Imports):**
```typescript
// src/screens/Profile/ProfileScreen.tsx
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { useAuth } from '../../../hooks/useAuth';
import { formatDate } from '../../../utils/dateUtils';
```

**After (Absolute Imports):**
```typescript
// src/screens/Profile/ProfileScreen.tsx
import { Button } from '@components/ui/Button';
import { Card } from '@components/ui/Card';
import { useAuth } from '@hooks/useAuth';
import { formatDate } from '@utils/dateUtils';
```

### Example 2: Importing Services

**Before (Relative Imports):**
```typescript
// src/screens/Home/HomeScreen.tsx
import { api } from '../../services/api';
import { storage } from '../../services/storage';
import { API_CONFIG } from '../../config/api';
```

**After (Absolute Imports):**
```typescript
// src/screens/Home/HomeScreen.tsx
import { api } from '@services/api';
import { storage } from '@services/storage';
import { API_CONFIG } from '@config/api';
```

### Example 3: Importing Types

**Before (Relative Imports):**
```typescript
// src/components/UserCard/UserCard.tsx
import { User } from '../../types/user';
import { Theme } from '../../types/theme';
```

**After (Absolute Imports):**
```typescript
// src/components/UserCard/UserCard.tsx
import { User } from '@types/user';
import { Theme } from '@types/theme';
```

### Example 4: Importing Assets

**Before (Relative Imports):**
```typescript
// src/screens/Welcome/WelcomeScreen.tsx
import logo from '../../../assets/images/logo.png';
import { colors } from '../../../assets/theme/colors';
```

**After (Absolute Imports):**
```typescript
// src/screens/Welcome/WelcomeScreen.tsx
import logo from '@assets/images/logo.png';
import { colors } from '@assets/theme/colors';
```

### Example 5: Using the Root Alias

**Before (Relative Imports):**
```typescript
// src/components/Header/Header.tsx
import { AppConfig } from '../../config/app';
import { useNetwork } from '../../hooks/useNetwork';
import { logger } from '../../utils/logger';
```

**After (Using `@/` for any src file):**
```typescript
// src/components/Header/Header.tsx
import { AppConfig } from '@/config/app';
import { useNetwork } from '@/hooks/useNetwork';
import { logger } from '@/utils/logger';
```

## 📝 Real-World Component Example

```typescript
// src/screens/Dashboard/DashboardScreen.tsx
import React from 'react';
import { View, Text } from 'react-native';

// Components
import { Button } from '@components/ui/Button';
import { Card } from '@components/ui/Card';
import { Header } from '@components/Header';
import { LoadingSpinner } from '@components/ui/LoadingSpinner';

// Hooks
import { useAuth } from '@hooks/useAuth';
import { useNetwork } from '@hooks/useNetwork';

// Services
import { api } from '@services/api';
import { storage } from '@services/storage';

// Utils
import { formatDate } from '@utils/dateUtils';
import { logger } from '@utils/logger';

// Config
import { API_CONFIG } from '@config/api';
import { STORAGE_KEYS } from '@config/storage';

// Types
import { User } from '@types/user';
import { DashboardData } from '@types/dashboard';

// Assets
import logo from '@assets/images/logo.png';

const DashboardScreen: React.FC = () => {
  const { user } = useAuth();
  const { isConnected } = useNetwork();

  return (
    <View>
      <Header />
      <Card>
        <Text>Welcome, {user?.name}</Text>
        <Button title="Refresh" onPress={() => {}} />
      </Card>
    </View>
  );
};

export default DashboardScreen;
```

## 🎯 Best Practices

### 1. Prefer Specific Aliases Over Generic `@/`

**Good:**
```typescript
import { Button } from '@components/ui/Button';
import { useAuth } from '@hooks/useAuth';
import { api } from '@services/api';
```

**Acceptable (but less clear):**
```typescript
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/services/api';
```

### 2. Keep Import Groups Organized

```typescript
// 1. React and React Native
import React from 'react';
import { View, Text } from 'react-native';

// 2. Third-party libraries
import axios from 'axios';
import moment from 'moment';

// 3. Components (absolute imports)
import { Button } from '@components/ui/Button';

// 4. Hooks (absolute imports)
import { useAuth } from '@hooks/useAuth';

// 5. Services (absolute imports)
import { api } from '@services/api';

// 6. Utils (absolute imports)
import { formatDate } from '@utils/dateUtils';

// 7. Types (absolute imports)
import { User } from '@types/user';

// 8. Assets (absolute imports)
import logo from '@assets/images/logo.png';

// 9. Local imports (relative, same directory)
import { LocalHelper } from './LocalHelper';
import styles from './styles';
```

### 3. Use Relative Imports for Files in Same Directory

**Good:**
```typescript
// src/screens/Profile/ProfileScreen.tsx
import { ProfileHeader } from './ProfileHeader';  // Same directory
import { ProfileStats } from './ProfileStats';    // Same directory
import { useAuth } from '@hooks/useAuth';         // Different directory
```

**Not recommended:**
```typescript
// src/screens/Profile/ProfileScreen.tsx
import { ProfileHeader } from '@screens/Profile/ProfileHeader';  // Unnecessarily long
```

### 4. Index File Exports

```typescript
// src/components/ui/index.ts
export { Button } from './Button';
export { Card } from './Card';
export { Input } from './Input';

// Usage in other files:
import { Button, Card, Input } from '@components/ui';
```

## 🔍 VSCode Autocomplete

VSCode will now provide autocomplete for absolute imports:

1. Type `@components/` and press Ctrl+Space
2. See all available components
3. Select the one you need

The import will be automatically added with the correct path!

## 🛠️ Troubleshooting

### Import Not Resolving

**Problem:** TypeScript shows "Cannot find module '@components/Button'"

**Solutions:**

1. **Reload VSCode:**
   - Press `Cmd/Ctrl + Shift + P`
   - Type "Reload Window"
   - Press Enter

2. **Restart TypeScript Server:**
   - Press `Cmd/Ctrl + Shift + P`
   - Type "TypeScript: Restart TS Server"
   - Press Enter

3. **Clean Build:**
   ```bash
   # Clear Metro bundler cache
   npm start -- --reset-cache

   # Clean and rebuild
   cd android && ./gradlew clean && cd ..
   cd ios && rm -rf Pods && pod install && cd ..
   ```

### Metro Bundler Not Recognizing Paths

**Problem:** App crashes with "Unable to resolve module @components/Button"

**Solution:**
```bash
# Stop the bundler
# Restart with cache reset
npm start -- --reset-cache
```

### TypeScript Autocomplete Not Working

**Problem:** VSCode doesn't show suggestions for absolute imports

**Solution:**
1. Make sure you have the file open in the workspace root
2. Check [tsconfig.json](tsconfig.json) is in the workspace root
3. Restart TypeScript server (see above)

## 📋 Configuration Files

### tsconfig.json
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

## 🚀 Migration Guide

### Step 1: Start with New Files
Use absolute imports in all new files you create.

### Step 2: Update Files as You Work
When you modify an existing file, update its imports to use absolute paths.

### Step 3: Bulk Migration (Optional)
You can use a tool to migrate all files at once:

```bash
# Example using find and sed (Linux/Mac)
# WARNING: Test this first on a backup!

# Find all TypeScript files and replace relative imports
find src -name "*.ts" -o -name "*.tsx" | xargs sed -i '' \
  -e "s|from '\.\./\.\./components/|from '@components/|g" \
  -e "s|from '\.\./\.\./hooks/|from '@hooks/|g" \
  -e "s|from '\.\./\.\./utils/|from '@utils/|g"
```

**Better approach:** Use your IDE's refactoring tools or do it manually for better control.

## ✅ Benefits

1. **Cleaner Code** - No more `../../../` path hell
2. **Easier Refactoring** - Moving files doesn't break imports
3. **Better Autocomplete** - VSCode suggests the right paths
4. **Consistent Style** - Everyone uses the same import pattern
5. **Faster Development** - Less time figuring out relative paths

---

**You're all set!** Start using absolute imports in your project. Happy coding! 🎉
