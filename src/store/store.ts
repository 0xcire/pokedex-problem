import { create } from 'zustand';

type FilteredStore = {
  selectedType: string;
  setSelectedType: (type: string) => void;
};

export const useFilteredStore = create<FilteredStore>((set) => ({
  selectedType: 'all',
  setSelectedType: (type: string) => set(() => ({ selectedType: type })),
}));
