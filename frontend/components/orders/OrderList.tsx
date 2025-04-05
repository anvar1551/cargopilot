// components/orders/OrderList.tsx
"use client";

import { Card } from "@/components/ui/card";
import { useSelectedOrderStore } from "@/app/store/useSelectedOrderStore";
import { useOrderSearchStore } from "@/app/store/useOrderSearchStore";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import apiClient from "@/lib/apiClient";

interface Order {
  id: string;
  _id: string;
  status: string;
  // add more fields if needed
}

export const OrderList = () => {
  const { selectedOrder, selectOrder } = useSelectedOrderStore();
  const { query, setQuery } = useOrderSearchStore();

  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await apiClient.get("/orders/my");
        const dataWithId = res.data.orders.map((order: Order) => ({
          ...order,
          id: order._id, // ✅ Add virtual id for frontend use
        }));

        setOrders(dataWithId);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) =>
    order._id.toLowerCase().includes(query.toLowerCase())
  );

  console.log(filteredOrders);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder="Search orders..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 shadow-sm rounded-md bg-white"
        />
      </div>
      {filteredOrders.map((order) => (
        <Card
          key={order.id}
          onClick={() => selectOrder(order)}
          className={`p-4 cursor-pointer transition-all ${
            selectedOrder?.id === order.id ? "bg-blue-100" : "hover:bg-muted"
          }`}
        >
          <div className="font-semibold">Order ID: {order.id}</div>
          <div className="text-sm text-muted-foreground">{order.status}</div>
        </Card>
      ))}
    </div>
  );
};
