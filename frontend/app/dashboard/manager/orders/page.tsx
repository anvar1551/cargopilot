import { OrderDetailsDialog } from "@/components/dashboard/manager/OrderDetailsDialog";
import { OrdersTable } from "@/components/dashboard/manager/OrdersTable";

export default function ManagerOrdersPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📦 Manage Orders</h1>
      <OrdersTable />
      <OrderDetailsDialog />
    </div>
  );
}
