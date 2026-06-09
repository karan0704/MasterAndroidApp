import RNFS from 'react-native-fs';

import type { NoteFileStorageContract } from '../contracts/storage.contract';
import { getNoteFilePath, getNotesDirectoryPath } from './storagePaths';

async function ensureNotesDirectory() {
  const notesDirectoryPath = getNotesDirectoryPath();
  const directoryExists = await RNFS.exists(notesDirectoryPath);

  if (!directoryExists) {
    await RNFS.mkdir(notesDirectoryPath);
  }
}

export const noteFileService: NoteFileStorageContract = {
  async ensureReady() {
    await ensureNotesDirectory();
  },

  async createNoteFile(noteId, initialContent) {
    await ensureNotesDirectory();

    const filePath = getNoteFilePath(noteId);
    const fileExists = await RNFS.exists(filePath);

    if (!fileExists) {
      await RNFS.writeFile(filePath, initialContent, 'utf8');
    }

    return filePath;
  },

  async readNoteFile(filePath) {
    const fileExists = await RNFS.exists(filePath);

    if (!fileExists) {
      return '';
    }

    return RNFS.readFile(filePath, 'utf8');
  },

  async writeNoteFile(filePath, content) {
    await ensureNotesDirectory();
    await RNFS.writeFile(filePath, content, 'utf8');
  },
};
