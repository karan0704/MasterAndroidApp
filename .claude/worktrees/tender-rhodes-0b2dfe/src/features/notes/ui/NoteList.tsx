import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { useTheme, SPACING, BORDER_RADIUS } from '../../shared/theme';
import { Button, Text, Input } from '../../shared/components';
import {
  getDisplayTitle,
  NOTE_CATEGORY_COLORS,
  type NoteSummary,
} from '../contracts/note.contract';

interface NoteListProps {
  pinnedNotes: NoteSummary[];
  recentNotes: NoteSummary[];
  searchQuery: string;
  selectedNoteId: string | null;
  isLoading: boolean;
  onCreateNote: () => void;
  onOpenNote: (noteId: string) => void;
  onSearchQueryChange: (value: string) => void;
}

function formatTimestamp(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
}

function renderBadges(note: NoteSummary) {
  const badges: string[] = [];

  if (note.isPinned) {
    badges.push('Pinned');
  }

  if (note.hasReminder) {
    badges.push('Reminder');
  }

  if (note.hasAttachment) {
    badges.push('Attachment');
  }

  return badges;
}

function NoteSection({
  title,
  notes,
  selectedNoteId,
  onOpenNote,
  colors,
}: {
  title: string;
  notes: NoteSummary[];
  selectedNoteId: string | null;
  onOpenNote: (noteId: string) => void;
  colors: any;
}) {
  if (notes.length === 0) {
    return null;
  }

  return (
    <View style={styles.section}>
      <Text variant="kicker" color={colors.textSecondary} style={styles.sectionTitle}>
        {title}
      </Text>
      {notes.map(note => {
        const isSelected = note.id === selectedNoteId;
        const badges = renderBadges(note);

        return (
          <Pressable
            key={note.id}
            onPress={() => onOpenNote(note.id)}
            style={[
              styles.noteCard,
              { borderColor: colors.border },
              isSelected ? { borderColor: colors.textPrimary } : null,
            ]}>
            <View
              style={[
                styles.categoryStripe,
                { backgroundColor: NOTE_CATEGORY_COLORS[note.category] },
              ]}
            />
            <View style={styles.noteBody}>
              <View style={styles.noteHeaderRow}>
                <Text variant="bodySemibold" color={colors.textPrimary} style={styles.noteTitle}>
                  {getDisplayTitle(note)}
                </Text>
                <Text variant="caption" color={colors.textSecondary} style={styles.noteCategoryText}>
                  {note.category}
                </Text>
              </View>
              <Text variant="body" color={colors.textTertiary} numberOfLines={2} style={styles.notePreview}>
                {note.previewText || 'Start writing your note in markdown.'}
              </Text>
              <Text variant="caption" color={colors.textMuted} style={styles.noteTime}>
                Updated {formatTimestamp(note.updatedAt)}
              </Text>
              {badges.length > 0 ? (
                <View style={styles.badgeRow}>
                  {badges.map(badge => (
                    <View key={badge} style={[styles.badge, { backgroundColor: colors.buttonSecondary }]}>
                      <Text variant="caption" color={colors.textSecondary}>{badge}</Text>
                    </View>
                  ))}
                </View>
              ) : null}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

export function NoteList({
  pinnedNotes,
  recentNotes,
  searchQuery,
  selectedNoteId,
  isLoading,
  onCreateNote,
  onOpenNote,
  onSearchQueryChange,
}: NoteListProps) {
  const { colors } = useTheme();
  const hasNotes = pinnedNotes.length > 0 || recentNotes.length > 0;

  return (
    <View style={styles.container}>
      <View style={[styles.actionsRow, { gap: SPACING.sm }]}>
        <Input
          placeholder="Search notes"
          value={searchQuery}
          onChangeText={onSearchQueryChange}
          style={styles.searchInput}
        />
        <Button
          onPress={onCreateNote}
          title="New"
          variant="primary"
        />
      </View>

      {isLoading ? (
        <View style={styles.centerState}>
          <Text variant="subheader" color={colors.textPrimary}>
            Loading notes...
          </Text>
        </View>
      ) : hasNotes ? (
        <ScrollView
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}>
          <NoteSection
            title="Pinned"
            notes={pinnedNotes}
            selectedNoteId={selectedNoteId}
            onOpenNote={onOpenNote}
            colors={colors}
          />
          <NoteSection
            title={searchQuery.trim() ? 'Results' : 'Recent'}
            notes={recentNotes}
            selectedNoteId={selectedNoteId}
            onOpenNote={onOpenNote}
            colors={colors}
          />
        </ScrollView>
      ) : (
        <View style={styles.centerState}>
          <Text variant="subheader" color={colors.textPrimary} style={styles.stateTitle}>
            No notes yet
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.stateText}>
            Create your first markdown note and it will be stored on the device.
          </Text>
          <Button
            onPress={onCreateNote}
            title="Create note"
            variant="primary"
            style={styles.emptyCreateButton}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  searchInput: {
    flex: 1,
    minHeight: 46,
  },
  listContent: {
    paddingBottom: SPACING.lg,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    marginBottom: SPACING.sm,
  },
  noteCard: {
    flexDirection: 'row',
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
    overflow: 'hidden',
    borderWidth: 1,
  },
  categoryStripe: {
    width: 8,
  },
  noteBody: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  noteHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: SPACING.md,
    marginBottom: SPACING.sm,
  },
  noteTitle: {
    flex: 1,
    textTransform: 'capitalize',
  },
  noteCategoryText: {
    textTransform: 'capitalize',
  },
  notePreview: {
    marginBottom: SPACING.md,
  },
  noteTime: {},
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginTop: SPACING.md,
  },
  badge: {
    borderRadius: BORDER_RADIUS.pill,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  centerState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xxl,
  },
  stateTitle: {
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  stateText: {
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  emptyCreateButton: {},
});
