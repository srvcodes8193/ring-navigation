/**
 * CenterButton Component - New Design
 *
 * Gray center circle that shows the focused category name.
 * Matches the design with dark gray background and white text.
 *
 * Interactions:
 * - Tap: Confirm selection / open subcategories
 * - Double-tap: Close all rings
 */

import React, {useCallback} from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  FadeIn,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CenterButtonState} from './types';
import {RING_CONFIG} from './data';

interface CenterButtonProps {
  state: CenterButtonState;
  categoryName?: string;
  categoryColor?: string;
  categoryIcon?: string;
  onSelect: () => void;
  onClose: () => void;
}

const CenterButton: React.FC<CenterButtonProps> = ({
  state,
  categoryName,
  categoryColor = '#007AFF',
  categoryIcon,
  onSelect,
  onClose,
}) => {
  const getContent = () => {
    switch (state) {
      case 'browse':
        return {
          icon: 'home',
          text: 'Browse',
          subtext: 'Spin to Browse',
        };
      case 'level1':
        return {
          icon: categoryIcon || 'shopping',
          text: categoryName || 'Category',
          subtext: 'Tap to Open',
        };
      case 'level2':
        return {
          icon: categoryIcon || 'shopping',
          text: categoryName || 'Subcategory',
          subtext: 'Tap to Explore',
        };
      case 'level3':
        return {
          icon: categoryIcon || 'shopping',
          text: categoryName || 'Type',
          subtext: 'Tap to View Items',
        };
      case 'level4':
        return {
          icon: categoryIcon || 'shopping',
          text: categoryName || 'Item',
          subtext: 'Tap to Select',
        };
      default:
        return {
          icon: 'home',
          text: 'Browse',
          subtext: '',
        };
    }
  };

  const content = getContent();

  const handlePress = useCallback(() => {
    onSelect();
  }, [onSelect]);

  const handleLongPress = useCallback(() => {
    onClose();
  }, [onClose]);

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{scale: withSpring(1, {damping: 15, stiffness: 200})}],
  }));

  return (
    <Animated.View style={[styles.container, buttonStyle]} entering={FadeIn.duration(300)}>
      <Pressable
        style={styles.pressable}
        onPress={handlePress}
        onLongPress={handleLongPress}
        delayLongPress={500}>
        {/* Icon */}
        <View style={[styles.iconContainer, {backgroundColor: categoryColor + '30'}]}>
          <Icon name={content.icon} size={28} color="#FFFFFF" />
        </View>

        {/* Category name */}
        <Text style={styles.categoryText} numberOfLines={1}>
          {content.text}
        </Text>

        {/* Hint text */}
        {content.subtext && (
          <Text style={styles.hintText}>{content.subtext}</Text>
        )}
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: RING_CONFIG.CENTER_BUTTON_SIZE,
    height: RING_CONFIG.CENTER_BUTTON_SIZE,
    borderRadius: RING_CONFIG.CENTER_BUTTON_SIZE / 2,
    backgroundColor: '#4A4A4A',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    zIndex: 10,
  },
  pressable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  hintText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 9,
    marginTop: 2,
    textAlign: 'center',
  },
});

export default CenterButton;
