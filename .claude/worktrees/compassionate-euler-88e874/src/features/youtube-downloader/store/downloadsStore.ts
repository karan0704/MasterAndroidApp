import { useSyncExternalStore } from 'react';
import type { DownloadsPanelState } from '../contracts/youtube.contract';

type Listener = () => void;

const initialState: DownloadsPanelState = {
  isVisible: false,
  selectedTab: 'active',
};

let state = initialState;
const listeners = new Set<Listener>();

function notify() {
  listeners.forEach(listener => listener());
}

export const downloadsStore = {
  getState() {
    return state;
  },

  openDownloads() {
    state = { ...state, isVisible: true };
    notify();
  },

  closeDownloads() {
    state = { ...state, isVisible: false };
    notify();
  },

  selectTab(tab: 'active' | 'completed' | 'failed') {
    state = { ...state, selectedTab: tab };
    notify();
  },

  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};

export function useDownloadsStore() {
  return useSyncExternalStore(
    callback => downloadsStore.subscribe(callback),
    () => downloadsStore.getState(),
    () => initialState,
  );
}
