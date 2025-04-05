"use client";

import { Button } from "@/components/ui/button";
import { Bell, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // new
// import { useRouter } from "next/navigation";

export const CustomerTopbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-muted px-6 py-4 flex items-center justify-between rounded-xl">
      <div>
        <h2 className="text-lg font-semibold flex items-center gap-2">
          📦 Welcome back, Customer
        </h2>
        <p className="text-sm text-muted-foreground">
          Logged in as: <span className="font-medium">customer</span>
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* Notification icon */}
        <Button variant="ghost" size="icon">
          <Bell className="w-7 h-7" />
        </Button>

        {/* Avatar */}
        <Avatar>
          <AvatarImage src="" alt="User avatar" />
          <AvatarFallback>
            <User className="w-6 h-6" />
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};
