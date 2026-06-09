import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';

import { useTheme, SPACING } from '../../../../shared/theme';
import { Text } from '../../../../shared/components';

interface QualitySelectorProps {
  qualities: { quality: string; label: string }[];
  selectedQuality: string;
  onSelectQuality: (quality: string) => void;
}

export function QualitySelector({
  qualities,
  selectedQuality,
  onSelectQuality,
}: QualitySelectorProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {qualities.map(q => (
        <Pressable
          key={q.quality}
          style={[
            styles.option,
            {
              backgroundColor:
                selectedQuality === q.quality
                  ? colors.buttonPrimary
                  : colors.border,
            },
          ]}
          onPress={() => onSelectQuality(q.quality)}
        >
          <Text
            variant="body"
            color={
              selectedQuality === q.quality
                ? colors.textPrimary
                : colors.textSecondary
            }
          >
            {q.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: SPACING.sm,
    marginVertical: SPACING.md,
  },
  option: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 6,
    alignItems: 'center',
  },
});
