import {
  startTransition,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
} from 'react';

import type { NoteDetail, NoteSummary } from '../contracts/note.contract';
import { noteUiStorage } from '../../../storage/preferences/mmkvStorage';
import { noteService } from '../services/noteService';
import { noteStore, useNoteStore } from '../store/noteStore';

function getDraftSignature(note: Pick<NoteDetail, 'title' | 'content' | 'category' | 'isPinned'>) {
  return JSON.stringify({
    title: note.title,
    content: note.content,
    category: note.category,
    isPinned: note.isPinned,
  });
}

function matchesSearchQuery(note: NoteSummary, query: string) {
  if (!query) {
    return true;
  }

  const normalizedQuery = query.trim().toLowerCase();

  return [note.title, note.previewText, note.category].some(value =>
    value.toLowerCase().includes(normalizedQuery),
  );
}

export function useNotes() {
  const panelState = useNoteStore();
  const deferredSearchQuery = useDeferredValue(panelState.searchQuery);

  const [notes, setNotes] = useState<NoteSummary[]>([]);
  const [activeNote, setActiveNote] = useState<NoteDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const lastSavedSignatureRef = useRef<string | null>(null);

  async function refreshNotes() {
    const nextNotes = await noteService.listNotes();

    startTransition(() => {
      setNotes(nextNotes);
    });
  }

  useEffect(() => {
    let isMounted = true;

    async function initializeNotes() {
      try {
        await noteService.ensureReady();

        const isExpanded = noteUiStorage.getIsExpanded();
        noteStore.setExpanded(isExpanded);

        const lastOpenedNoteId = noteUiStorage.getLastOpenedNoteId();

        if (lastOpenedNoteId) {
          const note = await noteService.getNote(lastOpenedNoteId);

          if (note && isMounted) {
            setActiveNote(note);
            lastSavedSignatureRef.current = getDraftSignature(note);
          }
        }

        const nextNotes = await noteService.listNotes();

        if (!isMounted) {
          return;
        }

        setNotes(nextNotes);
      } catch (error) {
        if (isMounted) {
          setErrorMessage(error instanceof Error ? error.message : 'Failed to load notes.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    initializeNotes().catch(() => {
      // Errors are already handled inside initializeNotes.
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!activeNote) {
      lastSavedSignatureRef.current = null;
      return;
    }

    const draftSignature = getDraftSignature(activeNote);
    const noteToSave = activeNote;

    if (draftSignature === lastSavedSignatureRef.current) {
      return;
    }

    let isCancelled = false;

    const timeoutId = setTimeout(() => {
      async function persistNote() {
        try {
          setIsSaving(true);
          setErrorMessage(null);

          const savedNote = await noteService.saveNote({
            id: noteToSave.id,
            title: noteToSave.title,
            content: noteToSave.content,
            category: noteToSave.category,
            isPinned: noteToSave.isPinned,
          });

          if (isCancelled) {
            return;
          }

          lastSavedSignatureRef.current = draftSignature;
          noteUiStorage.setLastOpenedNoteId(savedNote.id);

          setActiveNote(currentNote => {
            if (!currentNote || currentNote.id !== savedNote.id) {
              return currentNote;
            }

            const currentSignature = getDraftSignature(currentNote);

            if (currentSignature !== draftSignature) {
              return {
                ...currentNote,
                previewText: savedNote.previewText,
                updatedAt: savedNote.updatedAt,
                lastOpenedAt: savedNote.lastOpenedAt,
                filePath: savedNote.filePath,
              };
            }

            return savedNote;
          });

          await refreshNotes();
        } catch (error) {
          if (!isCancelled) {
            setErrorMessage(error instanceof Error ? error.message : 'Failed to save note.');
          }
        } finally {
          if (!isCancelled) {
            setIsSaving(false);
          }
        }
      }

      persistNote().catch(() => {
        // Errors are already handled inside persistNote.
      });
    }, 700);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, [
    activeNote,
  ]);

  const filteredNotes = notes.filter(note =>
    matchesSearchQuery(note, deferredSearchQuery),
  );
  const pinnedNotes = filteredNotes.filter(note => note.isPinned);
  const recentNotes = filteredNotes.filter(note => !note.isPinned);

  return {
    activeNote,
    errorMessage,
    isLoading,
    isNotesVisible: panelState.isVisible,
    isSaving,
    isExpanded: panelState.isExpanded,
    pinnedNotes,
    recentNotes,
    searchQuery: panelState.searchQuery,
    selectedNoteId: panelState.selectedNoteId,
    activeView: panelState.activeView,

    openNotes() {
      noteStore.openPanel();
    },

    closeNotes() {
      noteStore.closePanel();
    },

    toggleExpanded() {
      const nextExpanded = !panelState.isExpanded;
      noteStore.setExpanded(nextExpanded);
      noteUiStorage.setIsExpanded(nextExpanded);
    },

    setSearchQuery(value: string) {
      noteStore.setSearchQuery(value);
    },

    async createNote() {
      try {
        setErrorMessage(null);

        const note = await noteService.createNote();
        lastSavedSignatureRef.current = getDraftSignature(note);
        noteUiStorage.setLastOpenedNoteId(note.id);

        setActiveNote(note);
        noteStore.openEditor(note.id);
        await refreshNotes();
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : 'Failed to create note.');
      }
    },

    async openNote(noteId: string) {
      try {
        setErrorMessage(null);

        const note = await noteService.openNote(noteId);

        if (!note) {
          setErrorMessage('Selected note no longer exists.');
          return;
        }

        lastSavedSignatureRef.current = getDraftSignature(note);
        noteUiStorage.setLastOpenedNoteId(note.id);

        setActiveNote(note);
        noteStore.openEditor(note.id);
        await refreshNotes();
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : 'Failed to open note.');
      }
    },

    backToList() {
      noteStore.openList();
    },

    updateActiveNote(changes: Partial<NoteDetail>) {
      setActiveNote(currentNote => {
        if (!currentNote) {
          return currentNote;
        }

        return {
          ...currentNote,
          ...changes,
        };
      });
    },
  };
}
