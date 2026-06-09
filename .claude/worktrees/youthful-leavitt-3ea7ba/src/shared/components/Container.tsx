import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme, SPACING } from '../theme';
import { BORDER_RADIUS, SHADOWS } from '../../core/constants';

interface ContainerProps {
  children: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: 'primary' | 'secondary' | 'tertiary' | 'transparent';
  borderRadius?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'pill';
  shadow?: 'none' | 'small' | 'medium' | 'large';
  style?: ViewStyle;
  testID?: string;
}

export function Container({
  children,
  padding = 'md',
  background = 'secondary',
  borderRadius = 'lg',
  shadow = 'none',
  style,
  testID,
}: ContainerProps) {
  const { colors } = useTheme();

  const getPaddingValue = (): number => {
    switch (padding) {
      case 'none':
        return 0;
      case 'sm':
        return SPACING.sm;
      case 'lg':
        return SPACING.lg;
      case 'xl':
        return SPACING.xl;
      case 'md':
      default:
        return SPACING.md;
    }
  };

  const getBackgroundColor = (): string => {
    switch (background) {
      case 'primary':
        return colors.whiteBg;
      case 'tertiary':
        return colors.creamBg;
      case 'transparent':
        return 'transparent';
      case 'secondary':
      default:
        return colors.panelBg;
    }
  };

  const getBorderRadius = (): number => {
    switch (borderRadius) {
      case 'sm':
        return BORDER_RADIUS.sm;
      case 'md':
        return BORDER_RADIUS.md;
      case 'lg':
        return BORDER_RADIUS.lg;
      case 'xl':
        return BORDER_RADIUS.xl;
      case 'pill':
        return BORDER_RADIUS.pill;
      case 'xxl':
      default:
        return BORDER_RADIUS.xxl;
    }
  };

  const getShadowStyle = () => {
    if (shadow === 'none') return {};
    return SHADOWS[shadow];
  };

  return (
    <View
      testID={testID}
      style={[
        styles.container,
        {
          padding: getPaddingValue(),
          backgroundColor: getBackgroundColor(),
          borderRadius: getBorderRadius(),
        },
        getShadowStyle(),
        style,
      ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});
