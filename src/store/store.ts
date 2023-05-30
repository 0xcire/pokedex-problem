import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type FilteredStore = {
  selectedType: string;
  setSelectedType: (type: string) => void;
};

export const useFilteredStore = create<FilteredStore>((set) => ({
  selectedType: 'all',
  setSelectedType: (type: string) => set(() => ({ selectedType: type })),
}));

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
