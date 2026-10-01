/**
 * Theme configuration for Light and Dark modes
 * Using React Native best practices
 */

export type ThemeMode = 'light' | 'dark';

export interface Theme {
  mode: ThemeMode;
  colors: {
    // Background colors
    background: string;
    surface: string;
    card: string;

    // Text colors
    text: string;
    textSecondary: string;
    textInverse: string;

    // Primary colors
    primary: string;
    primaryDark: string;

    // Accent colors
    accent: string;
    error: string;
    success: string;
    warning: string;

    // Border colors
    border: string;
    divider: string;

    // Status bar
    statusBar: 'light-content' | 'dark-content';
  };
  fonts: {
    regular: string;
    medium: string;
    bold: string;
    heading: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  shadows: {
    small: {
      shadowColor: string;
      shadowOffset: {width: number; height: number};
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
    medium: {
      shadowColor: string;
      shadowOffset: {width: number; height: number};
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
  };
}

const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
};

const fonts = {
  regular: 'Ubuntu-Regular',
  medium: 'Ubuntu-Medium',
  bold: 'Ubuntu-Bold',
  heading: 'Ubuntu-Bold',
};

export const lightTheme: Theme = {
  mode: 'light',
  colors: {
    background: '#F5F5F5',
    surface: '#FFFFFF',
    card: '#FFFFFF',

    text: '#1A1A1A',
    textSecondary: '#666666',
    textInverse: '#FFFFFF',

    primary: '#007AFF',
    primaryDark: '#0051D5',

    accent: '#5856D6',
    error: '#FF3B30',
    success: '#34C759',
    warning: '#FF9500',

    border: '#E5E5E5',
    divider: '#EBEBEB',

    statusBar: 'dark-content',
  },
  fonts,
  spacing,
  borderRadius,
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
    },
  },
};

export const darkTheme: Theme = {
  mode: 'dark',
  colors: {
    background: '#000000',
    surface: '#1C1C1E',
    card: '#2C2C2E',

    text: '#FFFFFF',
    textSecondary: '#AEAEB2',
    textInverse: '#000000',

    primary: '#0A84FF',
    primaryDark: '#0066CC',

    accent: '#5E5CE6',
    error: '#FF453A',
    success: '#32D74B',
    warning: '#FF9F0A',

    border: '#38383A',
    divider: '#48484A',

    statusBar: 'light-content',
  },
  fonts,
  spacing,
  borderRadius,
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.4,
      shadowRadius: 8,
      elevation: 5,
    },
  },
};
