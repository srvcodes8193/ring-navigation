/**
 * Type definitions for the Ring Navigation component
 * Supports 4 levels of hierarchy
 */

// Level 4 - Deepest level (e.g., Product types)
export interface Level4Item {
  id: string;
  name: string;
  icon: string;
}

// Level 3 - (e.g., Sub-subcategories)
export interface Level3Item {
  id: string;
  name: string;
  icon: string;
  items: Level4Item[];
}

// Level 2 - Subcategories
export interface Level2Item {
  id: string;
  name: string;
  icon: string;
  items: Level3Item[];
}

// Level 1 - Main categories
export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  items: Level2Item[];
}

// Legacy alias for backwards compatibility
export type Subcategory = Level2Item;

export interface RingNavigationState {
  isOpen: boolean;
  currentLevel: number; // 1, 2, 3, or 4
  selectedIndices: number[]; // [level1Index, level2Index, level3Index, level4Index]
}

export type CenterButtonState = 'browse' | 'level1' | 'level2' | 'level3' | 'level4';

// Ring level configuration
export interface RingLevelConfig {
  level: number;
  innerRadius: number;
  outerRadius: number;
  itemSize: number;
}
