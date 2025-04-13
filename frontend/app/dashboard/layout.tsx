"use client";
import { ReactNode } from "react";
import CustomerSidebar from "@/components/sidebar/CustomerSidebar";
import ManagerSidebar from "@/components/sidebar/ManagerSidebar";
import WarehouseSidebar from "@/components/sidebar/WarehouseSidebar";
import { CustomerTopbar } from "@/components/topbar/CustomerTopbar";
import { ManagerTopbar } from "@/components/topbar/ManagerTopbar";
import { WarehouseTopbar } from "@/components/topbar/WarehouseTopbar";
import { useAuth } from "@/app/context/AuthContext";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { role } = useAuth(); // 👈 comes from context

  return (
    <div className="flex h-screen bg-muted text-foreground">
      {role === "manager" && <ManagerSidebar />}
      {role === "warehouse" && <WarehouseSidebar />}
      {role === "customer" && <CustomerSidebar />}

      <div className="flex flex-col flex-1 overflow-hidden">
        {role === "manager" && <ManagerTopbar />}
        {role === "warehouse" && <WarehouseTopbar />}
        {role === "customer" && <CustomerTopbar />}

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
