import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {useTheme} from '../hooks/useTheme';
import type {Theme} from '../config/theme';
import LanguageSelector from '../components/LanguageSelector';
import Config from 'react-native-config';
import moment from 'moment';
import {WebViewComponent} from '../components/ui';
import {api} from '../services/api';

const HomeScreen: React.FC = () => {
  const {theme, themeMode, toggleTheme, isSystemTheme, setThemeMode} =
    useTheme();
  const {t} = useTranslation();
  const [showWebView, setShowWebView] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<string>('');

  // Create dynamic styles based on theme
  const styles = createStyles(theme);

  // Axios demo - fetch sample data
  const testAxiosRequest = async () => {
    setApiLoading(true);
    setApiResponse('');

    try {
      // Using JSONPlaceholder - a free fake API for testing
      const data = await api.get<any>('https://jsonplaceholder.typicode.com/posts/1');
      setApiResponse(JSON.stringify(data, null, 2));
    } catch (error: any) {
      setApiResponse(`Error: ${error.message || 'Request failed'}`);
    } finally {
      setApiLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
        {/* Language Selector */}
        <LanguageSelector />

        {/* Theme Toggle */}
        <View style={styles.themeToggle}>
          <View style={styles.themeInfo}>
            <Text style={styles.themeLabel}>{t('home.darkMode')}</Text>
            <Text style={styles.themeSubtext}>
              {isSystemTheme
                ? t('home.autoFollowingSystem')
                : t('home.manualOverride')}
            </Text>
          </View>
          <Switch
            value={themeMode === 'dark'}
            onValueChange={toggleTheme}
            trackColor={{
              false: theme.colors.border,
              true: theme.colors.primary,
            }}
            thumbColor={theme.colors.surface}
          />
        </View>

        {/* Reset to System Button - Only show when manually overridden */}
        {!isSystemTheme && (
          <TouchableOpacity
            style={styles.resetButton}
            onPress={() => setThemeMode('system')}>
            <Text style={styles.resetButtonText}>
              {t('home.resetToSystemTheme')}
            </Text>
          </TouchableOpacity>
        )}

        {/* Welcome Text */}
        <Text style={styles.title}>{t('home.title')}</Text>
        <Text style={styles.subtitle}>{t('home.subtitle')}</Text>

        {/* Info Text */}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            {isSystemTheme
              ? t('home.themeFollowsDevice')
              : t('home.themeManualOverride')}
          </Text>
        </View>

        {/* Environment Variables Demo */}
        <View style={styles.envSection}>
          <Text style={styles.envTitle}>Environment Variables</Text>

          <View style={styles.envRow}>
            <Text style={styles.envLabel}>App Name:</Text>
            <Text style={styles.envValue}>{Config.APP_NAME || 'Not set'}</Text>
          </View>

          <View style={styles.envRow}>
            <Text style={styles.envLabel}>App Version:</Text>
            <Text style={styles.envValue}>{Config.APP_VERSION || 'Not set'}</Text>
          </View>

          <View style={styles.envRow}>
            <Text style={styles.envLabel}>Environment:</Text>
            <Text style={styles.envValue}>{Config.APP_ENV || 'Not set'}</Text>
          </View>

          <View style={styles.envRow}>
            <Text style={styles.envLabel}>API Base URL:</Text>
            <Text style={styles.envValue} numberOfLines={1}>
              {Config.API_BASE_URL || 'Not set'}
            </Text>
          </View>

          <View style={styles.envRow}>
            <Text style={styles.envLabel}>API Key:</Text>
            <Text style={styles.envValue} numberOfLines={1}>
              {Config.API_KEY ? `${Config.API_KEY.substring(0, 10)}...` : 'Not set'}
            </Text>
          </View>

          <View style={styles.envRow}>
            <Text style={styles.envLabel}>Debug Mode:</Text>
            <Text style={styles.envValue}>
              {Config.ENABLE_DEBUG_MODE === 'true' ? 'Enabled' : 'Disabled'}
            </Text>
          </View>

          <View style={styles.envRow}>
            <Text style={styles.envLabel}>Analytics:</Text>
            <Text style={styles.envValue}>
              {Config.ENABLE_ANALYTICS === 'true' ? 'Enabled' : 'Disabled'}
            </Text>
          </View>

          <View style={styles.envRow}>
            <Text style={styles.envLabel}>Default Language:</Text>
            <Text style={styles.envValue}>{Config.DEFAULT_LANGUAGE || 'Not set'}</Text>
          </View>
        </View>

        {/* Moment.js Date/Time Showcase */}
        <View style={styles.momentSection}>
          <Text style={styles.momentTitle}>Moment.js - Date & Time</Text>

          <View style={styles.dateRow}>
            <Text style={styles.dateLabel}>Current Date/Time:</Text>
            <Text style={styles.dateValue}>{moment().format('MMMM Do YYYY, h:mm:ss a')}</Text>
          </View>

          <View style={styles.dateRow}>
            <Text style={styles.dateLabel}>Relative Time:</Text>
            <Text style={styles.dateValue}>{moment().fromNow()}</Text>
          </View>

          <View style={styles.dateRow}>
            <Text style={styles.dateLabel}>Calendar:</Text>
            <Text style={styles.dateValue}>{moment().calendar()}</Text>
          </View>

          <View style={styles.dateRow}>
            <Text style={styles.dateLabel}>Start of Week:</Text>
            <Text style={styles.dateValue}>{moment().startOf('week').format('MMM DD, YYYY')}</Text>
          </View>

          <View style={styles.dateRow}>
            <Text style={styles.dateLabel}>End of Month:</Text>
            <Text style={styles.dateValue}>{moment().endOf('month').format('MMM DD, YYYY')}</Text>
          </View>

          <View style={styles.dateRow}>
            <Text style={styles.dateLabel}>Days in Month:</Text>
            <Text style={styles.dateValue}>{moment().daysInMonth()} days</Text>
          </View>

          <View style={styles.dateRow}>
            <Text style={styles.dateLabel}>Week of Year:</Text>
            <Text style={styles.dateValue}>Week {moment().week()}</Text>
          </View>

          <View style={styles.dateRow}>
            <Text style={styles.dateLabel}>Unix Timestamp:</Text>
            <Text style={styles.dateValue}>{moment().unix()}</Text>
          </View>
        </View>

        {/* Axios HTTP Client Showcase */}
        <View style={styles.axiosSection}>
          <Text style={styles.axiosTitle}>Axios HTTP Client</Text>
          <Text style={styles.axiosSubtitle}>Test API request with interceptors</Text>

          <TouchableOpacity
            style={styles.axiosButton}
            onPress={testAxiosRequest}
            disabled={apiLoading}>
            {apiLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.axiosButtonText}>Make API Request</Text>
            )}
          </TouchableOpacity>

          {apiResponse !== '' && (
            <View style={styles.responseContainer}>
              <Text style={styles.responseTitle}>Response:</Text>
              <ScrollView style={styles.responseScroll} nestedScrollEnabled>
                <Text style={styles.responseText}>{apiResponse}</Text>
              </ScrollView>
            </View>
          )}
        </View>

        {/* WebView Showcase */}
        <View style={styles.webViewSection}>
          <Text style={styles.webViewTitle}>WebView Component</Text>
          <Text style={styles.webViewSubtitle}>Tap button to open web page</Text>

          <TouchableOpacity
            style={styles.webViewButton}
            onPress={() => setShowWebView(true)}>
            <Text style={styles.webViewButtonText}>Open React Native Website</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>

      {/* WebView Modal */}
      <Modal
        visible={showWebView}
        animationType="slide"
        onRequestClose={() => setShowWebView(false)}>
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>React Native</Text>
            <TouchableOpacity onPress={() => setShowWebView(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
          <WebViewComponent uri="https://reactnative.dev" />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

// Dynamic styles function that uses theme
const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing.lg,
    },
    themeToggle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.colors.card,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.lg,
      marginBottom: theme.spacing.md,
      width: '100%',
      maxWidth: 400,
      ...theme.shadows.small,
    },
    themeInfo: {
      flex: 1,
    },
    themeLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
    },
    themeSubtext: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      marginTop: 2,
    },
    resetButton: {
      backgroundColor: theme.colors.accent,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.sm,
      borderRadius: theme.borderRadius.md,
      marginBottom: theme.spacing.xl * 2,
    },
    resetButtonText: {
      color: theme.colors.textInverse,
      fontSize: 14,
      fontWeight: '600',
    },
    title: {
      fontSize: 48,
      ...(theme.fonts?.heading && {fontFamily: theme.fonts.heading}),
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
      textAlign: 'center',
      fontWeight: '700',
    },
    subtitle: {
      fontSize: 20,
      ...(theme.fonts?.regular && {fontFamily: theme.fonts.regular}),
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginBottom: theme.spacing.xl,
    },
    infoBox: {
      backgroundColor: theme.colors.primary + '15',
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.md,
      borderWidth: 1,
      borderColor: theme.colors.primary + '30',
      maxWidth: 400,
      width: '100%',
    },
    infoText: {
      fontSize: 13,
      color: theme.colors.text,
      textAlign: 'center',
      lineHeight: 18,
    },
    envSection: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.lg,
      marginTop: theme.spacing.xl,
      width: '100%',
      maxWidth: 400,
      ...theme.shadows.small,
    },
    envTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
      textAlign: 'center',
    },
    envRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: theme.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    envLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.textSecondary,
      flex: 1,
    },
    envValue: {
      fontSize: 14,
      color: theme.colors.text,
      fontWeight: '500',
      flex: 1,
      textAlign: 'right',
    },
    scrollView: {
      flex: 1,
    },
    momentSection: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.lg,
      marginTop: theme.spacing.xl,
      width: '100%',
      maxWidth: 400,
      ...theme.shadows.small,
    },
    momentTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
      textAlign: 'center',
    },
    dateRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: theme.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    dateLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.textSecondary,
      flex: 1,
    },
    dateValue: {
      fontSize: 13,
      color: theme.colors.text,
      fontWeight: '500',
      flex: 1,
      textAlign: 'right',
    },
    webViewSection: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.lg,
      marginTop: theme.spacing.xl,
      marginBottom: theme.spacing.xl,
      width: '100%',
      maxWidth: 400,
      ...theme.shadows.small,
    },
    webViewTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
      textAlign: 'center',
    },
    webViewSubtitle: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginBottom: theme.spacing.md,
    },
    webViewButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      borderRadius: theme.borderRadius.md,
      alignItems: 'center',
    },
    webViewButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
    modalContainer: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
      backgroundColor: theme.colors.card,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.colors.text,
    },
    closeButton: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.primary,
    },
    axiosSection: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.lg,
      marginTop: theme.spacing.xl,
      width: '100%',
      maxWidth: 400,
      ...theme.shadows.small,
    },
    axiosTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
      textAlign: 'center',
    },
    axiosSubtitle: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginBottom: theme.spacing.md,
    },
    axiosButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      borderRadius: theme.borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 48,
    },
    axiosButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
    responseContainer: {
      marginTop: theme.spacing.md,
      backgroundColor: theme.colors.background,
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    responseTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    responseScroll: {
      maxHeight: 200,
    },
    responseText: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      fontFamily: 'monospace',
    },
  });

export default HomeScreen;
