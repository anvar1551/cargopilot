import { ReactNode } from "react";
// import { cookies } from "next/headers"; // for later dynamic role handling
import CustomerSidebar from "@/components/sidebar/CustomerSidebar";
import { CustomerTopbar } from "@/components/topbar/CustomerTopbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  // 🔐 Later this will come from token or context
  const role = "customer";

  return (
    <div className="flex h-screen bg-muted p-2   text-foreground">
      {/* Sidebar (left) */}
      {role === "customer" && <CustomerSidebar />}
      {/* Future: ManagerSidebar, DriverSidebar here */}

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar (top) */}
        {role === "customer" && <CustomerTopbar />}
        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
