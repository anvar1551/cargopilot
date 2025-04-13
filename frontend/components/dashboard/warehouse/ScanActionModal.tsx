"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { useSmartScannerStore } from "@/app/store/useSmartScannerStore";
import { useState } from "react";
import { toast } from "sonner";
import apiClient from "@/lib/apiClient";

const actionOptions = [
  { label: "✅ Sort Package", value: "sort" },
  { label: "🚚 Mark In-Transit", value: "in-transit" },
  { label: "🚛 Assign to Driver", value: "assign-driver" },
];

export function ScanActionModal() {
  const { orderId, isModalOpen, closeModal } = useSmartScannerStore();
  const [selected, setSelected] = useState<(typeof actionOptions)[0] | null>(
    null
  );
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);

  const handleConfirm = async () => {
    if (!selected) return;

    try {
      if (selected.value === "sort") {
        await apiClient.patch("/orders/mark-sorted", {
          orderIds: [orderId],
        });
        toast.success("Package marked as sorted ✅");
      } else if (selected.value === "in-transit") {
        await apiClient.patch(`/orders/${orderId}/mark-in-transit`);
        toast.success("Package marked as in-transit 🚚");
      } else if (selected.value === "assign-driver") {
        if (!selectedDriver) {
          toast.error("Please select a driver");
          return;
        }
        await apiClient.patch(`/orders/${orderId}/assign-driver`, {
          driverId: selectedDriver,
        });
        toast.success("Driver assigned successfully 🧑‍✈️");
      }

      closeModal();
      setSelected(null);
      setSelectedDriver(null);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Manage Order: {orderId}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Select an action to perform:
          </p>

          {/* ✅ Working Combobox */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Select an action:</label>
            <Select
              value={selected?.value}
              onValueChange={(value) => {
                const found = actionOptions.find((a) => a.value === value);
                setSelected(found || null);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select action..." />
              </SelectTrigger>
              <SelectContent>
                {actionOptions.map((action) => (
                  <SelectItem key={action.value} value={action.value}>
                    {action.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selected?.value === "assign-driver" && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Assign a driver:</label>
                <Select
                  value={selectedDriver || ""}
                  onValueChange={(value) => setSelectedDriver(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select driver..." />
                  </SelectTrigger>
                  <SelectContent>
                    {/* TODO: replace with real driver data */}
                    <SelectItem value="driver1">John Diesel</SelectItem>
                    <SelectItem value="driver2">Emily Express</SelectItem>
                    <SelectItem value="driver3">Ali Autobahn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleConfirm}
            disabled={
              !selected ||
              (selected.value === "assign-driver" && !selectedDriver)
            }
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
