import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const metrics = {
  screenWidth: width,
  screenHeight: height,
  basePadding: 16,
  smallPadding: 8,
  largePadding: 24,
  baseMargin: 16,
  smallMargin: 8,
  largeMargin: 24,
  borderRadius: 8,
  borderRadiusLarge: 16,
  iconSize: 24,
  buttonHeight: 48,
  inputHeight: 48,
} as const;
