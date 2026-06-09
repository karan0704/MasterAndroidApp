import React from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme, SPACING } from '../../../shared/theme';
import { BORDER_RADIUS } from '../../../core/constants';
import { Text, Button } from '../../../shared/components';
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
  const { colors } = useTheme();

  return (
    <View style={[styles.emptyEditorState, { backgroundColor: colors.whiteBg }]}>
      <Text variant="header" color={colors.textPrimary} style={styles.emptyEditorTitle}>
        Select a note
      </Text>
      <Text variant="body" color={colors.textSecondary} style={styles.emptyEditorText}>
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
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const showSplitLayout = expanded && width >= 720;

  // Safe-area aware padding: use at least 12px, but respect device insets
  const panelPaddingTop = Math.max(insets.top, SPACING.md);
  const panelPaddingBottom = Math.max(insets.bottom, SPACING.md);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent>
      <View style={[styles.overlay, { backgroundColor: colors.overlay }]}>
        <Pressable
          style={styles.backdrop}
          onPress={expanded ? undefined : onClose}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={[
            styles.panel,
            {
              backgroundColor: colors.panelBg,
              paddingTop: panelPaddingTop,
              paddingBottom: panelPaddingBottom,
              paddingHorizontal: SPACING.lg,
            },
            expanded
              ? styles.expandedPanel
              : {
                  width: Math.min(width - 24, 560),
                  maxHeight: Math.min(height * 0.82, 760),
                },
          ]}>
          <View style={[styles.header, { marginTop : 50, marginBottom: SPACING.xs }]}>
            <View>
              <Text variant="kicker" color={colors.textSecondary} style={styles.headerKicker}>
                Floating Notes
              </Text>
              <Text variant="header" color={colors.textPrimary} style={styles.headerTitle}>
                {expanded ? 'Notes Workspace' : 'Quick Notes'}
              </Text>
            </View>
            <View style={[styles.headerActions, { gap: SPACING.sm }]}>
              <Button onPress={onCreateNote} title="New" variant="secondary" />
              <Button onPress={onToggleExpand} title={expanded ? 'Shrink' : 'Expand'} variant="secondary" />
              <Button onPress={onClose} title="Close" variant="primary" />
            </View>
          </View>

          {errorMessage ? (
            <View style={[styles.errorBanner, { backgroundColor: colors.errorBg }]}>
              <Text variant="metadata" color={colors.error}>
                {errorMessage}
              </Text>
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
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
  },
  panel: {
    alignSelf: 'center',
    width: '100%',
    borderTopLeftRadius: BORDER_RADIUS.xxl,
    borderTopRightRadius: BORDER_RADIUS.xxl,
    // paddingTop, paddingBottom, paddingHorizontal set dynamically
  },
  expandedPanel: {
    flex: 1,
    width: '100%',
    maxWidth: '100%',
    borderRadius: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerKicker: {
    marginBottom: SPACING.xs,
  },
  headerTitle: {},
  headerActions: {
    flexDirection: 'row',
  },
  errorBanner: {
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginBottom: SPACING.md,
  },
  splitLayout: {
    flex: 1,
    flexDirection: 'row',
    gap: SPACING.lg,
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
    borderRadius: BORDER_RADIUS.xxl,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xxxl,
  },
  emptyEditorTitle: {
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  emptyEditorText: {
    textAlign: 'center',
  },
});
