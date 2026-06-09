export const NOTE_CATEGORIES = [
  'work',
  'health',
  'personal',
  'important',
] as const;

export type NoteCategory = (typeof NOTE_CATEGORIES)[number];
export type NotesViewMode = 'list' | 'editor';

export const NOTE_CATEGORY_COLORS: Record<NoteCategory, string> = {
  work: '#3B82F6',
  health: '#22C55E',
  personal: '#FACC15',
  important: '#EF4444',
};

export interface NoteSummary {
  id: string;
  title: string;
  previewText: string;
  filePath: string;
  category: NoteCategory;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
  lastOpenedAt: string;
  hasReminder: boolean;
  hasAttachment: boolean;
}

export interface NoteDetail extends NoteSummary {
  content: string;
}

export interface CreateNoteInput {
  title?: string;
  content?: string;
  category?: NoteCategory;
  isPinned?: boolean;
}

export interface UpdateNoteInput {
  id: string;
  title: string;
  content: string;
  category: NoteCategory;
  isPinned: boolean;
}

export interface NotesPanelState {
  isVisible: boolean;
  isExpanded: boolean;
  selectedNoteId: string | null;
  searchQuery: string;
  activeView: NotesViewMode;
}

export function isNoteCategory(value: string): value is NoteCategory {
  return NOTE_CATEGORIES.includes(value as NoteCategory);
}

export function getDisplayTitle(note: Pick<NoteSummary, 'title' | 'previewText'>) {
  return note.title.trim() || note.previewText || 'Untitled note';
}
