/**
 * ScreenWrapper Component
 * Handles SafeAreaView, ScrollView, and standard screen padding
 */

import React from 'react';
import {View, ScrollView, StyleSheet, ViewStyle} from 'react-native';
import {SafeAreaView, Edge} from 'react-native-safe-area-context';

interface ScreenWrapperProps {
  children: React.ReactNode;
  scrollable?: boolean;
  edges?: Edge[];
  backgroundColor?: string;
  padding?: boolean;
  style?: ViewStyle;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  scrollable = false,
  edges = ['top', 'bottom', 'left', 'right'],
  backgroundColor = '#FFFFFF',
  padding = true,
  style,
}) => {
  const containerStyle = [
    styles.container,
    {backgroundColor},
    padding && styles.padding,
    style,
  ];

  const content = (
    <View style={containerStyle}>
      {children}
    </View>
  );

  if (scrollable) {
    return (
      <SafeAreaView style={[styles.safeArea, {backgroundColor}]} edges={edges}>
        <ScrollView
          contentContainerStyle={[padding && styles.scrollPadding]}
          showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, {backgroundColor}]} edges={edges}>
      {content}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  padding: {
    padding: 16,
  },
  scrollPadding: {
    padding: 16,
  },
});
