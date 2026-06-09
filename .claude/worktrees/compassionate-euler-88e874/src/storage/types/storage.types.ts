export type NoteSyncStatus = 'local';

export interface NoteMetadataRecord {
  id: string;
  title: string;
  filePath: string;
  previewText: string;
  category: string;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
  lastOpenedAt: string;
  syncStatus: NoteSyncStatus;
  hasReminder: boolean;
  hasAttachment: boolean;
}
