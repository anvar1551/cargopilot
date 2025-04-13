"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  PackageSearch,
  Truck,
  BarChart,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  UserRoundCog,
  Warehouse,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useSidebarStore } from "@/app/store/useSidebarStore";
import { useAuth } from "@/app/context/AuthContext";

const navItems = [
  {
    label: "Dashboard Overview",
    href: "/dashboard/manager",
    icon: LayoutDashboard,
  },
  {
    label: "Warehouses",
    href: "/dashboard/manager/warehouses",
    icon: Warehouse,
  },
  {
    label: "Manage Orders",
    href: "/dashboard/manager/orders",
    icon: PackageSearch,
  },
  {
    label: "Drivers",
    href: "/dashboard/manager/drivers",
    icon: Truck,
  },
  {
    label: "Customers",
    href: "/dashboard/manager/customers",
    icon: Users,
  },
  {
    label: "Manage Users",
    href: "/dashboard/manager/users/create",
    icon: UserRoundCog, // import from lucide-react
  },
  {
    label: "Analytics",
    href: "/dashboard/manager/analytics",
    icon: BarChart,
  },
  {
    label: "Settings",
    href: "/dashboard/manager/settings",
    icon: Settings,
  },
];

export default function ManagerSidebar() {
  const { logout } = useAuth();
  const pathname = usePathname();
  const { isCollapsed, toggleSidebar } = useSidebarStore();

  return (
    <div
      className={cn(
        "h-screen flex flex-col border-r border-gray-200 bg-white shadow-md rounded-xl m-2 transition-all",
        isCollapsed ? "w-[70px]" : "w-[250px]"
      )}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        {!isCollapsed && <span className="font-bold text-lg">CargoPilot</span>}
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>

      <ScrollArea className="flex-1 px-2 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm rounded-md transition-colors hover:bg-gray-100",
                isActive && "bg-gray-100 font-medium",
                isCollapsed && "justify-center"
              )}
            >
              <Icon className="w-5 h-5" />
              {!isCollapsed && item.label}
            </Link>
          );
        })}
      </ScrollArea>

      <div className="border-t border-gray-200 p-4">
        <Button
          variant="ghost"
          className="w-full flex items-center gap-2 justify-start text-red-600"
          onClick={logout}
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && "Logout"}
        </Button>
      </div>
    </div>
  );
}
