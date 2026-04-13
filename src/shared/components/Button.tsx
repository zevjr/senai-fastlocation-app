import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors } from '../colors';
import { metrics } from '../metrics';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

interface ButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: ButtonVariant;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const getButtonStyle = (variant: ButtonVariant) => {
  switch (variant) {
    case 'secondary':
      return styles.secondary;
    case 'outline':
      return styles.outline;
    default:
      return styles.primary;
  }
};

const getTextStyle = (variant: ButtonVariant) => {
  switch (variant) {
    case 'secondary':
      return styles.secondaryText;
    case 'outline':
      return styles.outlineText;
    default:
      return styles.primaryText;
  }
};

const getIndicatorColor = (variant: ButtonVariant): string => {
  return variant === 'outline' ? colors.primary : colors.white;
};

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  style,
  textStyle,
}) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[styles.base, getButtonStyle(variant), isDisabled && styles.disabled, style]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={getIndicatorColor(variant)} />
      ) : (
        <Text style={[styles.text, getTextStyle(variant), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    height: metrics.buttonHeight,
    borderRadius: metrics.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: metrics.basePadding,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: colors.white,
  },
  secondaryText: {
    color: colors.white,
  },
  outlineText: {
    color: colors.primary,
  },
});
