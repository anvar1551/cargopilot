import { create } from "zustand";

interface OrderModalState {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useOrderModalStore = create<OrderModalState>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
