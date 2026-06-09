import RNFS from 'react-native-fs';

const NOTES_DIRECTORY_NAME = 'notes';

export function getNotesDirectoryPath() {
  return `${RNFS.DocumentDirectoryPath}/${NOTES_DIRECTORY_NAME}`;
}

export function getNoteFilePath(noteId: string) {
  return `${getNotesDirectoryPath()}/${noteId}.md`;
}
