/**
 * Custom hook to access theme in components
 * Usage: const { theme, themeMode, toggleTheme } = useTheme();
 */

import {useContext} from 'react';
import {ThemeContext} from '../context/ThemeContext';

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
