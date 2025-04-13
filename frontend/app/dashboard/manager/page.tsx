// app/dashboard/manager/page.tsx
import ManagerOverviewCards from "@/components/dashboard/manager/ManagerOverviewCards";

export default function ManagerDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">📊 Manager Overview</h1>
      <ManagerOverviewCards />
    </div>
  );
}
