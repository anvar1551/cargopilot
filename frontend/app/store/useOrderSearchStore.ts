// store/useOrderSearchStore.ts
import { create } from "zustand";

interface OrderSearchState {
  query: string;
  setQuery: (query: string) => void;
}

export const useOrderSearchStore = create<OrderSearchState>((set) => ({
  query: "",
  setQuery: (query) => set({ query }),
}));
