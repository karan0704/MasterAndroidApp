import type {
  CreateNoteInput,
  NoteCategory,
  NoteDetail,
  NoteSummary,
  UpdateNoteInput,
} from '../contracts/note.contract';
import { isNoteCategory } from '../contracts/note.contract';
import type { NoteMetadataRecord } from '../../../storage/types/storage.types';
import { noteFileService } from '../../../storage/files/noteFileService';
import { notesTable } from '../../../storage/db/tables/notesTable';

function buildNoteId() {
  return `note_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function normalizeCategory(category?: string): NoteCategory {
  if (category && isNoteCategory(category)) {
    return category;
  }

  return 'personal';
}

function toNoteSummary(record: NoteMetadataRecord): NoteSummary {
  return {
    id: record.id,
    title: record.title,
    previewText: record.previewText,
    filePath: record.filePath,
    category: normalizeCategory(record.category),
    isPinned: record.isPinned,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    lastOpenedAt: record.lastOpenedAt,
    hasReminder: record.hasReminder,
    hasAttachment: record.hasAttachment,
  };
}

function toNoteDetail(record: NoteMetadataRecord, content: string): NoteDetail {
  return {
    ...toNoteSummary(record),
    content,
  };
}

function buildPreviewText(content: string) {
  return content
    .replace(/[#>*_`~-]/g, ' ')
    .replace(/\[( |x)\]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 140);
}

async function buildDetailFromRecord(record: NoteMetadataRecord) {
  const content = await noteFileService.readNoteFile(record.filePath);

  return toNoteDetail(record, content);
}

export const noteService = {
  async ensureReady() {
    await Promise.all([noteFileService.ensureReady(), notesTable.ensureReady()]);
  },

  async listNotes() {
    await this.ensureReady();

    const records = await notesTable.listNotes();

    return records.map(toNoteSummary);
  },

  async createNote(input: CreateNoteInput = {}) {
    await this.ensureReady();

    const noteId = buildNoteId();
    const now = new Date().toISOString();
    const initialContent = input.content ?? '';
    const filePath = await noteFileService.createNoteFile(noteId, initialContent);

    const record: NoteMetadataRecord = {
      id: noteId,
      title: input.title?.trim() ?? '',
      filePath,
      previewText: buildPreviewText(initialContent),
      category: normalizeCategory(input.category),
      isPinned: input.isPinned ?? false,
      createdAt: now,
      updatedAt: now,
      lastOpenedAt: now,
      syncStatus: 'local',
      hasReminder: false,
      hasAttachment: false,
    };

    await notesTable.upsertNote(record);

    return toNoteDetail(record, initialContent);
  },

  async getNote(noteId: string) {
    await this.ensureReady();

    const record = await notesTable.getNoteById(noteId);

    if (!record) {
      return null;
    }

    return buildDetailFromRecord(record);
  },

  async openNote(noteId: string) {
    await this.ensureReady();

    const record = await notesTable.getNoteById(noteId);

    if (!record) {
      return null;
    }

    const updatedRecord: NoteMetadataRecord = {
      ...record,
      lastOpenedAt: new Date().toISOString(),
    };

    await notesTable.upsertNote(updatedRecord);

    return buildDetailFromRecord(updatedRecord);
  },

  async saveNote(input: UpdateNoteInput) {
    await this.ensureReady();

    const existingRecord = await notesTable.getNoteById(input.id);

    if (!existingRecord) {
      throw new Error(`Note not found: ${input.id}`);
    }

    const now = new Date().toISOString();
    const normalizedTitle = input.title.trim();
    const nextRecord: NoteMetadataRecord = {
      ...existingRecord,
      title: normalizedTitle,
      previewText: buildPreviewText(input.content),
      category: normalizeCategory(input.category),
      isPinned: input.isPinned,
      updatedAt: now,
    };

    await noteFileService.writeNoteFile(existingRecord.filePath, input.content);
    await notesTable.upsertNote(nextRecord);

    return toNoteDetail(nextRecord, input.content);
  },
};
