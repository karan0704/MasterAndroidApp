import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useCurrentDateTime } from '../../hooks/useCurrentDateTime';

export function ClockWidget() {
  const { dateLabel, timeLabel } = useCurrentDateTime();

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>{dateLabel}</Text>
      <Text style={styles.timeText}>{timeLabel}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // borderRadius: 18,
    // backgroundColor: '#FFF9EF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    // shadowColor: '#70523A',
    shadowOffset: { width: 0, height: 6 },
    // shadowOpacity: 0.1,
    shadowRadius: 14,
    elevation: 3,
  },
  dateText: {
    // color: '#6A5A4B',
    color: '#F4EFE5',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  timeText: {
    // color: '#1F1A16',
    color: '#F4EFE5',
    fontSize: 26,
    fontWeight: '700',
  },
});
