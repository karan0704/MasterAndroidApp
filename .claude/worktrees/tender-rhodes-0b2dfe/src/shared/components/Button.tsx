import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle, TextStyle } from 'react-native';
import { useTheme, SPACING, BORDER_RADIUS } from '../theme';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: ButtonVariant;
  disabled?: boolean;
  style?: ViewStyle;
  testID?: string;
}

export function Button({
  onPress,
  title,
  variant = 'secondary',
  disabled = false,
  style,
  testID,
}: ButtonProps) {
  const { colors } = useTheme();

  const getButtonStyles = (): { button: ViewStyle; text: TextStyle } => {
    switch (variant) {
      case 'primary':
        return {
          button: {
            backgroundColor: colors.buttonPrimary,
          },
          text: {
            color: colors.buttonPrimaryText,
          },
        };
      case 'tertiary':
        return {
          button: {
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: colors.border,
          },
          text: {
            color: colors.textPrimary,
          },
        };
      case 'secondary':
      default:
        return {
          button: {
            backgroundColor: colors.buttonSecondary,
          },
          text: {
            color: colors.buttonSecondaryText,
          },
        };
    }
  };

  const { button: buttonStyle, text: textStyle } = getButtonStyles();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      testID={testID}
      style={({ pressed }) => [
        styles.button,
        buttonStyle,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}>
      <Text style={[styles.text, textStyle]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: BORDER_RADIUS.pill,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
  },
  pressed: {
    opacity: 0.7,
  },
  disabled: {
    opacity: 0.5,
  },
});
