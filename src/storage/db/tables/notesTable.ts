import type { NoteMetadataStorageContract } from '../../contracts/storage.contract';
import type { NoteMetadataRecord } from '../../types/storage.types';
import { getDatabase } from '../database';

interface NoteMetadataRow {
  [key: string]: string | number;
  id: string;
  title: string;
  file_path: string;
  preview_text: string;
  category: string;
  is_pinned: number;
  created_at: string;
  updated_at: string;
  last_opened_at: string;
  sync_status: string;
  has_reminder: number;
  has_attachment: number;
}

function mapRowToRecord(row: NoteMetadataRow): NoteMetadataRecord {
  return {
    id: row.id,
    title: row.title,
    filePath: row.file_path,
    previewText: row.preview_text,
    category: row.category,
    isPinned: Boolean(row.is_pinned),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    lastOpenedAt: row.last_opened_at,
    syncStatus: 'local',
    hasReminder: Boolean(row.has_reminder),
    hasAttachment: Boolean(row.has_attachment),
  };
}

export const notesTable: NoteMetadataStorageContract = {
  async ensureReady() {
    await getDatabase();
  },

  async listNotes() {
    const database = await getDatabase();
    const result = await database.executeAsync<NoteMetadataRow>(
      `SELECT
          id,
          title,
          file_path,
          preview_text,
          category,
          is_pinned,
          created_at,
          updated_at,
          last_opened_at,
          sync_status,
          has_reminder,
          has_attachment
        FROM notes_metadata
        ORDER BY is_pinned DESC, last_opened_at DESC, updated_at DESC;`,
    );

    return result.rows._array.map(mapRowToRecord);
  },

  async getNoteById(noteId) {
    const database = await getDatabase();
    const result = await database.executeAsync<NoteMetadataRow>(
      `SELECT
          id,
          title,
          file_path,
          preview_text,
          category,
          is_pinned,
          created_at,
          updated_at,
          last_opened_at,
          sync_status,
          has_reminder,
          has_attachment
        FROM notes_metadata
        WHERE id = ?
        LIMIT 1;`,
      [noteId],
    );

    const row = result.rows.item(0);

    if (!row) {
      return null;
    }

    return mapRowToRecord(row);
  },

  async upsertNote(record) {
    const database = await getDatabase();

    await database.executeAsync(
      `INSERT OR REPLACE INTO notes_metadata (
          id,
          title,
          file_path,
          preview_text,
          category,
          is_pinned,
          created_at,
          updated_at,
          last_opened_at,
          sync_status,
          has_reminder,
          has_attachment
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        record.id,
        record.title,
        record.filePath,
        record.previewText,
        record.category,
        record.isPinned ? 1 : 0,
        record.createdAt,
        record.updatedAt,
        record.lastOpenedAt,
        record.syncStatus,
        record.hasReminder ? 1 : 0,
        record.hasAttachment ? 1 : 0,
      ],
    );
  },
};
