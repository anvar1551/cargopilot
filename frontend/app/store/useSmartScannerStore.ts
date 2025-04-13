// store/useSmartScannerStore.ts
import { create } from "zustand";

interface SmartScannerState {
  orderId: string;
  setOrderId: (id: string) => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useSmartScannerStore = create<SmartScannerState>((set) => ({
  orderId: "",
  setOrderId: (id) => set({ orderId: id }),
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));
