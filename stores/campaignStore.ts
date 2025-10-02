import { create } from 'zustand';

interface CampaignStore {
  // State
  title: string;
  description: string;
  selectedInfluencerIds: number[];
  selectedFields: string[];
  
  // Actions
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  toggleInfluencer: (id: number) => void;
  setSelectedInfluencers: (ids: number[]) => void;
  toggleField: (field: string) => void;
  setSelectedFields: (fields: string[]) => void;
  reset: () => void;
}

const initialState = {
  title: '',
  description: '',
  selectedInfluencerIds: [],
  selectedFields: ['name', 'username', 'platforms', 'category', 'followersCount', 'region'],
};

export const useCampaignStore = create<CampaignStore>((set) => ({
  ...initialState,
  
  setTitle: (title) =>
    set({ title }),
  
  setDescription: (description) =>
    set({ description }),
  
  toggleInfluencer: (id) =>
    set((state) => ({
      selectedInfluencerIds: state.selectedInfluencerIds.includes(id)
        ? state.selectedInfluencerIds.filter((i) => i !== id)
        : [...state.selectedInfluencerIds, id],
    })),
  
  setSelectedInfluencers: (ids) =>
    set({ selectedInfluencerIds: ids }),
  
  toggleField: (field) =>
    set((state) => ({
      selectedFields: state.selectedFields.includes(field)
        ? state.selectedFields.filter((f) => f !== field)
        : [...state.selectedFields, field],
    })),
  
  setSelectedFields: (fields) =>
    set({ selectedFields: fields }),
  
  reset: () =>
    set(initialState),
}));
