import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet, TextStyle } from 'react-native';
import { useTheme, TYPOGRAPHY } from '../theme';

export type TextVariant = 'header' | 'subheader' | 'kicker' | 'body' | 'bodySemibold' | 'metadata' | 'caption' | 'button' | 'code';

interface TextProps extends Omit<RNTextProps, 'style'> {
  variant?: TextVariant;
  color?: string;
  style?: TextStyle;
  children: React.ReactNode;
}

export function Text({
  variant = 'body',
  color,
  style,
  children,
  ...props
}: TextProps) {
  const { colors } = useTheme();

  const getTypographyStyle = (): TextStyle => {
    switch (variant) {
      case 'header':
        return TYPOGRAPHY.header;
      case 'subheader':
        return TYPOGRAPHY.subheader;
      case 'kicker':
        return TYPOGRAPHY.kicker;
      case 'bodySemibold':
        return TYPOGRAPHY.bodySemibold;
      case 'metadata':
        return TYPOGRAPHY.metadata;
      case 'caption':
        return TYPOGRAPHY.caption;
      case 'button':
        return TYPOGRAPHY.button;
      case 'code':
        return TYPOGRAPHY.code;
      case 'body':
      default:
        return TYPOGRAPHY.body;
    }
  };

  const typography = getTypographyStyle();
  const textColor = color || (
    variant === 'kicker' ? colors.textSecondary : colors.textPrimary
  );

  return (
    <RNText
      {...props}
      style={[
        typography,
        { color: textColor },
        style,
      ]}>
      {children}
    </RNText>
  );
}
