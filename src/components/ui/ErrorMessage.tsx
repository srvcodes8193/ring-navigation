/**
 * ErrorMessage Component
 * Reusable error display with icon and dismissible option
 */

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle} from 'react-native';

export type ErrorVariant = 'error' | 'warning' | 'info';

interface ErrorMessageProps {
  message: string;
  variant?: ErrorVariant;
  onDismiss?: () => void;
  dismissText?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  variant = 'error',
  onDismiss,
  dismissText = 'Dismiss',
  style,
  textStyle,
}) => {
  return (
    <View style={[styles.container, styles[`${variant}Container`], style]}>
      <Text style={[styles.icon, styles[`${variant}Icon`]]}>
        {variant === 'error' ? '⚠️' : variant === 'warning' ? '⚠' : 'ℹ️'}
      </Text>

      <View style={styles.content}>
        <Text style={[styles.message, styles[`${variant}Message`], textStyle]}>
          {message}
        </Text>

        {onDismiss && (
          <TouchableOpacity onPress={onDismiss} style={styles.dismissButton}>
            <Text style={[styles.dismissText, styles[`${variant}DismissText`]]}>
              {dismissText}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginVertical: 8,
  },
  errorContainer: {
    backgroundColor: '#FFEBEE',
    borderColor: '#FF3B30',
  },
  warningContainer: {
    backgroundColor: '#FFF8E1',
    borderColor: '#FF9500',
  },
  infoContainer: {
    backgroundColor: '#E3F2FD',
    borderColor: '#007AFF',
  },
  icon: {
    fontSize: 20,
    marginRight: 12,
  },
  errorIcon: {
    color: '#FF3B30',
  },
  warningIcon: {
    color: '#FF9500',
  },
  infoIcon: {
    color: '#007AFF',
  },
  content: {
    flex: 1,
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
  },
  errorMessage: {
    color: '#C62828',
  },
  warningMessage: {
    color: '#E65100',
  },
  infoMessage: {
    color: '#01579B',
  },
  dismissButton: {
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  dismissText: {
    fontSize: 14,
    fontWeight: '600',
  },
  errorDismissText: {
    color: '#FF3B30',
  },
  warningDismissText: {
    color: '#FF9500',
  },
  infoDismissText: {
    color: '#007AFF',
  },
});
