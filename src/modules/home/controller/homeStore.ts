import { create } from 'zustand';
import { Address } from '../model/Address';

interface HomeState {
  loading: boolean;
  error: string | null;
  results: Address[];
  lastAddress: Address | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setResults: (results: Address[]) => void;
  setLastAddress: (address: Address | null) => void;
  resetSearch: () => void;
}

export const useHomeStore = create<HomeState>((set) => ({
  loading: false,
  error: null,
  results: [],
  lastAddress: null,
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setResults: (results) => set({ results }),
  setLastAddress: (lastAddress) => set({ lastAddress }),
  resetSearch: () => set({ loading: false, error: null, results: [] }),
}));
