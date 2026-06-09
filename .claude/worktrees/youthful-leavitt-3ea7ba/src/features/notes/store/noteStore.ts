import { useSyncExternalStore } from 'react';

import type { NotesPanelState } from '../contracts/note.contract';

const INITIAL_PANEL_STATE: NotesPanelState = {
  isVisible: false,
  isExpanded: false,
  selectedNoteId: null,
  searchQuery: '',
  activeView: 'list',
};

let panelState = INITIAL_PANEL_STATE;

const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach(listener => {
    listener();
  });
}

function updatePanelState(nextState: Partial<NotesPanelState>) {
  panelState = {
    ...panelState,
    ...nextState,
  };

  emitChange();
}

export const noteStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  },

  getSnapshot() {
    return panelState;
  },

  openPanel() {
    updatePanelState({
      isVisible: true,
    });
  },

  closePanel() {
    updatePanelState({
      isVisible: false,
      activeView: 'list',
      searchQuery: '',
    });
  },

  setExpanded(isExpanded: boolean) {
    updatePanelState({
      isExpanded,
    });
  },

  toggleExpanded() {
    updatePanelState({
      isExpanded: !panelState.isExpanded,
    });
  },

  openEditor(noteId: string) {
    updatePanelState({
      selectedNoteId: noteId,
      activeView: 'editor',
      isVisible: true,
    });
  },

  openList() {
    updatePanelState({
      activeView: 'list',
    });
  },

  setSearchQuery(searchQuery: string) {
    updatePanelState({
      searchQuery,
    });
  },
};

export function useNoteStore() {
  return useSyncExternalStore(noteStore.subscribe, noteStore.getSnapshot);
}
