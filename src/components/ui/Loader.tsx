/**
 * Loader Component
 * Reusable loading indicator with customizable size and overlay
 */

import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  Modal,
  Text,
} from 'react-native';

export type LoaderSize = 'small' | 'large';

interface LoaderProps {
  size?: LoaderSize;
  color?: string;
  overlay?: boolean;
  text?: string;
  style?: ViewStyle;
}

export const Loader: React.FC<LoaderProps> = ({
  size = 'large',
  color = '#007AFF',
  overlay = false,
  text,
  style,
}) => {
  const content = (
    <View style={[styles.container, overlay && styles.overlayContainer, style]}>
      <View style={overlay ? styles.overlayContent : undefined}>
        <ActivityIndicator size={size} color={color} />
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </View>
  );

  if (overlay) {
    return (
      <Modal transparent visible animationType="fade">
        {content}
      </Modal>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  text: {
    marginTop: 12,
    fontSize: 14,
    color: '#1A1A1A',
    textAlign: 'center',
  },
});
