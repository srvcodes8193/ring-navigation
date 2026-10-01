/**
 * Toast Provider
 * Global toast/snackbar management system
 * Provides a hook to show toasts from anywhere in the app
 */

import React, {createContext, useContext, useState, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {Toast, ToastType, ToastPosition} from './Toast';

interface ToastConfig {
  id: string;
  message: string;
  type?: ToastType;
  position?: ToastPosition;
  duration?: number;
  actionText?: string;
  onActionPress?: () => void;
}

interface ToastContextType {
  showToast: (config: Omit<ToastConfig, 'id'>) => void;
  hideToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({children}) => {
  const [toasts, setToasts] = useState<ToastConfig[]>([]);

  const showToast = useCallback((config: Omit<ToastConfig, 'id'>) => {
    const id = Date.now().toString();
    const newToast: ToastConfig = {
      id,
      ...config,
    };

    setToasts(prev => {
      // Only allow one toast at a time (remove existing toasts at same position)
      const filtered = prev.filter(
        t => t.position !== (config.position || 'bottom'),
      );
      return [...filtered, newToast];
    });
  }, []);

  const hideToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{showToast, hideToast}}>
      {children}
      <View style={styles.toastContainer} pointerEvents="box-none">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            position={toast.position}
            duration={toast.duration}
            actionText={toast.actionText}
            onActionPress={toast.onActionPress}
            onHide={() => hideToast(toast.id)}
          />
        ))}
      </View>
    </ToastContext.Provider>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },
});
