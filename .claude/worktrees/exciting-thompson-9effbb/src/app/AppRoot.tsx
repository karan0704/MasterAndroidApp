import React from 'react';

import { HomeScreen } from '../features/home';
import { NotesScreen, useNotes } from '../features/notes';

export function AppRoot() {
  const notes = useNotes();

  return (
    <>
      <HomeScreen
        onOpenNotes={notes.openNotes}
        isNotesVisible={notes.isNotesVisible}
      />
      <NotesScreen
        visible={notes.isNotesVisible}
        expanded={notes.isExpanded}
        activeView={notes.activeView}
        activeNote={notes.activeNote}
        pinnedNotes={notes.pinnedNotes}
        recentNotes={notes.recentNotes}
        searchQuery={notes.searchQuery}
        selectedNoteId={notes.selectedNoteId}
        isLoading={notes.isLoading}
        isSaving={notes.isSaving}
        errorMessage={notes.errorMessage}
        onBackToList={notes.backToList}
        onChangeNote={notes.updateActiveNote}
        onClose={notes.closeNotes}
        onCreateNote={notes.createNote}
        onOpenNote={notes.openNote}
        onSearchQueryChange={notes.setSearchQuery}
        onToggleExpand={notes.toggleExpanded}
      />
    </>
  );
}
