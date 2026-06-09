import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, SPACING } from '../theme';

interface SafeContainerProps {
  children: React.ReactNode;
  edges?: {
    top?: boolean;
    bottom?: boolean;
    left?: boolean;
    right?: boolean;
  };
  background?: 'primary' | 'secondary' | 'transparent';
  style?: ViewStyle;
  testID?: string;
}

export function SafeContainer({
  children,
  edges = { top: false, bottom: false, left: false, right: false },
  background = 'transparent',
  style,
  testID,
}: SafeContainerProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const getBackgroundColor = (): string => {
    switch (background) {
      case 'primary':
        return colors.whiteBg;
      case 'secondary':
        return colors.panelBg;
      case 'transparent':
      default:
        return 'transparent';
    }
  };

  const getPadding = () => {
    const padding: any = {};

    if (edges.top) {
      padding.paddingTop = Math.max(insets.top, SPACING.md);
    }
    if (edges.bottom) {
      padding.paddingBottom = Math.max(insets.bottom, SPACING.md);
    }
    if (edges.left) {
      padding.paddingLeft = Math.max(insets.left, SPACING.md);
    }
    if (edges.right) {
      padding.paddingRight = Math.max(insets.right, SPACING.md);
    }

    return padding;
  };

  return (
    <View
      testID={testID}
      style={[
        styles.container,
        {
          backgroundColor: getBackgroundColor(),
          ...getPadding(),
        },
        style,
      ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
