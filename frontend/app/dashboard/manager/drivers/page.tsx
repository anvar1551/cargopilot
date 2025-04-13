"use client";

import { useEffect, useState } from "react";
import apiClient from "@/lib/apiClient";
import { DriversTable } from "@/components/dashboard/manager/drivers/DriversTable";
import { IDriver } from "@/types/driver";

export default function DriversPage() {
  const [drivers, setDrivers] = useState<IDriver[]>([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const res = await apiClient.get("/manager/drivers");
        setDrivers(res.data.data);
      } catch (error) {
        console.error("Error loading drivers:", error);
      }
    };
    fetchDrivers();
  }, []);

  return (
    <main className="p-6">
      <DriversTable data={drivers} />
    </main>
  );
}
