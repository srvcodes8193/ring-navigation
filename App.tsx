/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// Initialize Reactotron in development mode
if (__DEV__) {
  require('./src/config/ReactotronConfig');
}

// Initialize i18n
import './src/config/i18n';

import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider} from './src/context/ThemeContext';
import {NetworkProvider} from './src/context/NetworkContext';
import {useTheme} from './src/hooks/useTheme';
// import HomeScreen from './src/screens/HomeScreen';
// import {OfflineAlert} from './src/components/OfflineAlert';
// import ComponentDemoScreen from './src/screens/ComponentDemoScreen';
import {ToastProvider} from './src/components/ui';
import RingNavigationScreen from './src/screens/RingNavigationScreen';

function AppContent(): React.JSX.Element {
  const {theme} = useTheme();

  return (
    <>
      <StatusBar barStyle={theme.colors.statusBar} />
      {/* <OfflineAlert /> */}
      {/* <HomeScreen /> */}
      {/* <ComponentDemoScreen /> */}
      <RingNavigationScreen />
    </>
  );
}

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <NetworkProvider>
        <ThemeProvider>
          <ToastProvider>
            <AppContent />
          </ToastProvider>
        </ThemeProvider>
      </NetworkProvider>
    </SafeAreaProvider>
  );
}

export default App;
