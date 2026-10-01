/**
 * Icon Component
 * Reusable icon wrapper using react-native-vector-icons
 * Supports multiple icon families with consistent API
 */

import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {StyleProp, ViewStyle} from 'react-native';

export type IconFamily =
  | 'material'
  | 'material-community'
  | 'font-awesome'
  | 'font-awesome5'
  | 'ionicons'
  | 'feather';

interface IconProps {
  name: string;
  family?: IconFamily;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

export const Icon: React.FC<IconProps> = ({
  name,
  family = 'material',
  size = 24,
  color = '#000000',
  style,
}) => {
  const iconProps = {
    name,
    size,
    color,
    style,
  };

  switch (family) {
    case 'material':
      return <MaterialIcons {...iconProps} />;
    case 'material-community':
      return <MaterialCommunityIcons {...iconProps} />;
    case 'font-awesome':
      return <FontAwesome {...iconProps} />;
    case 'font-awesome5':
      return <FontAwesome5 {...iconProps} />;
    case 'ionicons':
      return <Ionicons {...iconProps} />;
    case 'feather':
      return <Feather {...iconProps} />;
    default:
      return <MaterialIcons {...iconProps} />;
  }
};
