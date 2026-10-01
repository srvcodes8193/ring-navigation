/**
 * Ring Navigation Component Exports
 *
 * A circular, gesture-driven category navigation for mobile e-commerce.
 *
 * Usage:
 * ```tsx
 * import {RingNavigation} from './components/RingNavigation';
 *
 * function App() {
 *   return (
 *     <View style={{flex: 1}}>
 *       <YourContent />
 *       <RingNavigation
 *         onCategorySelect={(categoryId, subcategoryId) => {
 *           // Navigate to category/subcategory
 *         }}
 *       />
 *     </View>
 *   );
 * }
 * ```
 */

export {default as RingNavigation} from './RingNavigation';
export * from './types';
export {CATEGORIES, RING_CONFIG} from './data';
