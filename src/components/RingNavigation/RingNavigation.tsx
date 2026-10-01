/**
 * RingNavigation Component - 4-Level Hierarchy
 *
 * Supports 4 levels of navigation:
 * - Level 1: Main categories (colored pie segments)
 * - Level 2: Subcategories (outer ring) - appears on Level 1 click
 * - Level 3: Sub-subcategories (overlapping ring between L1 & L2) - appears on Level 2 click
 * - Level 4: Items (outer ring) - appears on Level 3 click
 *
 * Level 3 sits on top of and overlaps the circumference edges of both Level 1 and Level 2.
 */

import React, {useState, useCallback, useMemo} from 'react';
import {StyleSheet, Alert} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';

import {CATEGORIES, RING_CONFIG} from './data';
import {CenterButtonState} from './types';
import FloatingButton from './FloatingButton';
import RingLevel from './RingLevel';
import CenterButton from './CenterButton';
import GestureHints from './GestureHints';
import BackdropOverlay from './BackdropOverlay';

interface RingNavigationProps {
  onCategorySelect?: (path: string[]) => void;
}

const RingNavigation: React.FC<RingNavigationProps> = ({onCategorySelect}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([0, 0, 0, 0]);
  const [hasRotated, setHasRotated] = useState(false);

  // Get items for each level based on current selections
  const level1Items = useMemo(() =>
    CATEGORIES.map(c => ({id: c.id, name: c.name, icon: c.icon, color: c.color})),
    [],
  );

  const level2Items = useMemo(() => {
    const cat = CATEGORIES[selectedIndices[0]];
    return cat?.items?.map(i => ({id: i.id, name: i.name, icon: i.icon})) || [];
  }, [selectedIndices]);

  const level3Items = useMemo(() => {
    const cat = CATEGORIES[selectedIndices[0]];
    const sub = cat?.items?.[selectedIndices[1]];
    return sub?.items?.map(i => ({id: i.id, name: i.name, icon: i.icon})) || [];
  }, [selectedIndices]);

  const level4Items = useMemo(() => {
    const cat = CATEGORIES[selectedIndices[0]];
    const sub = cat?.items?.[selectedIndices[1]];
    const type = sub?.items?.[selectedIndices[2]];
    return type?.items?.map(i => ({id: i.id, name: i.name, icon: i.icon})) || [];
  }, [selectedIndices]);

  // Get current color based on Level 1 selection
  const currentColor = CATEGORIES[selectedIndices[0]]?.color || '#007AFF';

  // Get current item names for breadcrumb
  const getCurrentPath = useCallback(() => {
    const path: string[] = [];
    if (currentLevel >= 1) path.push(CATEGORIES[selectedIndices[0]]?.name || '');
    if (currentLevel >= 2) path.push(CATEGORIES[selectedIndices[0]]?.items?.[selectedIndices[1]]?.name || '');
    if (currentLevel >= 3) path.push(CATEGORIES[selectedIndices[0]]?.items?.[selectedIndices[1]]?.items?.[selectedIndices[2]]?.name || '');
    if (currentLevel >= 4) path.push(CATEGORIES[selectedIndices[0]]?.items?.[selectedIndices[1]]?.items?.[selectedIndices[2]]?.items?.[selectedIndices[3]]?.name || '');
    return path;
  }, [currentLevel, selectedIndices]);

  const getCenterButtonState = (): CenterButtonState => {
    if (currentLevel === 4) return 'level4';
    if (currentLevel === 3) return 'level3';
    if (currentLevel === 2) return 'level2';
    if (isOpen) return 'level1';
    return 'browse';
  };

  const handleOpenRing = useCallback(() => {
    setIsOpen(true);
    setCurrentLevel(1);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setCurrentLevel(1);
    setSelectedIndices([0, 0, 0, 0]);
    setHasRotated(false);
  }, []);

  const handleGoBack = useCallback(() => {
    if (currentLevel > 1) {
      setCurrentLevel(currentLevel - 1);
    } else {
      handleClose();
    }
  }, [currentLevel, handleClose]);

  // Handle selection at each level
  const handleLevel1Select = useCallback((index: number) => {
    setSelectedIndices(prev => [index, prev[1], prev[2], prev[3]]);
    setHasRotated(true);
  }, []);

  const handleLevel2Select = useCallback((index: number) => {
    setSelectedIndices(prev => [prev[0], index, prev[2], prev[3]]);
  }, []);

  const handleLevel3Select = useCallback((index: number) => {
    setSelectedIndices(prev => [prev[0], prev[1], index, prev[3]]);
  }, []);

  const handleLevel4Select = useCallback((index: number) => {
    setSelectedIndices(prev => [prev[0], prev[1], prev[2], index]);
  }, []);

  // Handle click to advance to next level
  const handleCenterPress = useCallback(() => {
    if (currentLevel < 4) {
      setCurrentLevel(currentLevel + 1);
    } else {
      // Final selection at Level 4
      const path = getCurrentPath();
      onCategorySelect?.(path);
      Alert.alert(
        'Selection Complete',
        path.join(' → '),
        [{text: 'OK', onPress: handleClose}],
      );
    }
  }, [currentLevel, getCurrentPath, onCategorySelect, handleClose]);

  const handleBackdropPress = useCallback(() => {
    handleGoBack();
  }, [handleGoBack]);

  // Calculate container size based on current level
  const containerSize = useMemo(() => {
    if (currentLevel >= 3) {
      return RING_CONFIG.LEVEL4_OUTER_RADIUS * 2 + 60;
    }
    if (currentLevel >= 2) {
      return RING_CONFIG.LEVEL2_OUTER_RADIUS * 2 + 60;
    }
    return RING_CONFIG.LEVEL1_OUTER_RADIUS * 2 + 60;
  }, [currentLevel]);

  const currentPathArray = getCurrentPath();
  const displayName = currentPathArray[currentPathArray.length - 1] || 'Browse';

  return (
    <GestureHandlerRootView style={styles.container}>
      <BackdropOverlay
        isVisible={isOpen}
        intensity={currentLevel > 1 ? 'heavy' : 'light'}
        onPress={handleBackdropPress}
      />

      <GestureHints
        isRingOpen={isOpen}
        hasRotated={hasRotated}
        onDismiss={() => {}}
      />

      {isOpen && (
        <Animated.View
          style={[
            styles.ringContainer,
            {
              width: containerSize,
              height: containerSize,
              marginLeft: -containerSize / 2,
              marginTop: -containerSize / 2,
            },
          ]}
          entering={FadeIn.duration(300)}
          exiting={FadeOut.duration(200)}>

          {/* Level 4 - Outermost when visible */}
          {currentLevel >= 4 && level4Items.length > 0 && (
            <RingLevel
              items={level4Items}
              innerRadius={RING_CONFIG.LEVEL4_INNER_RADIUS}
              outerRadius={RING_CONFIG.LEVEL4_OUTER_RADIUS}
              baseColor={currentColor}
              isVisible={true}
              selectedIndex={selectedIndices[3]}
              onSelect={handleLevel4Select}
              level={4}
              zIndex={4}
            />
          )}

          {/* Level 3 - Overlapping ring between Level 1 and Level 2 */}
          {currentLevel >= 3 && level3Items.length > 0 && (
            <RingLevel
              items={level3Items}
              innerRadius={RING_CONFIG.LEVEL3_INNER_RADIUS}
              outerRadius={RING_CONFIG.LEVEL3_OUTER_RADIUS}
              baseColor={currentColor}
              isVisible={true}
              selectedIndex={selectedIndices[2]}
              onSelect={handleLevel3Select}
              level={3}
              dimmed={currentLevel > 3}
              zIndex={3}
            />
          )}

          {/* Level 2 - Outer ring */}
          {currentLevel >= 2 && level2Items.length > 0 && (
            <RingLevel
              items={level2Items}
              innerRadius={RING_CONFIG.LEVEL2_INNER_RADIUS}
              outerRadius={RING_CONFIG.LEVEL2_OUTER_RADIUS}
              baseColor={currentColor}
              isVisible={true}
              selectedIndex={selectedIndices[1]}
              onSelect={handleLevel2Select}
              level={2}
              dimmed={currentLevel > 2}
              zIndex={2}
            />
          )}

          {/* Level 1 - Main categories (innermost) */}
          <RingLevel
            items={level1Items}
            innerRadius={RING_CONFIG.LEVEL1_INNER_RADIUS}
            outerRadius={RING_CONFIG.LEVEL1_OUTER_RADIUS}
            baseColor={currentColor}
            isVisible={true}
            selectedIndex={selectedIndices[0]}
            onSelect={handleLevel1Select}
            level={1}
            showCenter={true}
            dimmed={currentLevel > 1}
            zIndex={1}
          />

          {/* Center Button */}
          <CenterButton
            state={getCenterButtonState()}
            categoryName={displayName}
            categoryColor={currentColor}
            categoryIcon={CATEGORIES[selectedIndices[0]]?.icon}
            onSelect={handleCenterPress}
            onClose={handleGoBack}
          />
        </Animated.View>
      )}

      <FloatingButton isExpanded={isOpen} onPress={handleOpenRing} />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'box-none',
  },
  ringContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RingNavigation;
