import React from 'react';
import { TextInput, StyleSheet, TextInputProps, View, ViewStyle } from 'react-native';
import { useTheme, SPACING } from '../theme';
import { BORDER_RADIUS } from '../../core/constants';

interface InputProps extends Omit<TextInputProps, 'style'> {
  variant?: 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  containerStyle?: ViewStyle;
  testID?: string;
}

export function Input({
  variant = 'filled',
  size = 'md',
  placeholder = '',
  placeholderTextColor,
  containerStyle,
  testID,
  ...props
}: InputProps) {
  const { colors } = useTheme();

  const getPaddingValue = (): number => {
    switch (size) {
      case 'sm':
        return SPACING.sm;
      case 'lg':
        return SPACING.lg;
      case 'md':
      default:
        return SPACING.md;
    }
  };

  const getInputStyle = (): React.CSSProperties => {
    const padding = getPaddingValue();
    const baseStyle: any = {
      fontSize: 14,
      fontWeight: '500',
      lineHeight: 20,
      color: colors.textPrimary,
      paddingHorizontal: padding,
      paddingVertical: size === 'sm' ? SPACING.sm : SPACING.md,
    };

    if (variant === 'outlined') {
      baseStyle.borderWidth = 1;
      baseStyle.borderColor = colors.border;
      baseStyle.borderRadius = BORDER_RADIUS.md;
    } else {
      baseStyle.backgroundColor = colors.creamBg;
      baseStyle.borderRadius = BORDER_RADIUS.md;
    }

    return baseStyle;
  };

  return (
    <View style={containerStyle}>
      <TextInput
        {...props}
        testID={testID}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor || colors.textPlaceholder}
        style={[styles.input, getInputStyle()]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    // Base styles handled in getInputStyle
  },
});
