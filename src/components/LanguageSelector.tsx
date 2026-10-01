import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '../hooks/useTheme';
import type {Theme} from '../config/theme';

interface Language {
  code: string;
  name: string;
}

const LANGUAGES: Language[] = [
  {code: 'en', name: 'English'},
  {code: 'es', name: 'Español'},
  {code: 'fr', name: 'Français'},
  {code: 'hi', name: 'हिंदी'},
];

const LanguageSelector = () => {
  const {theme} = useTheme();
  const {t, i18n} = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);

  const styles = createStyles(theme);

  const currentLanguage =
    LANGUAGES.find(lang => lang.code === i18n.language) || LANGUAGES[0];

  const changeLanguage = async (languageCode: string) => {
    await i18n.changeLanguage(languageCode);
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.label}>{t('settings.language')}</Text>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>{currentLanguage.name}</Text>
          <Text style={styles.arrow}>›</Text>
        </View>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {t('settings.selectLanguage')}
              </Text>
            </View>

            <FlatList
              data={LANGUAGES}
              keyExtractor={item => item.code}
              renderItem={({item}) => {
                const isSelected = item.code === i18n.language;
                return (
                  <TouchableOpacity
                    style={[
                      styles.languageItem,
                      isSelected && styles.selectedLanguageItem,
                    ]}
                    onPress={() => changeLanguage(item.code)}>
                    <Text
                      style={[
                        styles.languageName,
                        isSelected && styles.selectedLanguageName,
                      ]}>
                      {item.name}
                    </Text>
                    {isSelected && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </TouchableOpacity>
                );
              }}
            />

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>{t('common.close')}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    selector: {
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
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
    },
    valueContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    value: {
      fontSize: 16,
      color: theme.colors.textSecondary,
      marginRight: theme.spacing.xs,
    },
    arrow: {
      fontSize: 24,
      color: theme.colors.textSecondary,
      fontWeight: '300',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: theme.borderRadius.xl,
      borderTopRightRadius: theme.borderRadius.xl,
      paddingBottom: theme.spacing.xl,
      maxHeight: '70%',
    },
    modalHeader: {
      padding: theme.spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: theme.colors.text,
      textAlign: 'center',
    },
    languageItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: theme.spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    selectedLanguageItem: {
      backgroundColor: theme.colors.primary + '10',
    },
    languageName: {
      fontSize: 18,
      color: theme.colors.text,
    },
    selectedLanguageName: {
      color: theme.colors.primary,
      fontWeight: '600',
    },
    checkmark: {
      fontSize: 20,
      color: theme.colors.primary,
      fontWeight: 'bold',
    },
    closeButton: {
      backgroundColor: theme.colors.primary,
      margin: theme.spacing.lg,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
      alignItems: 'center',
    },
    closeButtonText: {
      color: theme.colors.textInverse,
      fontSize: 16,
      fontWeight: '600',
    },
  });

export default LanguageSelector;
