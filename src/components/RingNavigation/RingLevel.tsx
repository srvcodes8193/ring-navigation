/**
 * RingLevel Component
 *
 * A reusable ring component that can render any level of the navigation.
 * Uses SVG pie/arc segments with customizable inner/outer radius.
 */

import React, {useCallback} from 'react';
import {StyleSheet, Text, Pressable} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  ZoomIn,
  ZoomOut,
  SharedValue,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface RingItem {
  id: string;
  name: string;
  icon: string;
  color?: string;
}

interface RingLevelProps {
  items: RingItem[];
  innerRadius: number;
  outerRadius: number;
  baseColor: string;
  isVisible: boolean;
  selectedIndex: number;
  onSelect: (index: number) => void;
  level: number;
  showCenter?: boolean;
  dimmed?: boolean;
  zIndex?: number;
}

interface RingItemLabelProps {
  item: RingItem;
  rotation: SharedValue<number>;
  onPress: () => void;
  position: {x: number; y: number};
}

/**
 * Individual item label with counter-rotation to keep text upright
 */
const RingItemLabel: React.FC<RingItemLabelProps> = ({
  item,
  rotation,
  onPress,
  position,
}) => {
  // Counter-rotate the icon/text so it stays upright while the ring rotates
  const counterRotationStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${-rotation.value}deg`}],
  }));

  return (
    <Pressable
      style={[
        styles.itemTouchable,
        {
          left: position.x - 30,
          top: position.y - 25,
          width: 60,
          height: 50,
        },
      ]}
      onPress={onPress}>
      <Animated.View style={[styles.iconWrapper, counterRotationStyle]}>
        <Icon name={item.icon} size={22} color="#FFFFFF" />
        <Text style={styles.itemLabel} numberOfLines={1}>
          {item.name}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

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
  gap: number = 2,
) => {
  const start1 = polarToCartesian(centerX, centerY, outerRadius, endAngle - gap);
  const end1 = polarToCartesian(centerX, centerY, outerRadius, startAngle + gap);
  const start2 = polarToCartesian(centerX, centerY, innerRadius, startAngle + gap);
  const end2 = polarToCartesian(centerX, centerY, innerRadius, endAngle - gap);

  const largeArcFlag = endAngle - startAngle - gap * 2 <= 180 ? '0' : '1';

  const d = [
    'M', start1.x, start1.y,
    'A', outerRadius, outerRadius, 0, largeArcFlag, 0, end1.x, end1.y,
    'L', start2.x, start2.y,
    'A', innerRadius, innerRadius, 0, largeArcFlag, 1, end2.x, end2.y,
    'Z',
  ].join(' ');

  return d;
};

// Vibrant color palette for ring items
const VIBRANT_COLORS = [
  '#E91E63', // Pink
  '#9C27B0', // Purple
  '#673AB7', // Deep Purple
  '#3F51B5', // Indigo
  '#2196F3', // Blue
  '#00BCD4', // Cyan
  '#009688', // Teal
  '#4CAF50', // Green
  '#8BC34A', // Light Green
  '#FF9800', // Orange
  '#FF5722', // Deep Orange
  '#795548', // Brown
];

// Generate distinct colors for items without predefined colors
const generateColors = (_baseColor: string, count: number): string[] => {
  const colors: string[] = [];
  for (let i = 0; i < count; i++) {
    // Cycle through vibrant colors
    colors.push(VIBRANT_COLORS[i % VIBRANT_COLORS.length]);
  }
  return colors;
};


const RingLevel: React.FC<RingLevelProps> = ({
  items,
  innerRadius,
  outerRadius,
  baseColor,
  isVisible,
  selectedIndex,
  onSelect,
  level: _level,
  showCenter: _showCenter = false,
  dimmed = false,
  zIndex = 1,
}) => {
  const rotation = useSharedValue(0);
  const startRotation = useSharedValue(0);

  const anglePerItem = 360 / items.length;
  const size = outerRadius * 2 + 40;
  const center = size / 2;

  const colors = items.map((item, index) =>
    item.color || generateColors(baseColor, items.length)[index],
  );

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
      (items.length - (snapIndex % items.length)) % items.length;
    runOnJS(onSelect)(focusedIdx);
  }, [anglePerItem, items.length, onSelect, rotation]);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      startRotation.value = rotation.value;
    })
    .onUpdate(event => {
      // Sensitivity for rotation
      const sensitivity = 0.4;
      // Swipe right = rotate clockwise (positive)
      // Swipe left = rotate counter-clockwise (negative)
      // Also consider vertical movement for more natural feel
      const deltaX = event.translationX * sensitivity;
      const deltaY = -event.translationY * sensitivity * 0.3;
      rotation.value = startRotation.value + deltaX + deltaY;
    })
    .onEnd(() => {
      snapToNearest();
    });

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${rotation.value}deg`}],
    opacity: dimmed ? 0.4 : 1,
  }));

  const handleItemPress = useCallback(
    (index: number) => {
      onSelect(index);
      const targetRotation = -index * anglePerItem;
      rotation.value = withSpring(targetRotation, {
        damping: 15,
        stiffness: 150,
      });
    },
    [anglePerItem, onSelect, rotation],
  );

  if (!isVisible) return null;

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        style={[
          styles.container,
          {width: size, height: size, zIndex},
          ringStyle,
        ]}
        entering={ZoomIn.duration(150)}
        exiting={ZoomOut.duration(100)}>
        {/* SVG Segments */}
        <Svg width={size} height={size} style={styles.svg}>
          {items.map((item, index) => {
            const startAngle = index * anglePerItem;
            const endAngle = (index + 1) * anglePerItem;
            const isSelected = selectedIndex === index;

            return (
              <Path
                key={item.id}
                d={createArcPath(
                  center,
                  center,
                  innerRadius,
                  outerRadius,
                  startAngle,
                  endAngle,
                  3, // gap between segments
                )}
                fill={colors[index]}
                opacity={isSelected ? 1 : 0.9}
                stroke={isSelected ? '#FFFFFF' : 'rgba(255,255,255,0.2)'}
                strokeWidth={isSelected ? 2 : 0.5}
              />
            );
          })}
        </Svg>

        {/* Icons and Labels - inside rotating container with counter-rotation */}
        {items.map((item, index) => {
          const midAngle = (index + 0.5) * anglePerItem;
          const iconRadius = (innerRadius + outerRadius) / 2;
          const iconPos = polarToCartesian(center, center, iconRadius, midAngle);

          return (
            <RingItemLabel
              key={item.id}
              item={item}
              rotation={rotation}
              position={iconPos}
              onPress={() => handleItemPress(index)}
            />
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
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  svg: {
    position: 'absolute',
  },
  itemTouchable: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 20,
    padding: 4,
    minWidth: 50,
  },
  itemLabel: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '700',
    marginTop: 2,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 3,
  },
});

export default RingLevel;
