/**
 * BackdropOverlay Component
 *
 * Dims and blurs background content when ring navigation is open.
 * Provides visual depth and focus on the navigation.
 * Tapping the backdrop closes the navigation.
 */

import React from 'react';
import {StyleSheet, Pressable, Dimensions} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';

interface BackdropOverlayProps {
  isVisible: boolean;
  intensity: 'light' | 'heavy'; // light = main ring, heavy = subcategory ring
  onPress: () => void;
}

const {width, height} = Dimensions.get('window');

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const BackdropOverlay: React.FC<BackdropOverlayProps> = ({
  isVisible,
  intensity,
  onPress,
}) => {
  const overlayStyle = useAnimatedStyle(() => ({
    opacity: withTiming(intensity === 'heavy' ? 0.7 : 0.5, {duration: 300}),
  }));

  if (!isVisible) return null;

  return (
    <AnimatedPressable
      style={[styles.overlay, overlayStyle]}
      onPress={onPress}
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(200)}
    />
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
    width,
    height,
  },
});

export default BackdropOverlay;
