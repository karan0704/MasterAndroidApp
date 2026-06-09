import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

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
}: {
  title: string;
  notes: NoteSummary[];
  selectedNoteId: string | null;
  onOpenNote: (noteId: string) => void;
}) {
  if (notes.length === 0) {
    return null;
  }

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {notes.map(note => {
        const isSelected = note.id === selectedNoteId;
        const badges = renderBadges(note);

        return (
          <Pressable
            key={note.id}
            onPress={() => onOpenNote(note.id)}
            style={[
              styles.noteCard,
              isSelected ? styles.noteCardSelected : null,
            ]}>
            <View
              style={[
                styles.categoryStripe,
                { backgroundColor: NOTE_CATEGORY_COLORS[note.category] },
              ]}
            />
            <View style={styles.noteBody}>
              <View style={styles.noteHeaderRow}>
                <Text style={styles.noteTitle}>{getDisplayTitle(note)}</Text>
                <Text style={styles.noteCategoryText}>{note.category}</Text>
              </View>
              <Text style={styles.notePreview} numberOfLines={2}>
                {note.previewText || 'Start writing your note in markdown.'}
              </Text>
              <Text style={styles.noteTime}>
                Updated {formatTimestamp(note.updatedAt)}
              </Text>
              {badges.length > 0 ? (
                <View style={styles.badgeRow}>
                  {badges.map(badge => (
                    <View key={badge} style={styles.badge}>
                      <Text style={styles.badgeText}>{badge}</Text>
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
  const hasNotes = pinnedNotes.length > 0 || recentNotes.length > 0;

  return (
    <View style={styles.container}>
      <View style={styles.actionsRow}>
        <TextInput
          placeholder="Search notes"
          placeholderTextColor="#7D746A"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={onSearchQueryChange}
        />
        <Pressable onPress={onCreateNote} style={styles.createButton}>
          <Text style={styles.createButtonText}>New</Text>
        </Pressable>
      </View>

      {isLoading ? (
        <View style={styles.centerState}>
          <Text style={styles.stateTitle}>Loading notes...</Text>
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
          />
          <NoteSection
            title={searchQuery.trim() ? 'Results' : 'Recent'}
            notes={recentNotes}
            selectedNoteId={selectedNoteId}
            onOpenNote={onOpenNote}
          />
        </ScrollView>
      ) : (
        <View style={styles.centerState}>
          <Text style={styles.stateTitle}>No notes yet</Text>
          <Text style={styles.stateText}>
            Create your first markdown note and it will be stored on the device.
          </Text>
          <Pressable onPress={onCreateNote} style={styles.emptyCreateButton}>
            <Text style={styles.emptyCreateButtonText}>Create note</Text>
          </Pressable>
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
    gap: 10,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    minHeight: 46,
    borderRadius: 16,
    backgroundColor: '#F5EBDD',
    paddingHorizontal: 16,
    color: '#201A14',
    fontSize: 15,
  },
  createButton: {
    minWidth: 64,
    minHeight: 46,
    borderRadius: 16,
    backgroundColor: '#1F1A16',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  createButtonText: {
    color: '#FFF7E8',
    fontSize: 14,
    fontWeight: '700',
  },
  listContent: {
    paddingBottom: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#7B5A3C',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  noteCard: {
    flexDirection: 'row',
    borderRadius: 20,
    backgroundColor: '#FFF9EF',
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E7D8C3',
  },
  noteCardSelected: {
    borderColor: '#1F1A16',
  },
  categoryStripe: {
    width: 8,
  },
  noteBody: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  noteHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  noteTitle: {
    flex: 1,
    color: '#201A14',
    fontSize: 16,
    fontWeight: '700',
  },
  noteCategoryText: {
    color: '#7B5A3C',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  notePreview: {
    color: '#5A4E41',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  noteTime: {
    color: '#8C7F70',
    fontSize: 12,
    fontWeight: '500',
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
  },
  badge: {
    borderRadius: 999,
    backgroundColor: '#F3E3CF',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    color: '#7B5A3C',
    fontSize: 11,
    fontWeight: '700',
  },
  centerState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  stateTitle: {
    color: '#201A14',
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 10,
  },
  stateText: {
    color: '#6D6154',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 18,
  },
  emptyCreateButton: {
    borderRadius: 999,
    backgroundColor: '#201A14',
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  emptyCreateButtonText: {
    color: '#FFF7E8',
    fontSize: 14,
    fontWeight: '700',
  },
});
