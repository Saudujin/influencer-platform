import { create } from 'zustand';
import { Influencer, InfluencerFilters } from '@/types';

interface InfluencerStore {
  // State
  selectedInfluencers: number[];
  filters: InfluencerFilters;
  
  // Actions
  toggleInfluencer: (id: number) => void;
  selectAll: (ids: number[]) => void;
  clearSelection: () => void;
  setFilters: (filters: Partial<InfluencerFilters>) => void;
  resetFilters: () => void;
}

const defaultFilters: InfluencerFilters = {
  page: 1,
  limit: 20,
  sortBy: 'createdAt',
  sortOrder: 'desc',
};

export const useInfluencerStore = create<InfluencerStore>((set) => ({
  selectedInfluencers: [],
  filters: defaultFilters,
  
  toggleInfluencer: (id) =>
    set((state) => ({
      selectedInfluencers: state.selectedInfluencers.includes(id)
        ? state.selectedInfluencers.filter((i) => i !== id)
        : [...state.selectedInfluencers, id],
    })),
  
  selectAll: (ids) =>
    set({ selectedInfluencers: ids }),
  
  clearSelection: () =>
    set({ selectedInfluencers: [] }),
  
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
  
  resetFilters: () =>
    set({ filters: defaultFilters }),
}));
