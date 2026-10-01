/**
 * Offline Alert Component
 * Displays a clear, user-friendly alert when there's no internet connection
 * Automatically shows/hides based on network state
 */

import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Platform,
  Dimensions,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '../hooks/useTheme';
import {useNetwork} from '../hooks/useNetwork';

const {width} = Dimensions.get('window');

export const OfflineAlert: React.FC = () => {
  const {t} = useTranslation();
  const {theme} = useTheme();
  const {isConnected, isInternetReachable} = useNetwork();
  const slideAnim = useRef(new Animated.Value(-100)).current;

  // Determine if we should show the offline alert
  const isOffline =
    isConnected === false || isInternetReachable === false;

  useEffect(() => {
    if (isOffline) {
      // Slide down to show
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 50,
        friction: 8,
      }).start();
    } else if (isConnected !== null) {
      // Slide up to hide (only if we've initialized, not on first load)
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isOffline, isConnected, slideAnim]);

  const styles = createStyles(theme);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{translateY: slideAnim}],
        },
      ]}>
      <View style={styles.content}>
        <Text style={styles.icon}>📡</Text>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{t('offline.title')}</Text>
          <Text style={styles.message}>{t('offline.message')}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 9999,
      backgroundColor: theme.colors.error,
      paddingTop: Platform.OS === 'ios' ? 50 : 20,
      paddingBottom: 12,
      paddingHorizontal: theme.spacing.md,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      fontSize: 24,
      marginRight: theme.spacing.sm,
    },
    textContainer: {
      flex: 1,
      maxWidth: width - 100,
    },
    title: {
      color: '#FFFFFF',
      fontSize: 16,
      ...(theme.fonts?.bold && {fontFamily: theme.fonts.bold}),
      fontWeight: '700',
      marginBottom: 2,
    },
    message: {
      color: '#FFFFFF',
      fontSize: 13,
      ...(theme.fonts?.regular && {fontFamily: theme.fonts.regular}),
      opacity: 0.95,
    },
  });
