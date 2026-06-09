import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme, SPACING, SHADOWS } from '../../../shared/theme';
import { Button, Text } from '../../../shared/components';
import { ComingSoonApps } from './components/ComingSoonApps';
import { ClockWidget } from './components/ClockWidget';

interface HomeScreenProps {
  onOpenNotes: () => void;
  isNotesVisible: boolean;
}

export function HomeScreen({ onOpenNotes, isNotesVisible }: HomeScreenProps) {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.lightBg }]} edges={['top', 'left', 'right']}>
      <View style={[styles.container, { backgroundColor: colors.lightBg }]}>
        <View style={styles.header}>
          <ClockWidget />
        </View>
        <View style={styles.content}>
          <ComingSoonApps />
        </View>
        {!isNotesVisible ? (
          <View style={[styles.floatingButton, { backgroundColor: colors.lightBg }, SHADOWS.medium]}>
            <Button
              onPress={onOpenNotes}
              title="Notes"
              variant="primary"
            />
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  header: {
    alignItems: 'flex-start',
    paddingTop: SPACING.sm,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingButton: {
    position: 'absolute',
    right: SPACING.lg,
    bottom: SPACING.xl,
    borderRadius: 999,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
});
