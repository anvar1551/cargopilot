"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { LogOut, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext"; // if you have custom auth hook

export const UserDropdown = () => {
  const router = useRouter();
  const { user } = useAuth();

  const userInitial = user?.name?.charAt(0).toUpperCase() || "U"; // fallback to "U"

  //   const user = {
  //     name: "Anvarbek Sharipov",
  //     email: "anvarbek1551@gmail.com",
  //     role: "customer",
  //   };

  const handleLogout = async () => {
    await fetch("/api/logout"); // adjust based on your logout logic
    router.push("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-9 w-9 border cursor-pointer outline-none ring-0 focus:ring-0 focus-visible:ring-0 hover:shadow-md transition-all duration-200">
          <AvatarImage src="" alt="User avatar" />
          <AvatarFallback>{userInitial}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 mt-2">
        <DropdownMenuLabel>
          <div className="text-sm font-medium">{user?.name}</div>
          <div className="text-xs text-muted-foreground truncate">
            {user?.email}
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => router.push("/dashboard/profile")}>
          <Settings className="mr-2 h-4 w-4" />
          Profile Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout} className="text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
