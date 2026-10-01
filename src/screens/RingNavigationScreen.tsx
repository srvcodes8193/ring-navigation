/**
 * RingNavigationScreen
 *
 * Demo screen showcasing the circular category navigation component.
 * The Ring Navigation provides an explorable, gesture-driven radial
 * interface for browsing product categories.
 *
 * Features:
 * - Floating "Categories" button that expands into radial UI
 * - 360° rotatable category ring with magnetic snapping
 * - Long-press to reveal subcategories in outer ring
 * - Gesture hints for first-time users
 * - Theme-aware styling
 */

import React, {useCallback} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '../hooks/useTheme';
import {RingNavigation} from '../components/RingNavigation';

function RingNavigationScreen(): React.JSX.Element {
  const {theme} = useTheme();

  /**
   * Handle category selection from ring navigation
   */
  const handleCategorySelect = useCallback(
    (categoryId: string, subcategoryId?: string) => {
      console.log('Selected:', categoryId, subcategoryId);
      // In a real app, navigate to category/subcategory products page
    },
    [],
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
    },
    scrollContent: {
      padding: theme.spacing.lg,
      paddingBottom: 120,
    },
    header: {
      marginBottom: theme.spacing.xl,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    subtitle: {
      fontSize: 16,
      color: theme.colors.textSecondary,
      lineHeight: 24,
    },
    section: {
      marginBottom: theme.spacing.xl,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    instructionItem: {
      flexDirection: 'row',
      marginBottom: theme.spacing.sm,
      paddingRight: theme.spacing.lg,
    },
    bullet: {
      fontSize: 14,
      color: theme.colors.primary,
      marginRight: theme.spacing.sm,
      fontWeight: 'bold',
    },
    instruction: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      flex: 1,
      lineHeight: 20,
    },
    card: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.lg,
      marginBottom: theme.spacing.md,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    cardText: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      lineHeight: 20,
    },
    hint: {
      backgroundColor: theme.colors.primary + '15',
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.md,
      marginTop: theme.spacing.lg,
    },
    hintText: {
      fontSize: 14,
      color: theme.colors.primary,
      textAlign: 'center',
      fontWeight: '500',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Ring Navigation</Text>
          <Text style={styles.subtitle}>
            An interactive circular category navigation for mobile e-commerce.
            Tap the floating button in the bottom-right to explore.
          </Text>
        </View>

        {/* How to use section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How to Use</Text>

          <View style={styles.instructionItem}>
            <Text style={styles.bullet}>1.</Text>
            <Text style={styles.instruction}>
              Tap the "Categories" button to open the ring
            </Text>
          </View>

          <View style={styles.instructionItem}>
            <Text style={styles.bullet}>2.</Text>
            <Text style={styles.instruction}>
              Drag left/right to rotate and browse categories
            </Text>
          </View>

          <View style={styles.instructionItem}>
            <Text style={styles.bullet}>3.</Text>
            <Text style={styles.instruction}>
              The ring snaps so one category is always at the top (focus zone)
            </Text>
          </View>

          <View style={styles.instructionItem}>
            <Text style={styles.bullet}>4.</Text>
            <Text style={styles.instruction}>
              Long-press the focused category to see subcategories
            </Text>
          </View>

          <View style={styles.instructionItem}>
            <Text style={styles.bullet}>5.</Text>
            <Text style={styles.instruction}>
              Tap center button to confirm selection
            </Text>
          </View>

          <View style={styles.instructionItem}>
            <Text style={styles.bullet}>6.</Text>
            <Text style={styles.instruction}>
              Swipe down or double-tap center to close
            </Text>
          </View>
        </View>

        {/* Features cards */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Magnetic Snapping</Text>
            <Text style={styles.cardText}>
              The ring automatically snaps to position a category at the focus
              zone, preventing awkward in-between states.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Progressive Disclosure</Text>
            <Text style={styles.cardText}>
              Subcategories are hidden until needed. Long-press reveals them in
              an outer ring, keeping the interface clean.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Gesture Guidance</Text>
            <Text style={styles.cardText}>
              First-time users see helpful hints that fade after interaction,
              making the interface self-explanatory.
            </Text>
          </View>
        </View>

        {/* Bottom hint */}
        <View style={styles.hint}>
          <Text style={styles.hintText}>
            Tap the floating button below to try it out!
          </Text>
        </View>

      </ScrollView>

      {/* Ring Navigation overlay */}
      <RingNavigation onCategorySelect={handleCategorySelect} />
    </SafeAreaView>
  );
}

export default RingNavigationScreen;
