// app/dashboard/page.tsx
"use client";

import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function DashboardHome() {
  const { role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (role === "customer") router.push("/dashboard/customer");
    if (role === "manager") router.push("/dashboard/manager");
    if (role === "driver") router.push("/dashboard/driver");
  }, [role, router]);

  return <p>Redirecting...</p>;
}
