import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme, SPACING } from '../../../shared/theme';
import { SHADOWS } from '../../../core/constants';
import { Button, Text } from '../../../shared/components';
import { ComingSoonApps } from './components/ComingSoonApps';
import { ClockWidget } from './components/ClockWidget';

interface HomeScreenProps {
  onOpenNotes: () => void;
  onOpenDownloads: () => void;
  isNotesVisible: boolean;
  isDownloadsVisible: boolean;
}

export function HomeScreen({ onOpenNotes, onOpenDownloads, isNotesVisible, isDownloadsVisible }: HomeScreenProps) {
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
        {!isNotesVisible && !isDownloadsVisible ? (
          <View style={[styles.floatingButtonContainer, { backgroundColor: colors.lightBg }, SHADOWS.medium]}>
            <View style={styles.buttonGroup}>
              <Button
                onPress={onOpenNotes}
                title="Notes"
                variant="primary"
                style={{ flex: 1 }}
              />
              <Button
                onPress={onOpenDownloads}
                title="Downloads"
                variant="primary"
                style={{ flex: 1, marginLeft: SPACING.sm }}
              />
            </View>
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
  floatingButtonContainer: {
    position: 'absolute',
    right: SPACING.lg,
    bottom: SPACING.xl,
    borderRadius: 12,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
});
