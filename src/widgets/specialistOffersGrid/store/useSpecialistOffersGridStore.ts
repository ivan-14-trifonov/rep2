import { create } from 'zustand';
import type { PaginetedOffer } from '../types';

interface SpecialistOffersGridStore {
  offers: PaginetedOffer[];
  loading: boolean;
  error: { code: string; message: string } | null;
  page: number;
  limit: number;
  total: number;
  pagesCount: number;
  hasMore: boolean;
  setPaginatedResult: (result: { data: PaginetedOffer[]; page: number; limit: number; total: number; pagesCount: number; hasMore: boolean }) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: { code: string; message: string } | null) => void;
}

export const useSpecialistOffersGridStore = create<SpecialistOffersGridStore>((set) => ({
  offers: [],
  loading: false,
  error: null,
  page: 1,
  limit: 12,
  total: 0,
  pagesCount: 0,
  hasMore: false,
  setPaginatedResult: (result) =>
    set({
      offers: result.data,
      page: result.page,
      limit: result.limit,
      total: result.total,
      pagesCount: result.pagesCount,
      hasMore: result.hasMore,
    }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
