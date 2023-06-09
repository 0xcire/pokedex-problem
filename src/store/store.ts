import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import hashStorage from './hash-storage';

export type themes = 'business' | 'corporate';

type ThemeStore = {
  theme: themes;
  setTheme: (newTheme: themes) => void;
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'business',
      setTheme: (newTheme: themes) => set({ theme: newTheme }),
    }),
    {
      name: 'theme',
    }
  )
);

type TableState = {
  selectedType: string;
  currentPage: number;
  resultsPerPage: number;
  resultsOffset: number;
  resultsTotal: number;
};

type TableActions = {
  setSelectedType: (type: string) => void;
  setCurrentPage: (page: number) => void;
  // page: number
  setResultsPerPage: (results: number) => void;
  setResultsOffset: () => void;
};

export const useTableStore = create<TableState & TableActions>()(
  persist(
    (set) => ({
      selectedType: 'all',
      currentPage: 1,
      resultsPerPage: 20,
      resultsOffset: 0,
      resultsTotal: 1281,
      setSelectedType: (type: string) => set(() => ({ selectedType: type })),
      setCurrentPage: (page: number) => set(() => ({ currentPage: page })),
      setResultsPerPage: (results: number) =>
        set(() => ({ resultsPerPage: results })),
      setResultsOffset: () =>
        set((state) => ({
          resultsOffset: (state.currentPage - 1) * state.resultsPerPage,
        })),
    }),
    {
      name: 'table-params',
      storage: createJSONStorage(() => hashStorage),
    }
  )
);
