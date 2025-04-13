// components/warehouse/WarehouseTopbar.tsx
"use client";

import { Bell, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserDropdown } from "@/components/topbar/UserDropdown"; // same dropdown used in manager

export const WarehouseTopbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-muted px-6 py-4 flex items-center justify-between rounded-xl">
      <div>
        <h2 className="text-lg font-semibold flex items-center gap-2">
          📦 Warehouse Dashboard
        </h2>
        <p className="text-sm text-muted-foreground">
          Logged in as: <span className="font-medium">warehouse</span>
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="w-6 h-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings2 className="w-6 h-6" />
        </Button>
        <UserDropdown />
      </div>
    </header>
  );
};
