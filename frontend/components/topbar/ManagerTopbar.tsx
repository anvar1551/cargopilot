"use client";

import { Bell, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserDropdown } from "./UserDropdown"; // reuse existing dropdown

export const ManagerTopbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-muted px-6 py-4 flex items-center justify-between rounded-xl">
      <div>
        <h2 className="text-lg font-semibold flex items-center gap-2">
          🛠️ Manager Dashboard
        </h2>
        <p className="text-sm text-muted-foreground">
          Logged in as: <span className="font-medium">manager</span>
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Button variant="ghost" size="icon">
          <Bell className="w-6 h-6" />
        </Button>

        {/* Settings (Optional) */}
        <Button variant="ghost" size="icon">
          <Settings2 className="w-6 h-6" />
        </Button>

        {/* Avatar Dropdown */}
        <UserDropdown />
      </div>
    </header>
  );
};
