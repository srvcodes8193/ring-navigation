/**
 * TypeScript type definitions for react-native-config
 * Provides autocomplete and type safety for environment variables
 */

declare module 'react-native-config' {
  export interface NativeConfig {
    // App Configuration
    APP_NAME?: string;
    APP_VERSION?: string;
    APP_ENV?: 'development' | 'staging' | 'production';

    // API Configuration
    API_BASE_URL?: string;
    API_TIMEOUT?: string;
    API_KEY?: string;

    // Feature Flags
    ENABLE_DEBUG_MODE?: string;
    ENABLE_ANALYTICS?: string;
    ENABLE_CRASHLYTICS?: string;

    // Third Party Services
    GOOGLE_MAPS_API_KEY?: string;
    FIREBASE_PROJECT_ID?: string;

    // App Specific
    DEFAULT_LANGUAGE?: string;
    MAX_UPLOAD_SIZE?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
