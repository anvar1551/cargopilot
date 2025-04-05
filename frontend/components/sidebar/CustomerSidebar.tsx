"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useSidebarStore } from "@/app/store/useSidebarStore";
import { useAuth } from "@/app/context/AuthContext";

const navItems = [
  {
    label: "Dashboard", // ← NEW
    href: "/dashboard/customer", // route where you show those 3 summary cards
    icon: LayoutDashboard,
  },
  {
    label: "Create Order",
    href: "/dashboard/customer/create",
    icon: Plus,
  },
  {
    label: "My Orders",
    href: "/dashboard/customer/orders",
    icon: Package,
  },
];

export default function CustomerSidebar() {
  const pathname = usePathname();
  const { isCollapsed, toggleSidebar } = useSidebarStore();
  const { logout } = useAuth();

  return (
    <div
      className={cn(
        "h-full flex flex-col bg-[#111827] text-white transition-all rounded-xl shadow-lg",
        isCollapsed ? "w-[70px]" : "w-[250px]"
      )}
    >
      {/* Logo + Toggle */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
        {!isCollapsed && (
          <span className="font-bold text-xl tracking-tight">CargoPilot</span>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10 hover:text-white"
          onClick={toggleSidebar}
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-2 py-4">
        <nav className="flex flex-col gap-2">
          {navItems.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 px-4 py-2 rounded-md transition-colors text-sm font-medium",
                  isActive
                    ? "bg-white text-black"
                    : "hover:bg-white/10 text-white",
                  isCollapsed && "justify-center px-3"
                )}
              >
                <Icon className="h-5 w-5" />
                {!isCollapsed && label}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Logout */}
      <div className="border-t border-white/10 p-4">
        <Button
          onClick={logout}
          variant="ghost"
          className={cn(
            "w-full flex items-center gap-3 justify-start text-red-500 hover:bg-red-500 hover:text-white",
            isCollapsed && "justify-center"
          )}
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && "Logout"}
        </Button>
      </div>
    </div>
  );
}
