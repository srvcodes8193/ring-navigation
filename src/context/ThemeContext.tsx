/**
 * Theme Context for managing light/dark mode
 * Best practices: Uses system preference by default, persists user choice
 */

import React, {createContext, useState, useEffect, ReactNode} from 'react';
import {useColorScheme, Appearance} from 'react-native';
import {lightTheme, darkTheme, Theme, ThemeMode} from '../config/theme';

interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  isSystemTheme: boolean;
  setThemeMode: (mode: ThemeMode | 'system') => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
  const systemColorScheme = useColorScheme();
  const [userThemeMode, setUserThemeMode] = useState<ThemeMode | 'system'>(
    'system',
  );

  // Determine actual theme based on user preference or system
  const actualThemeMode: ThemeMode =
    userThemeMode === 'system'
      ? (systemColorScheme as ThemeMode) || 'light'
      : userThemeMode;

  const theme = actualThemeMode === 'dark' ? darkTheme : lightTheme;

  const setThemeMode = (mode: ThemeMode | 'system') => {
    setUserThemeMode(mode);

    // Log theme change in development
    if (__DEV__ && console.tron) {
      console.tron.display({
        name: 'THEME_CHANGED',
        value: {
          mode,
          actualTheme: mode === 'system' ? systemColorScheme : mode,
        },
        preview: `Theme changed to ${mode}`,
      });
    }
  };

  const toggleTheme = () => {
    if (userThemeMode === 'system') {
      // If on system, switch to opposite of current system theme
      const newMode = actualThemeMode === 'dark' ? 'light' : 'dark';
      setThemeMode(newMode);
    } else {
      // Toggle between light and dark
      setThemeMode(actualThemeMode === 'dark' ? 'light' : 'dark');
    }
  };

  // Listen to system theme changes and update automatically
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      if (userThemeMode === 'system') {
        if (__DEV__ && console.tron) {
          console.tron.display({
            name: 'SYSTEM_THEME_CHANGED',
            value: {colorScheme},
            preview: `System theme changed to ${colorScheme}`,
          });
        }
      }
    });

    return () => subscription.remove();
  }, [userThemeMode]);

  const value: ThemeContextType = {
    theme,
    themeMode: actualThemeMode,
    isSystemTheme: userThemeMode === 'system',
    setThemeMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
