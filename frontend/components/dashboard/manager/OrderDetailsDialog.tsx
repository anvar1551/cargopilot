"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSelectedOrderStore } from "@/app/store/useSelectedOrderStore";
import { OrderDetailsTabs } from "@/components/orders/OrderDetailsTabs"; // reused from customer

export const OrderDetailsDialog = () => {
  const { selectedOrder, selectOrder } = useSelectedOrderStore();

  if (!selectedOrder) return null;

  return (
    <Dialog
      open={!!selectedOrder}
      onOpenChange={(open) => !open && selectOrder(null)}
    >
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>
        {selectedOrder && <OrderDetailsTabs order={selectedOrder} />}
      </DialogContent>
    </Dialog>
  );
};
