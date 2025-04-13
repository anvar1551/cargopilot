// components/dashboard/ManagerOverviewCards.tsx
"use client";

import { useEffect, useState } from "react";
import apiClient from "@/lib/apiClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface Stats {
  totalOrders: number;
  pendingOrders: number;
  assignedOrders: number;
  activeDrivers: number;
}

export default function ManagerOverviewCards() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await apiClient.get("/manager/overview");
        setStats(res.data.data);
      } catch (error) {
        console.error("Failed to fetch stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading || !stats) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="animate-spin w-6 h-6" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Total Orders</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold">
          {stats.totalOrders}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pending Orders</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold text-yellow-500">
          {stats.pendingOrders}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Assigned Orders</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold text-green-600">
          {stats.assignedOrders}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Drivers</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold text-blue-500">
          {stats.activeDrivers}
        </CardContent>
      </Card>
    </div>
  );
}
