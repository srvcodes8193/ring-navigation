/**
 * SubcategoryRing Component - New Arc Segment Design
 *
 * Outer ring with colored arc segments for subcategories.
 * Matches the design image with subcategory names on curved segments.
 */

import React from 'react';
import {StyleSheet, Text, Pressable} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {Subcategory} from './types';
import {RING_CONFIG} from './data';

interface SubcategoryRingProps {
  subcategories: Subcategory[];
  isVisible: boolean;
  parentColor: string;
  focusedIndex: number;
  onSelect: (index: number) => void;
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
 * Create SVG arc path for an outer segment
 */
const createArcPath = (
  centerX: number,
  centerY: number,
  innerRadius: number,
  outerRadius: number,
  startAngle: number,
  endAngle: number,
) => {
  const gap = 3; // Gap between segments
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

// Generate variations of the parent color for subcategories
const generateColorVariations = (baseColor: string, count: number): string[] => {
  const colors: string[] = [];
  // Create variations by adjusting opacity or using predefined palette
  const variations = [
    baseColor,
    adjustColorBrightness(baseColor, 20),
    adjustColorBrightness(baseColor, -20),
    adjustColorBrightness(baseColor, 40),
  ];
  for (let i = 0; i < count; i++) {
    colors.push(variations[i % variations.length]);
  }
  return colors;
};

// Simple color brightness adjustment
const adjustColorBrightness = (hex: string, percent: number): string => {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, Math.max(0, (num >> 16) + amt));
  const G = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amt));
  const B = Math.min(255, Math.max(0, (num & 0x0000ff) + amt));
  return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
};

const SubcategoryRing: React.FC<SubcategoryRingProps> = ({
  subcategories,
  isVisible,
  parentColor,
  focusedIndex,
  onSelect,
}) => {
  if (!isVisible) return null;

  const anglePerItem = 360 / subcategories.length;
  const size = RING_CONFIG.SUB_RING_RADIUS * 2 + 40;
  const center = size / 2;

  const colors = generateColorVariations(parentColor, subcategories.length);

  return (
    <Animated.View
      style={[styles.container, {width: size, height: size}]}
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(200)}>
      {/* SVG Arc Segments */}
      <Svg width={size} height={size} style={styles.svg}>
        {subcategories.map((subcategory, index) => {
          const startAngle = index * anglePerItem;
          const endAngle = (index + 1) * anglePerItem;

          return (
            <Path
              key={subcategory.id}
              d={createArcPath(
                center,
                center,
                RING_CONFIG.SUB_RING_INNER_RADIUS,
                RING_CONFIG.SUB_RING_RADIUS,
                startAngle,
                endAngle,
              )}
              fill={colors[index]}
              opacity={focusedIndex === index ? 1 : 0.85}
            />
          );
        })}
      </Svg>

      {/* Touchable overlays with labels */}
      {subcategories.map((subcategory, index) => {
        const midAngle = (index + 0.5) * anglePerItem;
        const labelRadius =
          (RING_CONFIG.SUB_RING_INNER_RADIUS + RING_CONFIG.SUB_RING_RADIUS) / 2;
        const labelPos = polarToCartesian(center, center, labelRadius, midAngle);

        const isFocused = focusedIndex === index;

        return (
          <SubcategoryItem
            key={subcategory.id}
            subcategory={subcategory}
            index={index}
            labelPos={labelPos}
            midAngle={midAngle}
            isFocused={isFocused}
            onSelect={() => onSelect(index)}
          />
        );
      })}
    </Animated.View>
  );
};

interface SubcategoryItemProps {
  subcategory: Subcategory;
  index: number;
  labelPos: {x: number; y: number};
  midAngle: number;
  isFocused: boolean;
  onSelect: () => void;
}

const SubcategoryItem: React.FC<SubcategoryItemProps> = ({
  subcategory,
  labelPos,
  midAngle,
  isFocused,
  onSelect,
}) => {
  // Calculate text rotation to follow the arc curve
  // Text should be readable (not upside down)
  let textRotation = midAngle - 90;
  if (midAngle > 90 && midAngle < 270) {
    textRotation += 180;
  }

  const focusStyle = useAnimatedStyle(() => ({
    transform: [{scale: withSpring(isFocused ? 1.1 : 1)}],
  }));

  return (
    <Pressable
      style={[
        styles.itemTouchable,
        {
          left: labelPos.x - 40,
          top: labelPos.y - 20,
          width: 80,
          height: 40,
        },
      ]}
      onPress={onSelect}>
      <Animated.View
        style={[
          styles.labelWrapper,
          {transform: [{rotate: `${textRotation}deg`}]},
          focusStyle,
        ]}>
        <Text style={styles.label} numberOfLines={1}>
          {subcategory.name}
        </Text>
      </Animated.View>
    </Pressable>
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
  itemTouchable: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
  },
});

export default SubcategoryRing;
