// components/orders/OrderDetails.tsx
"use client";

import { Card } from "@/components/ui/card";
import { useSelectedOrderStore } from "@/app/store/useSelectedOrderStore";
import { OrderDetailsTabs } from "./OrderDetailsTabs";

export const OrderDetails = () => {
  const { selectedOrder } = useSelectedOrderStore();

  if (!selectedOrder) {
    return (
      <Card className="p-6 text-muted-foreground text-center">
        Select an order to view details
      </Card>
    );
  }

  return <OrderDetailsTabs order={selectedOrder} />;
};
