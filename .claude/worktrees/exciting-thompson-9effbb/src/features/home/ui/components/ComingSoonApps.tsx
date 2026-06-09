import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function ComingSoonApps() {
  return (
    <View style={styles.card}>
      <Text style={styles.kicker}>Master Android App</Text>
      <Text style={styles.title}>Coming Soon Apps</Text>
      <Text style={styles.description}>
        Phase 1 validates the home module, scalable structure, and future app
        expansion points.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    maxWidth: 320,
    borderRadius: 28,
    backgroundColor: '#FFFDF8',
    paddingHorizontal: 24,
    paddingVertical: 28,
    alignItems: 'center',
    shadowColor: '#70523A',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 4,
  },
  kicker: {
    color: '#A46F3E',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  title: {
    color: '#1F1A16',
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    color: '#6A5A4B',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
});
