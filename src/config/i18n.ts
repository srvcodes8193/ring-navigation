/**
 * i18n configuration for internationalization
 * Supports: English, Spanish, French, Hindi
 * Persists language choice using AsyncStorage
 */

import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform, NativeModules} from 'react-native';

// Import translations
import en from '../locales/en.json';
import es from '../locales/es.json';
import fr from '../locales/fr.json';
import hi from '../locales/hi.json';

const LANGUAGE_STORAGE_KEY = '@app_language';

// Get device language
const getDeviceLanguage = (): string => {
  let deviceLanguage = 'en';

  if (Platform.OS === 'ios') {
    deviceLanguage =
      NativeModules.SettingsManager?.settings?.AppleLocale ||
      NativeModules.SettingsManager?.settings?.AppleLanguages?.[0] ||
      'en';
  } else if (Platform.OS === 'android') {
    deviceLanguage = NativeModules.I18nManager?.localeIdentifier || 'en';
  }

  // Extract language code (e.g., 'en' from 'en-US')
  return deviceLanguage.split(/[-_]/)[0];
};

// Language detector plugin
const languageDetector = {
  type: 'languageDetector' as const,
  async: true,
  detect: async (callback: (lang: string) => void) => {
    try {
      // Try to get saved language
      const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (savedLanguage) {
        callback(savedLanguage);
        return;
      }

      // Fall back to device language
      const deviceLang = getDeviceLanguage();
      callback(deviceLang);
    } catch (error) {
      console.error('Error detecting language:', error);
      callback('en'); // Fallback to English
    }
  },
  init: () => {},
  cacheUserLanguage: async (language: string) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);

      // Log language change in development
      if (__DEV__ && console.tron) {
        console.tron.display({
          name: 'LANGUAGE_CHANGED',
          value: {language},
          preview: `Language changed to ${language}`,
        });
      }
    } catch (error) {
      console.error('Error caching language:', error);
    }
  },
};

// Initialize i18n
i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3', // For React Native
    resources: {
      en: {translation: en},
      es: {translation: es},
      fr: {translation: fr},
      hi: {translation: hi},
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes
    },
    react: {
      useSuspense: false, // Important for React Native
    },
  });

export default i18n;
