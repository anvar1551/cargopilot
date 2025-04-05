// app/dashboard/customer/orders/page.tsx
import { OrderList } from "@/components/orders/OrderList";
import { OrderDetails } from "@/components/orders/OrderDetails";

export default function OrdersPage() {
  return (
    <div className="flex h-full p-4 gap-4">
      <div className="w-[30%]">
        <OrderList />
      </div>
      <div className="flex-1">
        <OrderDetails />
      </div>
    </div>
  );
}
