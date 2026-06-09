import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme, SPACING } from '../../../shared/theme';
import { SHADOWS } from '../../../core/constants';
import { Button, Text, Container } from '../../../shared/components';
import { useYoutubeDownloads } from '../hooks/useYoutubeDownloads';
import { useDownloadsStore, downloadsStore } from '../store/downloadsStore';
import { DownloadItem } from './components/DownloadItem';
import { QualitySelector } from './components/QualitySelector';

interface DownloadsScreenProps {
  visible: boolean;
  onClose: () => void;
}

export function DownloadsScreen({ visible, onClose }: DownloadsScreenProps) {
  const { colors } = useTheme();
  const panelState = useDownloadsStore();
  const downloads = useYoutubeDownloads();

  const [urlInput, setUrlInput] = useState('');
  const [selectedQuality, setSelectedQuality] = useState<string>('fhd');

  if (!visible) {
    return null;
  }

  const handleFetchMetadata = async () => {
    if (!urlInput.trim()) {
      downloads.setError('Please enter a URL');
      return;
    }

    await downloads.fetchVideoMetadata(urlInput);
  };

  const handleStartDownload = async () => {
    await downloads.startDownload(selectedQuality as any);
    setUrlInput('');
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.lightBg }]}
      edges={['top', 'left', 'right', 'bottom']}
    >
      <View style={[styles.container, { backgroundColor: colors.lightBg }]}>
        {/* Header */}
        <View style={styles.header}>
          <Text variant="header">Downloads</Text>
          <Button onPress={onClose} title="Close" variant="secondary" />
        </View>

        {/* Error Message */}
        {downloads.error && (
          <Container padding="md" style={{ backgroundColor: colors.error }}>
            <Text variant="body" color={colors.textPrimary}>
              {downloads.error}
            </Text>
          </Container>
        )}

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* URL Input Section */}
          <Container padding="md" shadow="small" borderRadius="lg">
            <Text variant="bodySemibold" style={styles.sectionTitle}>
              Paste YouTube URL
            </Text>

            <TextInput
              style={[
                styles.input,
                { borderColor: colors.border, color: colors.textPrimary },
              ]}
              placeholder="Enter YouTube URL"
              placeholderTextColor={colors.textSecondary}
              value={urlInput}
              onChangeText={setUrlInput}
              editable={!downloads.isLoading}
              multiline
            />

            <Button
              onPress={handleFetchMetadata}
              title={downloads.isLoading ? 'Fetching...' : 'Fetch Video'}
              variant="primary"
              disabled={downloads.isLoading}
            />
          </Container>

          {/* Video Metadata */}
          {downloads.videoMetadata && (
            <Container padding="md" shadow="small" borderRadius="lg" style={styles.mt}>
              <Text variant="bodySemibold">{downloads.videoMetadata.title}</Text>
              <Text variant="metadata" color={colors.textSecondary} style={styles.mt}>
                Duration: {Math.floor(downloads.videoMetadata.duration / 60)}m
              </Text>

              {downloads.availableQualities.length > 0 && (
                <>
                  <Text variant="bodySemibold" style={styles.mt}>
                    Select Quality:
                  </Text>
                  <QualitySelector
                    qualities={downloads.availableQualities}
                    selectedQuality={selectedQuality}
                    onSelectQuality={setSelectedQuality}
                  />

                  <Button
                    onPress={handleStartDownload}
                    title="Start Download"
                    variant="primary"
                    style={styles.mt}
                  />
                </>
              )}
            </Container>
          )}

          {/* Tabs */}
          <View style={styles.tabs}>
            {(['active', 'completed', 'failed'] as const).map(tab => (
              <Button
                key={tab}
                onPress={() => downloadsStore.selectTab(tab)}
                title={`${tab} (${
                  tab === 'active'
                    ? downloads.activeDownloads.length
                    : tab === 'completed'
                      ? downloads.completedDownloads.length
                      : downloads.failedDownloads.length
                })`}
                variant={panelState.selectedTab === tab ? 'primary' : 'secondary'}
                style={styles.tabButton}
              />
            ))}
          </View>

          {/* Active Downloads */}
          {panelState.selectedTab === 'active' && (
            <View style={styles.downloadsList}>
              {downloads.activeDownloads.length === 0 ? (
                <Text variant="body" color={colors.textSecondary} style={styles.emptyText}>
                  No active downloads
                </Text>
              ) : (
                downloads.activeDownloads.map(download => (
                  <DownloadItem
                    key={download.id}
                    download={download}
                    onPause={() => downloads.pauseDownload(download.id)}
                    onResume={() => downloads.resumeDownload(download.id)}
                    onCancel={() => downloads.cancelDownload(download.id)}
                  />
                ))
              )}
            </View>
          )}

          {/* Completed Downloads */}
          {panelState.selectedTab === 'completed' && (
            <View style={styles.downloadsList}>
              {downloads.completedDownloads.length === 0 ? (
                <Text variant="body" color={colors.textSecondary} style={styles.emptyText}>
                  No completed downloads
                </Text>
              ) : (
                downloads.completedDownloads.map(download => (
                  <DownloadItem key={download.id} download={download} />
                ))
              )}
            </View>
          )}

          {/* Failed Downloads */}
          {panelState.selectedTab === 'failed' && (
            <View style={styles.downloadsList}>
              {downloads.failedDownloads.length === 0 ? (
                <Text variant="body" color={colors.textSecondary} style={styles.emptyText}>
                  No failed downloads
                </Text>
              ) : (
                downloads.failedDownloads.map(download => (
                  <DownloadItem
                    key={download.id}
                    download={download}
                    onRetry={() => downloads.resumeDownload(download.id)}
                  />
                ))
              )}
            </View>
          )}
        </ScrollView>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  content: {
    flex: 1,
    paddingVertical: SPACING.md,
  },
  sectionTitle: {
    marginBottom: SPACING.md,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  mt: {
    marginTop: SPACING.md,
  },
  tabs: {
    flexDirection: 'row',
    marginVertical: SPACING.lg,
    gap: SPACING.sm,
  },
  tabButton: {
    flex: 1,
  },
  downloadsList: {
    gap: SPACING.md,
  },
  emptyText: {
    textAlign: 'center',
    paddingVertical: SPACING.xl,
  },
});
