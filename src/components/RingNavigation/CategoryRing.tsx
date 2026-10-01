/**
 * CategoryRing Component - New Pie Segment Design
 *
 * A circular pie-chart style ring with colored segments.
 * Each segment represents a category with icon and label.
 * Users can tap segments to select, or rotate the entire wheel.
 *
 * Design matches the reference image with:
 * - Colored donut segments
 * - White icons centered in each segment
 * - Category labels on the segments
 * - Gray center circle
 */

import React, {useCallback} from 'react';
import {StyleSheet, Text, Pressable} from 'react-native';
import Svg, {Path, Circle} from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Category} from './types';
import {RING_CONFIG} from './data';

interface CategoryRingProps {
  categories: Category[];
  isVisible: boolean;
  focusedIndex: number;
  onFocusChange: (index: number) => void;
  onLongPress: () => void;
  isSubcategoryOpen: boolean;
}

/**
 * Convert polar coordinates to cartesian
 */
const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number,
) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

/**
 * Create SVG arc path for a donut segment
 */
const createArcPath = (
  centerX: number,
  centerY: number,
  innerRadius: number,
  outerRadius: number,
  startAngle: number,
  endAngle: number,
) => {
  const start1 = polarToCartesian(centerX, centerY, outerRadius, endAngle - 2);
  const end1 = polarToCartesian(centerX, centerY, outerRadius, startAngle + 2);
  const start2 = polarToCartesian(centerX, centerY, innerRadius, startAngle + 2);
  const end2 = polarToCartesian(centerX, centerY, innerRadius, endAngle - 2);

  const largeArcFlag = endAngle - startAngle - 4 <= 180 ? '0' : '1';

  const d = [
    'M', start1.x, start1.y,
    'A', outerRadius, outerRadius, 0, largeArcFlag, 0, end1.x, end1.y,
    'L', start2.x, start2.y,
    'A', innerRadius, innerRadius, 0, largeArcFlag, 1, end2.x, end2.y,
    'Z',
  ].join(' ');

  return d;
};

const CategoryRing: React.FC<CategoryRingProps> = ({
  categories,
  isVisible,
  focusedIndex,
  onFocusChange,
  onLongPress,
  isSubcategoryOpen,
}) => {
  const rotation = useSharedValue(0);
  const startRotation = useSharedValue(0);

  const anglePerItem = 360 / categories.length;
  const size = RING_CONFIG.MAIN_RING_RADIUS * 2 + 40;
  const center = size / 2;

  const snapToNearest = useCallback(() => {
    'worklet';
    let normalizedRotation = rotation.value % 360;
    if (normalizedRotation < 0) {
      normalizedRotation += 360;
    }

    const snapIndex = Math.round(normalizedRotation / anglePerItem);
    const snapAngle = snapIndex * anglePerItem;

    rotation.value = withSpring(snapAngle, {
      damping: 15,
      stiffness: 150,
      mass: 0.5,
    });

    const focusedIdx =
      (categories.length - (snapIndex % categories.length)) % categories.length;
    runOnJS(onFocusChange)(focusedIdx);
  }, [anglePerItem, categories.length, onFocusChange, rotation]);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      startRotation.value = rotation.value;
    })
    .onUpdate(event => {
      const sensitivity = 0.5;
      const deltaX = event.translationX * sensitivity;
      const deltaY = event.translationY * sensitivity * 0.3;
      rotation.value = startRotation.value + deltaX - deltaY;
    })
    .onEnd(() => {
      snapToNearest();
    });

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${rotation.value}deg`}],
    opacity: isVisible ? (isSubcategoryOpen ? 0.6 : 1) : 0,
  }));

  const handleSegmentPress = useCallback(
    (index: number) => {
      onFocusChange(index);
      // Calculate rotation to bring this segment to top
      const targetRotation = -index * anglePerItem;
      rotation.value = withSpring(targetRotation, {
        damping: 15,
        stiffness: 150,
      });
    },
    [anglePerItem, onFocusChange, rotation],
  );

  const handleSegmentLongPress = useCallback(() => {
    onLongPress();
  }, [onLongPress]);

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.container, {width: size, height: size}, ringStyle]}>
        {/* SVG Pie Segments */}
        <Svg width={size} height={size} style={styles.svg}>
          {categories.map((category, index) => {
            const startAngle = index * anglePerItem;
            const endAngle = (index + 1) * anglePerItem;

            return (
              <Path
                key={category.id}
                d={createArcPath(
                  center,
                  center,
                  RING_CONFIG.MAIN_RING_INNER_RADIUS,
                  RING_CONFIG.MAIN_RING_RADIUS,
                  startAngle,
                  endAngle,
                )}
                fill={category.color}
                opacity={focusedIndex === index ? 1 : 0.9}
              />
            );
          })}
          {/* Center circle background */}
          <Circle
            cx={center}
            cy={center}
            r={RING_CONFIG.MAIN_RING_INNER_RADIUS - 5}
            fill="#4A4A4A"
          />
        </Svg>

        {/* Icons and Labels overlay */}
        {categories.map((category, index) => {
          const midAngle = (index + 0.5) * anglePerItem;
          const iconRadius =
            (RING_CONFIG.MAIN_RING_INNER_RADIUS + RING_CONFIG.MAIN_RING_RADIUS) / 2;
          const iconPos = polarToCartesian(center, center, iconRadius, midAngle);

          // Counter-rotate to keep icons upright
          const counterRotation = -rotation.value;

          return (
            <Pressable
              key={category.id}
              style={[
                styles.segmentTouchable,
                {
                  left: iconPos.x - 30,
                  top: iconPos.y - 30,
                  width: 60,
                  height: 60,
                },
              ]}
              onPress={() => handleSegmentPress(index)}
              onLongPress={focusedIndex === index ? handleSegmentLongPress : undefined}
              delayLongPress={RING_CONFIG.LONG_PRESS_DURATION}>
              <Animated.View
                style={[
                  styles.iconWrapper,
                  {transform: [{rotate: `${counterRotation}deg`}]},
                ]}>
                <Icon name={category.icon} size={26} color="#FFFFFF" />
                <Text style={styles.segmentLabel}>{category.name}</Text>
              </Animated.View>
            </Pressable>
          );
        })}
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  svg: {
    position: 'absolute',
  },
  segmentTouchable: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentLabel: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
  },
});

export default CategoryRing;
