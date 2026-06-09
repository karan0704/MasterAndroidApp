import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useTheme, SPACING } from '../../../../shared/theme';
import { Button, Text, Container } from '../../../../shared/components';
import type { Download } from '../../contracts/youtube.contract';

interface DownloadItemProps {
  download: Download;
  onPause?: () => void;
  onResume?: () => void;
  onCancel?: () => void;
  onRetry?: () => void;
}

export function DownloadItem({
  download,
  onPause,
  onResume,
  onCancel,
  onRetry,
}: DownloadItemProps) {
  const { colors } = useTheme();

  const downloadedBytes = download.downloaded_size ?? download.downloadedSize ?? 0;
  const totalBytes = download.total_size ?? download.totalSize ?? 0;

  const percentage =
    totalBytes && totalBytes > 0
      ? (downloadedBytes / totalBytes) * 100
      : 0;

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const formatSpeed = (bytesPerSec?: number) => {
    if (!bytesPerSec) return '-';
    return formatBytes(bytesPerSec) + '/s';
  };

  const formatEta = (seconds?: number) => {
    if (!seconds || seconds === Infinity) return '-';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}m ${secs}s`;
  };

  return (
    <Container padding="md" shadow="small" borderRadius="lg">
      {/* Title and Quality */}
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text variant="bodySemibold" numberOfLines={2}>
            {download.title}
          </Text>
          <Text variant="metadata" color={colors.textSecondary}>
            {download.quality.toUpperCase()}
          </Text>
        </View>

        {/* Status Badge */}
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor:
                download.status === 'completed'
                  ? '#22C55E'
                  : download.status === 'failed'
                    ? '#EF4444'
                    : download.status === 'downloading'
                      ? '#3B82F6'
                      : '#FACC15',
            },
          ]}
        >
          <Text
            variant="caption"
            color="#FFF"
            style={{ fontSize: 10, fontWeight: '600' }}
          >
            {download.status}
          </Text>
        </View>
      </View>

      {/* Progress Section (only for active downloads) */}
      {(download.status === 'downloading' || download.status === 'paused') && (
        <View style={styles.progressSection}>
          {/* Progress Bar */}
          <View
            style={[
              styles.progressBar,
              { backgroundColor: colors.border },
            ]}
          >
            <View
              style={[
                styles.progressFill,
                {
                  width: `${percentage}%`,
                  backgroundColor: download.status === 'paused' ? '#FACC15' : '#3B82F6',
                },
              ]}
            />
          </View>

          {/* Progress Details */}
          <View style={styles.progressDetails}>
            <Text variant="caption" color={colors.textSecondary}>
              {formatBytes(downloadedBytes)} / {formatBytes(totalBytes)}
            </Text>
            <Text variant="caption" color={colors.textSecondary}>
              {Math.round(percentage)}%
            </Text>
          </View>

          {/* Speed and ETA */}
          <View style={styles.speedEta}>
            <Text variant="caption" color={colors.textSecondary}>
              Speed: {formatSpeed(download.speed)}
            </Text>
            <Text variant="caption" color={colors.textSecondary}>
              ETA: {formatEta(download.eta)}
            </Text>
          </View>
        </View>
      )}

      {/* Error Message */}
      {download.status === 'failed' && download.errorMessage && (
        <View style={styles.errorSection}>
          <Text variant="caption" color="#EF4444">
            Error: {download.errorMessage}
          </Text>
        </View>
      )}

      {/* File Info */}
      {download.status === 'completed' && (
        <View style={styles.infoSection}>
          <Text variant="caption" color={colors.textSecondary}>
            Size: {formatBytes(download.file_size ?? download.fileSize ?? 0)}
          </Text>
          <Text variant="caption" color={colors.textSecondary}>
            Completed: {new Date(download.completed_at ?? download.completedAt ?? '').toLocaleDateString()}
          </Text>
        </View>
      )}

      {/* Action Buttons */}
      {download.status === 'downloading' && (
        <View style={styles.actions}>
          <Button
            onPress={onPause || (() => {})}
            title="Pause"
            variant="secondary"
            style={{ flex: 1 }}
          />
          <Button
            onPress={onCancel || (() => {})}
            title="Cancel"
            variant="secondary"
            style={{ flex: 1, marginLeft: SPACING.sm }}
          />
        </View>
      )}

      {download.status === 'paused' && (
        <View style={styles.actions}>
          <Button
            onPress={onResume || (() => {})}
            title="Resume"
            variant="primary"
            style={{ flex: 1 }}
          />
          <Button
            onPress={onCancel || (() => {})}
            title="Cancel"
            variant="secondary"
            style={{ flex: 1, marginLeft: SPACING.sm }}
          />
        </View>
      )}

      {download.status === 'failed' && (
        <View style={styles.actions}>
          <Button
            onPress={onRetry || (() => {})}
            title="Retry"
            variant="primary"
            style={{ flex: 1 }}
          />
        </View>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: SPACING.sm,
  },
  progressSection: {
    marginBottom: SPACING.md,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    marginBottom: SPACING.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  speedEta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  errorSection: {
    marginBottom: SPACING.md,
  },
  infoSection: {
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  actions: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.md,
  },
});
