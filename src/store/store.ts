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

type TableState = {
  resultsTotal: number;
};

export const useTableStore = create<TableState>(() => ({
  resultsTotal: 1281,
}));
