// store/useSelectedOrderStore.ts
import { create } from "zustand";

interface Order {
  id: string;
  status: string;
  // add more fields as needed
}

interface Store {
  selectedOrder: Order | null;
  selectOrder: (order: Order) => void;
}

export const useSelectedOrderStore = create<Store>((set) => ({
  selectedOrder: null,
  selectOrder: (order) => set({ selectedOrder: order }),
}));
