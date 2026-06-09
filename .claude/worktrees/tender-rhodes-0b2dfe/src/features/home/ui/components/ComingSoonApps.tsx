import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useTheme, SPACING, SHADOWS } from '../../../../shared/theme';
import { Text, Container } from '../../../../shared/components';

export function ComingSoonApps() {
  const { colors } = useTheme();

  return (
    <Container
      padding="xl"
      background="primary"
      borderRadius="xxl"
      shadow="medium"
      style={styles.card}>
      <Text variant="kicker" color={colors.textSecondary} style={styles.kicker}>
        Master Android App
      </Text>
      <Text variant="header" color={colors.textPrimary} style={styles.title}>
        Coming Soon Apps
      </Text>
      <Text
        variant="body"
        color={colors.textSecondary}
        style={styles.description}>
        Phase 1 validates the home module, scalable structure, and future app
        expansion points.
      </Text>
    </Container>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
  },
  kicker: {
    marginBottom: SPACING.sm,
  },
  title: {
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  description: {
    textAlign: 'center',
  },
});
