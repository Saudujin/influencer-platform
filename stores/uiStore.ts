import { create } from 'zustand';

interface UIStore {
  // Modal states
  isInfluencerFormOpen: boolean;
  isImportDialogOpen: boolean;
  isBulkUpdateDialogOpen: boolean;
  editingInfluencerId: number | null;
  
  // Actions
  openInfluencerForm: (id?: number) => void;
  closeInfluencerForm: () => void;
  openImportDialog: () => void;
  closeImportDialog: () => void;
  openBulkUpdateDialog: () => void;
  closeBulkUpdateDialog: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isInfluencerFormOpen: false,
  isImportDialogOpen: false,
  isBulkUpdateDialogOpen: false,
  editingInfluencerId: null,
  
  openInfluencerForm: (id) =>
    set({ isInfluencerFormOpen: true, editingInfluencerId: id || null }),
  
  closeInfluencerForm: () =>
    set({ isInfluencerFormOpen: false, editingInfluencerId: null }),
  
  openImportDialog: () =>
    set({ isImportDialogOpen: true }),
  
  closeImportDialog: () =>
    set({ isImportDialogOpen: false }),
  
  openBulkUpdateDialog: () =>
    set({ isBulkUpdateDialogOpen: true }),
  
  closeBulkUpdateDialog: () =>
    set({ isBulkUpdateDialogOpen: false }),
}));
