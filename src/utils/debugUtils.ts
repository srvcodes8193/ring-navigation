/**
 * Debugging utilities for development
 */

/**
 * Enhanced console logger that works with Reactotron
 */
export const logger = {
  log: (...args: any[]) => {
    if (__DEV__) {
      if (console.tron) {
        console.tron.log(...args);
      } else {
        console.log(...args);
      }
    }
  },

  warn: (...args: any[]) => {
    if (__DEV__) {
      if (console.tron) {
        console.tron.warn(...args);
      } else {
        console.warn(...args);
      }
    }
  },

  error: (...args: any[]) => {
    if (__DEV__) {
      if (console.tron) {
        console.tron.error(...args);
      } else {
        console.error(...args);
      }
    }
  },

  display: (config: {name: string; value: any; preview?: string}) => {
    if (__DEV__ && console.tron) {
      console.tron.display(config);
    }
  },
};

/**
 * Measure performance of a function
 */
export const measurePerformance = <T extends (...args: any[]) => any>(
  fn: T,
  label: string,
): T => {
  return ((...args: any[]) => {
    const start = performance.now();
    const result = fn(...args);
    const end = performance.now();
    const duration = end - start;

    logger.log(`⏱️ ${label} took ${duration.toFixed(2)}ms`);

    return result;
  }) as T;
};

/**
 * Async version of measurePerformance
 */
export const measurePerformanceAsync = <T extends (...args: any[]) => Promise<any>>(
  fn: T,
  label: string,
): T => {
  return (async (...args: any[]) => {
    const start = performance.now();
    const result = await fn(...args);
    const end = performance.now();
    const duration = end - start;

    logger.log(`⏱️ ${label} took ${duration.toFixed(2)}ms`);

    return result;
  }) as T;
};

/**
 * Log component render count
 */
export const useRenderCount = (componentName: string) => {
  if (__DEV__) {
    const renderCount = React.useRef(0);
    React.useEffect(() => {
      renderCount.current += 1;
      logger.log(`🔄 ${componentName} rendered ${renderCount.current} times`);
    });
  }
};

/**
 * Log when component mounts and unmounts
 */
export const useLifecycleLogger = (componentName: string) => {
  if (__DEV__) {
    React.useEffect(() => {
      logger.log(`✅ ${componentName} mounted`);
      return () => {
        logger.log(`❌ ${componentName} unmounted`);
      };
    }, []);
  }
};

/**
 * Log when props change
 */
export const usePropsLogger = (componentName: string, props: any) => {
  if (__DEV__) {
    React.useEffect(() => {
      logger.log(`📦 ${componentName} props updated:`, props);
    }, [props]);
  }
};

// Import React for hooks
import React from 'react';
