import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useTheme, SPACING } from '../../../../shared/theme';
import { Text } from '../../../../shared/components';
import { useCurrentDateTime } from '../../hooks/useCurrentDateTime';

export function ClockWidget() {
  const { dateLabel, timeLabel } = useCurrentDateTime();
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text variant="metadata" color={colors.textMuted}>{dateLabel}</Text>
      <Text variant="header" color={colors.textPrimary}>{timeLabel}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 14,
    elevation: 3,
  },
});
