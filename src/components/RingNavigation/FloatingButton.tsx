/**
 * FloatingButton Component - Pill Style Design
 *
 * A pill-shaped floating button matching the design image.
 * Blue background with grid icon and "Categories" text.
 */

import React from 'react';
import {StyleSheet, Pressable, Text, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withSequence,
  withTiming,
  useSharedValue,
  withDelay,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface FloatingButtonProps {
  isExpanded: boolean;
  onPress: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const FloatingButton: React.FC<FloatingButtonProps> = ({
  isExpanded,
  onPress,
}) => {
  const pulseScale = useSharedValue(1);

  React.useEffect(() => {
    if (!isExpanded) {
      pulseScale.value = withDelay(
        1000,
        withRepeat(
          withSequence(
            withTiming(1.03, {duration: 1000}),
            withTiming(1, {duration: 1000}),
          ),
          -1,
          false,
        ),
      );
    } else {
      pulseScale.value = withTiming(1, {duration: 200});
    }
  }, [isExpanded, pulseScale]);

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [
      {scale: isExpanded ? withSpring(0) : withSpring(pulseScale.value)},
    ],
    opacity: isExpanded ? withTiming(0, {duration: 200}) : withTiming(1, {duration: 300}),
  }));

  if (isExpanded) return null;

  return (
    <AnimatedPressable style={[styles.button, buttonStyle]} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Icon name="view-grid" size={18} color="#FFFFFF" />
      </View>
      <Text style={styles.label}>Categories</Text>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default FloatingButton;
