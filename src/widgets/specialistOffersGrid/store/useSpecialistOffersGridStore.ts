import { create } from 'zustand';
import type { PaginetedOffer } from '../types';

interface SpecialistOffersGridStore {
  offers: PaginetedOffer[];
  loading: boolean;
  error: { code: string; message: string } | null;
  setOffers: (offers: PaginetedOffer[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: { code: string; message: string } | null) => void;
}

export const useSpecialistOffersGridStore = create<SpecialistOffersGridStore>((set) => ({
  offers: [],
  loading: false,
  error: null,
  setOffers: (offers) => set({ offers }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
