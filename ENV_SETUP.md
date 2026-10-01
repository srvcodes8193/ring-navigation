# Environment Variables Setup - Complete

## ✅ Setup Complete

Environment variables are now configured in your React Native project using **react-native-config**.

## 📦 What Was Done

### 1. Package Installation
```bash
npm install react-native-config
```

### 2. Android Configuration
Updated `android/app/build.gradle` with:
```gradle
apply from: project(':react-native-config').projectDir.getPath() + "/dotenv.gradle"
```

### 3. Environment Files Created
- `.env` - Contains actual environment variables (DO NOT commit to git)
- `.env.example` - Template file for team members (safe to commit)

### 4. HomeScreen.tsx Updated
Added environment variables demonstration showing:
- App Name
- App Version
- Environment (dev/staging/prod)
- API Base URL
- Feature flags (Debug Mode, Analytics)
- Default Language

## 📝 Environment Variables

### Current Variables in `.env`

```bash
# App Configuration
APP_NAME=MyApp
APP_VERSION=1.0.0
APP_ENV=development

# API Configuration
API_BASE_URL=https://api.example.com
API_TIMEOUT=30000
API_KEY=your_api_key_here

# Feature Flags
ENABLE_DEBUG_MODE=true
ENABLE_ANALYTICS=false
ENABLE_CRASHLYTICS=true

# Third Party Services
GOOGLE_MAPS_API_KEY=your_google_maps_key
FIREBASE_PROJECT_ID=your_firebase_project_id

# App Specific
DEFAULT_LANGUAGE=en
MAX_UPLOAD_SIZE=10485760
```

## 🎨 Usage

### Basic Usage

```typescript
import Config from 'react-native-config';

// Access environment variables
const apiUrl = Config.API_BASE_URL;
const appName = Config.APP_NAME;
const isDebug = Config.ENABLE_DEBUG_MODE === 'true';

console.log('API URL:', apiUrl);
console.log('App Name:', appName);
console.log('Debug Mode:', isDebug);
```

### In Components

```tsx
import React from 'react';
import {View, Text} from 'react-native';
import Config from 'react-native-config';

const MyComponent = () => {
  return (
    <View>
      <Text>App: {Config.APP_NAME}</Text>
      <Text>Version: {Config.APP_VERSION}</Text>
      <Text>Environment: {Config.APP_ENV}</Text>
    </View>
  );
};
```

### API Configuration

```typescript
import Config from 'react-native-config';

const api = {
  baseURL: Config.API_BASE_URL,
  timeout: parseInt(Config.API_TIMEOUT || '30000', 10),
  headers: {
    'Authorization': `Bearer ${Config.API_KEY}`,
    'Content-Type': 'application/json',
  },
};

// Use with fetch
fetch(`${api.baseURL}/users`, {
  method: 'GET',
  headers: api.headers,
})
  .then(response => response.json())
  .then(data => console.log(data));
```

### Feature Flags

```typescript
import Config from 'react-native-config';

// Check feature flags
const isAnalyticsEnabled = Config.ENABLE_ANALYTICS === 'true';
const isDebugMode = Config.ENABLE_DEBUG_MODE === 'true';

if (isAnalyticsEnabled) {
  // Initialize analytics
  Analytics.init();
}

if (isDebugMode) {
  // Enable debug logging
  console.log('Debug mode enabled');
}
```

### Conditional Rendering

```tsx
import Config from 'react-native-config';

const App = () => {
  return (
    <View>
      {Config.ENABLE_DEBUG_MODE === 'true' && (
        <DebugPanel />
      )}

      {Config.APP_ENV === 'development' && (
        <DevelopmentTools />
      )}

      <MainContent />
    </View>
  );
};
```

## 🔧 TypeScript Support

Create a type definition file for better autocomplete:

### `src/types/env.d.ts`

```typescript
declare module 'react-native-config' {
  export interface NativeConfig {
    APP_NAME?: string;
    APP_VERSION?: string;
    APP_ENV?: 'development' | 'staging' | 'production';
    API_BASE_URL?: string;
    API_TIMEOUT?: string;
    API_KEY?: string;
    ENABLE_DEBUG_MODE?: string;
    ENABLE_ANALYTICS?: string;
    ENABLE_CRASHLYTICS?: string;
    GOOGLE_MAPS_API_KEY?: string;
    FIREBASE_PROJECT_ID?: string;
    DEFAULT_LANGUAGE?: string;
    MAX_UPLOAD_SIZE?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
```

## 🌍 Multiple Environments

### Development Environment (`.env.development`)

```bash
APP_ENV=development
API_BASE_URL=https://dev-api.example.com
ENABLE_DEBUG_MODE=true
ENABLE_ANALYTICS=false
```

### Staging Environment (`.env.staging`)

```bash
APP_ENV=staging
API_BASE_URL=https://staging-api.example.com
ENABLE_DEBUG_MODE=true
ENABLE_ANALYTICS=true
```

### Production Environment (`.env.production`)

```bash
APP_ENV=production
API_BASE_URL=https://api.example.com
ENABLE_DEBUG_MODE=false
ENABLE_ANALYTICS=true
```

### Using Different Environments

```bash
# Development (default .env)
npm run android

# Staging
ENVFILE=.env.staging npm run android

# Production
ENVFILE=.env.production npm run android
```

## 📱 Platform-Specific Configuration

### iOS Setup

For iOS, you need to run:
```bash
cd ios && pod install && cd ..
```

The package will be automatically linked via CocoaPods.

### Android Setup

Already configured! The gradle configuration has been added to `android/app/build.gradle`.

## 🔒 Security Best Practices

### 1. Never Commit `.env`

Add to `.gitignore`:
```
# Environment variables
.env
.env.local
.env.development
.env.staging
.env.production

# Keep .env.example
!.env.example
```

### 2. Use `.env.example` as Template

```bash
# For new team members
cp .env.example .env
# Then fill in actual values
```

### 3. Sensitive Data

❌ **DO NOT store in .env:**
- Private keys
- Secrets that should never be in client code
- Passwords

✅ **OK to store in .env:**
- API endpoints
- Public API keys (with proper restrictions)
- Feature flags
- App configuration

### 4. Obfuscation

Remember: Environment variables in React Native are bundled with the app and can be extracted. Never store truly sensitive secrets here.

## 🚀 Real-World Examples

### API Client

```typescript
// src/services/api.ts
import Config from 'react-native-config';

class ApiClient {
  private baseURL: string;
  private timeout: number;

  constructor() {
    this.baseURL = Config.API_BASE_URL || 'https://api.example.com';
    this.timeout = parseInt(Config.API_TIMEOUT || '30000', 10);
  }

  async get(endpoint: string) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${Config.API_KEY}`,
      },
    });
    return response.json();
  }
}

export const api = new ApiClient();
```

### Analytics Service

```typescript
// src/services/analytics.ts
import Config from 'react-native-config';

class Analytics {
  private enabled: boolean;

  constructor() {
    this.enabled = Config.ENABLE_ANALYTICS === 'true';
  }

  init() {
    if (this.enabled) {
      // Initialize analytics SDK
      console.log('Analytics initialized');
    }
  }

  track(event: string, properties?: object) {
    if (this.enabled) {
      console.log('Tracking:', event, properties);
      // Send to analytics service
    }
  }
}

export const analytics = new Analytics();
```

### Firebase Configuration

```typescript
// src/config/firebase.ts
import Config from 'react-native-config';
import firebase from '@react-native-firebase/app';

const firebaseConfig = {
  projectId: Config.FIREBASE_PROJECT_ID,
  // Other Firebase config...
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
```

## 📋 Testing

### Mock Environment Variables in Tests

```typescript
// __tests__/HomeScreen.test.tsx
jest.mock('react-native-config', () => ({
  APP_NAME: 'TestApp',
  APP_VERSION: '1.0.0',
  APP_ENV: 'test',
  API_BASE_URL: 'https://test-api.example.com',
  ENABLE_DEBUG_MODE: 'true',
}));

import Config from 'react-native-config';

test('uses environment variables', () => {
  expect(Config.APP_NAME).toBe('TestApp');
  expect(Config.APP_ENV).toBe('test');
});
```

## 🔄 Updating Environment Variables

After changing `.env` file:

1. **Restart Metro bundler:**
   ```bash
   # Stop the bundler (Ctrl+C)
   # Then restart
   npm start -- --reset-cache
   ```

2. **Rebuild the app:**
   ```bash
   # Android
   npm run android

   # iOS
   cd ios && pod install && cd ..
   npm run ios
   ```

## 📖 Common Use Cases

### 1. Different API Endpoints

```typescript
const API_URL = Config.APP_ENV === 'production'
  ? 'https://api.example.com'
  : 'https://dev-api.example.com';
```

### 2. Enable/Disable Features

```typescript
const features = {
  analytics: Config.ENABLE_ANALYTICS === 'true',
  crashlytics: Config.ENABLE_CRASHLYTICS === 'true',
  debugMode: Config.ENABLE_DEBUG_MODE === 'true',
};
```

### 3. App Versioning

```typescript
import {Text} from 'react-native';
import Config from 'react-native-config';

<Text>Version {Config.APP_VERSION}</Text>
```

### 4. Maximum Upload Size

```typescript
const MAX_SIZE = parseInt(Config.MAX_UPLOAD_SIZE || '10485760', 10);

const validateFileSize = (size: number) => {
  if (size > MAX_SIZE) {
    throw new Error('File too large');
  }
};
```

## 🎯 Demo in HomeScreen

The `HomeScreen.tsx` now displays all environment variables in a card:
- App Name
- App Version
- Environment
- API Base URL
- Debug Mode status
- Analytics status
- Default Language

Run the app to see the demo!

## 🔗 Resources

- [react-native-config GitHub](https://github.com/luggit/react-native-config)
- [React Native Environment Variables Best Practices](https://reactnative.dev/docs/environment-variables)

## ⚙️ Troubleshooting

### Android: Variables not updating

```bash
cd android && ./gradlew clean && cd ..
npm run android
```

### iOS: Variables not updating

```bash
cd ios && pod install && cd ..
npm start -- --reset-cache
npm run ios
```

### Variables showing as undefined

1. Check `.env` file exists in project root
2. Restart Metro bundler with cache reset
3. Rebuild the app completely

---

**Setup Complete!** 🎉 Environment variables are ready to use throughout your app.
