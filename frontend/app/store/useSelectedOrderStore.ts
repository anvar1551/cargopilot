// store/useSelectedOrderStore.ts
import { IOrder } from "@/types/order";
import { create } from "zustand";

interface Store {
  selectedOrder: IOrder | null;
  selectOrder: (order: IOrder | null) => void;
}

export const useSelectedOrderStore = create<Store>((set) => ({
  selectedOrder: null,
  selectOrder: (order) => set({ selectedOrder: order }),
}));
