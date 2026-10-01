/**
 * GestureHints Component
 *
 * Shows micro-hints on first use to guide users:
 * - "Rotate to browse" - when ring first opens
 * - "Hold to open subcategories" - after user has rotated
 *
 * Hints fade out after user interaction or timeout.
 * Uses AsyncStorage to track if hints have been shown before.
 */

import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface GestureHintsProps {
  isRingOpen: boolean;
  hasRotated: boolean;
  onDismiss: () => void;
}

const HINT_STORAGE_KEY = '@ring_nav_hints_shown';

const GestureHints: React.FC<GestureHintsProps> = ({
  isRingOpen,
  hasRotated,
  onDismiss,
}) => {
  const [showHints, setShowHints] = useState(false);
  const [currentHint, setCurrentHint] = useState<'rotate' | 'hold' | null>(
    'rotate',
  );

  // Animation for hint arrow
  const arrowAnimation = useSharedValue(0);

  useEffect(() => {
    // Animate the hint arrow
    arrowAnimation.value = withRepeat(
      withSequence(
        withTiming(10, {duration: 500}),
        withTiming(0, {duration: 500}),
      ),
      -1,
      true,
    );
  }, [arrowAnimation]);

  useEffect(() => {
    // Check if hints have been shown before
    const checkHintsShown = async () => {
      try {
        const hintsShown = await AsyncStorage.getItem(HINT_STORAGE_KEY);
        if (!hintsShown && isRingOpen) {
          setShowHints(true);
          // Auto-dismiss after 5 seconds
          setTimeout(() => {
            setShowHints(false);
            AsyncStorage.setItem(HINT_STORAGE_KEY, 'true');
            onDismiss();
          }, 5000);
        }
      } catch {
        // If storage fails, show hints anyway
        if (isRingOpen) {
          setShowHints(true);
        }
      }
    };

    checkHintsShown();
  }, [isRingOpen, onDismiss]);

  // Update hint based on user interaction
  useEffect(() => {
    if (hasRotated && currentHint === 'rotate') {
      setCurrentHint('hold');
      // Dismiss hold hint after 3 seconds
      setTimeout(() => {
        setCurrentHint(null);
        setShowHints(false);
      }, 3000);
    }
  }, [hasRotated, currentHint]);

  const arrowStyle = useAnimatedStyle(() => ({
    transform: [{translateX: arrowAnimation.value}],
  }));

  if (!showHints || !isRingOpen) return null;

  return (
    <Animated.View
      style={styles.container}
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(200)}>
      {currentHint === 'rotate' && (
        <View style={styles.hintContainer}>
          <Animated.View style={arrowStyle}>
            <Icon name="gesture-swipe-horizontal" size={24} color="#FFFFFF" />
          </Animated.View>
          <Text style={styles.hintText}>Rotate to browse</Text>
        </View>
      )}

      {currentHint === 'hold' && (
        <View style={styles.hintContainer}>
          <Icon name="gesture-tap-hold" size={24} color="#FFFFFF" />
          <Text style={styles.hintText}>Hold to open subcategories</Text>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 100,
    alignSelf: 'center',
    zIndex: 100,
  },
  hintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    gap: 8,
  },
  hintText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default GestureHints;
