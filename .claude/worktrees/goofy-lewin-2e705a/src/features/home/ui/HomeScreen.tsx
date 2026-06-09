import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ComingSoonApps } from './components/ComingSoonApps';
import { ClockWidget } from './components/ClockWidget';

interface HomeScreenProps {
  onOpenNotes: () => void;
  isNotesVisible: boolean;
}

export function HomeScreen({ onOpenNotes, isNotesVisible }: HomeScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <ClockWidget />
        </View>
        <View style={styles.content}>
          <ComingSoonApps />
        </View>
        {!isNotesVisible ? (
          <Pressable onPress={onOpenNotes} style={styles.floatingButton}>
            <Text style={styles.floatingButtonText}>Notes</Text>
          </Pressable>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4EFE5',
  },
  container: {
    flex: 1,
    //backgroundColor: '#F4EFE5',
    backgroundColor: 'rgb(0, 0, 0)',

    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  header: {
    alignItems: 'flex-start',
    paddingTop: 8,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 26,
    borderRadius: 999,
    backgroundColor: '#F4EFE5',
    paddingHorizontal: 20,
    paddingVertical: 14,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 8,
  },
  floatingButtonText: {
    color: '#1F1A16',
    fontSize: 14,
    fontWeight: '800',
  },
});
