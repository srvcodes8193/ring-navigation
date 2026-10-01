/**
 * Network Context - Manages network connectivity state
 * Detects when user is online/offline and provides state to components
 */

import React, {createContext, useEffect, useState, ReactNode} from 'react';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';

interface NetworkContextType {
  isConnected: boolean | null;
  isInternetReachable: boolean | null;
  connectionType: string | null;
}

export const NetworkContext = createContext<NetworkContextType>({
  isConnected: null,
  isInternetReachable: null,
  connectionType: null,
});

interface NetworkProviderProps {
  children: ReactNode;
}

export const NetworkProvider: React.FC<NetworkProviderProps> = ({children}) => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isInternetReachable, setIsInternetReachable] = useState<
    boolean | null
  >(null);
  const [connectionType, setConnectionType] = useState<string | null>(null);

  useEffect(() => {
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setIsConnected(state.isConnected);
      setIsInternetReachable(state.isInternetReachable);
      setConnectionType(state.type);

      // Log to Reactotron in development
      if (__DEV__ && console.tron) {
        console.tron.display({
          name: 'NETWORK_STATE_CHANGED',
          value: {
            isConnected: state.isConnected,
            isInternetReachable: state.isInternetReachable,
            type: state.type,
          },
          preview: `Network: ${state.isConnected ? 'Connected' : 'Disconnected'} (${state.type})`,
        });
      }
    });

    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <NetworkContext.Provider
      value={{isConnected, isInternetReachable, connectionType}}>
      {children}
    </NetworkContext.Provider>
  );
};
