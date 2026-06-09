import React, { useEffect, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Markdown from 'react-native-markdown-display';

import {
  NOTE_CATEGORIES,
  NOTE_CATEGORY_COLORS,
  type NoteDetail,
} from '../contracts/note.contract';

interface NoteEditorProps {
  note: NoteDetail;
  isSaving: boolean;
  onBack: () => void;
  onChange: (changes: Partial<NoteDetail>) => void;
}

interface SelectionRange {
  start: number;
  end: number;
}

const CATEGORY_STYLES = StyleSheet.create({
  workBorder: {
    borderColor: NOTE_CATEGORY_COLORS.work,
  },
  workActive: {
    backgroundColor: NOTE_CATEGORY_COLORS.work,
  },
  healthBorder: {
    borderColor: NOTE_CATEGORY_COLORS.health,
  },
  healthActive: {
    backgroundColor: NOTE_CATEGORY_COLORS.health,
  },
  personalBorder: {
    borderColor: NOTE_CATEGORY_COLORS.personal,
  },
  personalActive: {
    backgroundColor: NOTE_CATEGORY_COLORS.personal,
  },
  importantBorder: {
    borderColor: NOTE_CATEGORY_COLORS.important,
  },
  importantActive: {
    backgroundColor: NOTE_CATEGORY_COLORS.important,
  },
});

const CATEGORY_BORDER_STYLES = {
  work: CATEGORY_STYLES.workBorder,
  health: CATEGORY_STYLES.healthBorder,
  personal: CATEGORY_STYLES.personalBorder,
  important: CATEGORY_STYLES.importantBorder,
};

const CATEGORY_ACTIVE_STYLES = {
  work: CATEGORY_STYLES.workActive,
  health: CATEGORY_STYLES.healthActive,
  personal: CATEGORY_STYLES.personalActive,
  important: CATEGORY_STYLES.importantActive,
};

function formatTimestamp(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
}

export function NoteEditor({
  note,
  isSaving,
  onBack,
  onChange,
}: NoteEditorProps) {
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [selection, setSelection] = useState<SelectionRange>({
    start: 0,
    end: 0,
  });

  useEffect(() => {
    setIsPreviewVisible(false);
    setSelection({
      start: note.content.length,
      end: note.content.length,
    });
  }, [note.id, note.content.length]);

  function applyWrapper(prefix: string, suffix = '', fallback = 'text') {
    const { start, end } = selection;
    const selectedText = note.content.slice(start, end) || fallback;
    const nextContent =
      note.content.slice(0, start) +
      prefix +
      selectedText +
      suffix +
      note.content.slice(end);
    const nextCaret = start + prefix.length + selectedText.length + suffix.length;

    onChange({
      content: nextContent,
    });

    setSelection({
      start: nextCaret,
      end: nextCaret,
    });
  }

  function insertBlock(prefix: string) {
    const { start } = selection;
    const needsLeadingBreak = start > 0 && note.content[start - 1] !== '\n';
    const valueToInsert = `${needsLeadingBreak ? '\n' : ''}${prefix}`;
    const nextContent =
      note.content.slice(0, start) + valueToInsert + note.content.slice(start);
    const nextCaret = start + valueToInsert.length;

    onChange({
      content: nextContent,
    });

    setSelection({
      start: nextCaret,
      end: nextCaret,
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Pressable onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>List</Text>
        </Pressable>
        <Pressable
          onPress={() => setIsPreviewVisible(currentValue => !currentValue)}
          style={styles.previewButton}>
          <Text style={styles.previewButtonText}>
            {isPreviewVisible ? 'Write' : 'Preview'}
          </Text>
        </Pressable>
      </View>

      <TextInput
        value={note.title}
        onChangeText={value => onChange({ title: value })}
        placeholder="Note title"
        placeholderTextColor="#8A7F71"
        style={styles.titleInput}
      />

      <View style={styles.metaRow}>
        <Text style={styles.metaText}>Created {formatTimestamp(note.createdAt)}</Text>
        <Text style={styles.metaText}>Updated {formatTimestamp(note.updatedAt)}</Text>
      </View>
      <View style={styles.metaRow}>
        <Text style={styles.metaText}>Opened {formatTimestamp(note.lastOpenedAt)}</Text>
        <Text style={styles.saveStateText}>{isSaving ? 'Saving...' : 'Saved'}</Text>
      </View>

      <View style={styles.categoryRow}>
        {NOTE_CATEGORIES.map(category => {
          const isActive = note.category === category;

          return (
            <Pressable
              key={category}
              onPress={() => onChange({ category })}
              style={[
                styles.categoryChip,
                CATEGORY_BORDER_STYLES[category],
                isActive ? CATEGORY_ACTIVE_STYLES[category] : null,
              ]}>
              <Text
                style={[
                  styles.categoryChipText,
                  isActive ? styles.categoryChipTextActive : null,
                ]}>
                {category}
              </Text>
            </Pressable>
          );
        })}
        <Pressable
          onPress={() => onChange({ isPinned: !note.isPinned })}
          style={[
            styles.pinButton,
            note.isPinned ? styles.pinButtonActive : null,
          ]}>
          <Text
            style={[
              styles.pinButtonText,
              note.isPinned ? styles.pinButtonTextActive : null,
            ]}>
            {note.isPinned ? 'Pinned' : 'Pin'}
          </Text>
        </Pressable>
      </View>

      <View style={styles.toolbar}>
        <Pressable
          onPress={() => applyWrapper('**', '**', 'bold')}
          style={styles.toolButton}>
          <Text style={styles.toolButtonText}>Bold</Text>
        </Pressable>
        <Pressable
          onPress={() => applyWrapper('*', '*', 'italic')}
          style={styles.toolButton}>
          <Text style={styles.toolButtonText}>Italic</Text>
        </Pressable>
        <Pressable onPress={() => insertBlock('## ')} style={styles.toolButton}>
          <Text style={styles.toolButtonText}>H2</Text>
        </Pressable>
        <Pressable onPress={() => insertBlock('- [ ] ')} style={styles.toolButton}>
          <Text style={styles.toolButtonText}>Todo</Text>
        </Pressable>
        <Pressable onPress={() => insertBlock('- ')} style={styles.toolButton}>
          <Text style={styles.toolButtonText}>List</Text>
        </Pressable>
      </View>

      {isPreviewVisible ? (
        <ScrollView
          style={styles.previewSurface}
          contentContainerStyle={styles.previewContent}
          showsVerticalScrollIndicator={false}>
          <Markdown style={markdownStyles}>
            {note.content || 'Nothing to preview yet.'}
          </Markdown>
        </ScrollView>
      ) : (
        <TextInput
          multiline
          style={styles.editorInput}
          placeholder="Write markdown, checklists, and notes here..."
          placeholderTextColor="#8A7F71"
          textAlignVertical="top"
          value={note.content}
          onChangeText={value => onChange({ content: value })}
          onSelectionChange={event => setSelection(event.nativeEvent.selection)}
          selection={selection}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  backButton: {
    borderRadius: 999,
    backgroundColor: '#F3E3CF',
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  backButtonText: {
    color: '#6C4E33',
    fontSize: 13,
    fontWeight: '700',
  },
  previewButton: {
    borderRadius: 999,
    backgroundColor: '#1F1A16',
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  previewButtonText: {
    color: '#FFF7E8',
    fontSize: 13,
    fontWeight: '700',
  },
  titleInput: {
    borderRadius: 18,
    backgroundColor: '#FFF9EF',
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#201A14',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 6,
  },
  metaText: {
    flex: 1,
    color: '#7B6C5D',
    fontSize: 12,
  },
  saveStateText: {
    color: '#6C4E33',
    fontSize: 12,
    fontWeight: '700',
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 8,
    marginBottom: 14,
  },
  categoryChip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  categoryChipText: {
    color: '#6C4E33',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  categoryChipTextActive: {
    color: '#FFF7E8',
  },
  pinButton: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#BFA486',
    backgroundColor: '#FFF7E8',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  pinButtonActive: {
    backgroundColor: '#201A14',
    borderColor: '#201A14',
  },
  pinButtonText: {
    color: '#6C4E33',
    fontSize: 12,
    fontWeight: '700',
  },
  pinButtonTextActive: {
    color: '#FFF7E8',
  },
  toolbar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 14,
  },
  toolButton: {
    borderRadius: 14,
    backgroundColor: '#F3E3CF',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  toolButtonText: {
    color: '#6C4E33',
    fontSize: 12,
    fontWeight: '700',
  },
  editorInput: {
    flex: 1,
    borderRadius: 22,
    backgroundColor: '#FFF9EF',
    paddingHorizontal: 18,
    paddingVertical: 16,
    color: '#201A14',
    fontSize: 15,
    lineHeight: 24,
  },
  previewSurface: {
    flex: 1,
    borderRadius: 22,
    backgroundColor: '#FFF9EF',
  },
  previewContent: {
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
});

const markdownStyles = StyleSheet.create({
  body: {
    color: '#201A14',
    fontSize: 15,
    lineHeight: 24,
  },
  heading2: {
    color: '#201A14',
    fontSize: 22,
    fontWeight: '700',
  },
  bullet_list: {
    marginVertical: 6,
  },
});
