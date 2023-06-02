import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

type FilteredStore = {
  selectedType: string;
  setSelectedType: (type: string) => void;
};

export const useFilteredStore = create<FilteredStore>((set) => ({
  selectedType: 'all',
  setSelectedType: (type: string) => set(() => ({ selectedType: type })),
}));

type PaginationStore = {
  currentPage: number;
  resultsPerPage: number;
  resultsOffset: number;
  resultsTotal: number;
  setCurrentPage: (page: number) => void;
  setResultsPerPage: (results: number) => void;
  setPageOffset: (offset: number) => void;
};

// type PaginationState = {

// }

// type PaginationActions = {

// }

export const usePaginationStore = create<PaginationStore>((set) => ({
  currentPage: 1,
  resultsPerPage: 20,
  resultsOffset: 20,
  resultsTotal: 1281,
  setCurrentPage: (page: number) =>
    set(() => ({
      currentPage: page,
    })),
  setResultsPerPage: (results: number) =>
    set(() => ({ resultsPerPage: results })),
  // TODO: reimplement, probably shouldnt be computed in FilteredTable component
  setPageOffset: () =>
    set((state) => ({
      resultsOffset:
        state.resultsPerPage * state.currentPage - state.resultsPerPage,
    })),
}));
