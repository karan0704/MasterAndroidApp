import React from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

import type { NoteDetail, NoteSummary, NotesViewMode } from '../contracts/note.contract';
import { NoteEditor } from './NoteEditor';
import { NoteList } from './NoteList';

interface NotesScreenProps {
  visible: boolean;
  expanded: boolean;
  activeView: NotesViewMode;
  activeNote: NoteDetail | null;
  pinnedNotes: NoteSummary[];
  recentNotes: NoteSummary[];
  searchQuery: string;
  selectedNoteId: string | null;
  isLoading: boolean;
  isSaving: boolean;
  errorMessage: string | null;
  onBackToList: () => void;
  onChangeNote: (changes: Partial<NoteDetail>) => void;
  onClose: () => void;
  onCreateNote: () => void;
  onOpenNote: (noteId: string) => void;
  onSearchQueryChange: (value: string) => void;
  onToggleExpand: () => void;
}

function EmptyEditorState() {
  return (
    <View style={styles.emptyEditorState}>
      <Text style={styles.emptyEditorTitle}>Select a note</Text>
      <Text style={styles.emptyEditorText}>
        Your markdown editor will open here with auto-save and local file storage.
      </Text>
    </View>
  );
}

export function NotesScreen({
  visible,
  expanded,
  activeView,
  activeNote,
  pinnedNotes,
  recentNotes,
  searchQuery,
  selectedNoteId,
  isLoading,
  isSaving,
  errorMessage,
  onBackToList,
  onChangeNote,
  onClose,
  onCreateNote,
  onOpenNote,
  onSearchQueryChange,
  onToggleExpand,
}: NotesScreenProps) {
  const { height, width } = useWindowDimensions();
  const showSplitLayout = expanded && width >= 720;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent>
      <View style={styles.overlay}>
        <Pressable
          style={styles.backdrop}
          onPress={expanded ? undefined : onClose}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={[
            styles.panel,
            expanded
              ? styles.expandedPanel
              : {
                  width: Math.min(width - 24, 560),
                  maxHeight: Math.min(height * 0.82, 760),
                },
          ]}>
          <View style={styles.header}>
            <View>
              <Text style={styles.headerKicker}>Floating Notes</Text>
              <Text style={styles.headerTitle}>
                {expanded ? 'Notes Workspace' : 'Quick Notes'}
              </Text>
            </View>
            <View style={styles.headerActions}>
              <Pressable onPress={onCreateNote} style={styles.headerButton}>
                <Text style={styles.headerButtonText}>New</Text>
              </Pressable>
              <Pressable onPress={onToggleExpand} style={styles.headerButton}>
                <Text style={styles.headerButtonText}>
                  {expanded ? 'Shrink' : 'Expand'}
                </Text>
              </Pressable>
              <Pressable onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
            </View>
          </View>

          {errorMessage ? (
            <View style={styles.errorBanner}>
              <Text style={styles.errorBannerText}>{errorMessage}</Text>
            </View>
          ) : null}

          {showSplitLayout ? (
            <View style={styles.splitLayout}>
              <View style={styles.listPane}>
                <NoteList
                  pinnedNotes={pinnedNotes}
                  recentNotes={recentNotes}
                  searchQuery={searchQuery}
                  selectedNoteId={selectedNoteId}
                  isLoading={isLoading}
                  onCreateNote={onCreateNote}
                  onOpenNote={onOpenNote}
                  onSearchQueryChange={onSearchQueryChange}
                />
              </View>
              <View style={styles.editorPane}>
                {activeNote ? (
                  <NoteEditor
                    note={activeNote}
                    isSaving={isSaving}
                    onBack={onBackToList}
                    onChange={onChangeNote}
                  />
                ) : (
                  <EmptyEditorState />
                )}
              </View>
            </View>
          ) : activeView === 'editor' && activeNote ? (
            <NoteEditor
              note={activeNote}
              isSaving={isSaving}
              onBack={onBackToList}
              onChange={onChangeNote}
            />
          ) : (
            <NoteList
              pinnedNotes={pinnedNotes}
              recentNotes={recentNotes}
              searchQuery={searchQuery}
              selectedNoteId={selectedNoteId}
              isLoading={isLoading}
              onCreateNote={onCreateNote}
              onOpenNote={onOpenNote}
              onSearchQueryChange={onSearchQueryChange}
            />
          )}
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(6, 6, 6, 0.46)',
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
  },
  panel: {
    alignSelf: 'center',
    width: '100%',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: '#F8EEDB',
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 20,
  },
  expandedPanel: {
    flex: 1,
    width: '100%',
    maxWidth: '100%',
    borderRadius: 0,
    paddingTop: 22,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 14,
  },
  headerKicker: {
    color: '#94663A',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  headerTitle: {
    color: '#201A14',
    fontSize: 24,
    fontWeight: '800',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    borderRadius: 999,
    backgroundColor: '#F3E3CF',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  headerButtonText: {
    color: '#6C4E33',
    fontSize: 12,
    fontWeight: '700',
  },
  closeButton: {
    borderRadius: 999,
    backgroundColor: '#1F1A16',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  closeButtonText: {
    color: '#FFF7E8',
    fontSize: 12,
    fontWeight: '700',
  },
  errorBanner: {
    borderRadius: 16,
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
  },
  errorBannerText: {
    color: '#991B1B',
    fontSize: 13,
    fontWeight: '600',
  },
  splitLayout: {
    flex: 1,
    flexDirection: 'row',
    gap: 16,
    minHeight: 0,
  },
  listPane: {
    width: 320,
    maxWidth: '42%',
  },
  editorPane: {
    flex: 1,
    minWidth: 0,
  },
  emptyEditorState: {
    flex: 1,
    borderRadius: 28,
    backgroundColor: '#FFF9EF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  emptyEditorTitle: {
    color: '#201A14',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 10,
  },
  emptyEditorText: {
    color: '#6D6154',
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'center',
  },
});
