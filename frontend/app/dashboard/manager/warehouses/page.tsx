"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CreateWarehouseModal } from "@/components/dashboard/manager/warehouses/CreateWarehouseModal";
import apiClient from "@/lib/apiClient";
import { IWarehouse } from "@/types/warehouse";

export default function WarehousesPage() {
  const [warehouses, setWarehouses] = useState<IWarehouse[]>([]);
  const [open, setOpen] = useState(false);

  const fetchWarehouses = async () => {
    try {
      const res = await apiClient.get("/manager/warehouses");
      setWarehouses(res.data.data);
    } catch (error) {
      toast.error("Failed to load warehouses");
    }
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Warehouses</h1>
        <Button onClick={() => setOpen(true)}>➕ Create Warehouse</Button>
      </div>

      <div className="border rounded-md bg-white shadow-sm p-4">
        <h2 className="font-medium mb-2">
          📋 Registered Warehouses ({warehouses.length})
        </h2>
        <ul className="text-sm space-y-1">
          {warehouses.map((wh) => (
            <li key={wh._id}>
              <strong>{wh.name}</strong> – {wh.location} ({wh.code})
            </li>
          ))}
        </ul>
      </div>

      <CreateWarehouseModal
        open={open}
        onClose={() => {
          setOpen(false);
          fetchWarehouses();
        }}
      />
    </div>
  );
}
