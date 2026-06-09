import { createMMKV } from 'react-native-mmkv';

const storage = createMMKV({
  id: 'master-android-app',
});

const NOTES_LAST_OPENED_KEY = 'notes.lastOpenedId';
const NOTES_EXPANDED_KEY = 'notes.isExpanded';

export const noteUiStorage = {
  getLastOpenedNoteId() {
    return storage.getString(NOTES_LAST_OPENED_KEY) ?? null;
  },

  setLastOpenedNoteId(noteId: string | null) {
    if (!noteId) {
      storage.remove(NOTES_LAST_OPENED_KEY);
      return;
    }

    storage.set(NOTES_LAST_OPENED_KEY, noteId);
  },

  getIsExpanded() {
    return storage.getBoolean(NOTES_EXPANDED_KEY) ?? false;
  },

  setIsExpanded(isExpanded: boolean) {
    storage.set(NOTES_EXPANDED_KEY, isExpanded);
  },
};
