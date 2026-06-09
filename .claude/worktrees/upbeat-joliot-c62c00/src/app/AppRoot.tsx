import React from 'react';

import { HomeScreen } from '../features/home';
import { NotesScreen, useNotes } from '../features/notes';
import { DownloadsScreen, useDownloadsStore } from '../features/youtube-downloader';
import { downloadsStore } from '../features/youtube-downloader/store/downloadsStore';

export function AppRoot() {
  const notes = useNotes();
  const downloadsPanel = useDownloadsStore();

  return (
    <>
      <HomeScreen
        onOpenNotes={notes.openNotes}
        onOpenDownloads={() => downloadsStore.openDownloads()}
        isNotesVisible={notes.isNotesVisible}
        isDownloadsVisible={downloadsPanel.isVisible}
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
      <DownloadsScreen
        visible={downloadsPanel.isVisible}
        onClose={() => downloadsStore.closeDownloads()}
      />
    </>
  );
}
