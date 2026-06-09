import type { NoteMetadataRecord } from '../types/storage.types';

export interface NoteFileStorageContract {
  ensureReady(): Promise<void>;
  createNoteFile(noteId: string, initialContent: string): Promise<string>;
  readNoteFile(filePath: string): Promise<string>;
  writeNoteFile(filePath: string, content: string): Promise<void>;
}

export interface NoteMetadataStorageContract {
  ensureReady(): Promise<void>;
  listNotes(): Promise<NoteMetadataRecord[]>;
  getNoteById(noteId: string): Promise<NoteMetadataRecord | null>;
  upsertNote(record: NoteMetadataRecord): Promise<void>;
}
