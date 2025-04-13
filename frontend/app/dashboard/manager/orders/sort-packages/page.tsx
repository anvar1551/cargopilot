"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import apiClient from "@/lib/apiClient";

export default function SortPackagesPage() {
  const [scannedIds, setScannedIds] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleScan = (value: string) => {
    const trimmed = value.trim();

    if (!trimmed) return;
    if (scannedIds.includes(trimmed)) {
      toast.warning("Already scanned");
    } else {
      setScannedIds((prev) => [...prev, trimmed]);
      toast.success(`Scanned: ${trimmed}`);
    }

    setInputValue("");
    inputRef.current?.focus();
  };

  const handleSubmit = async () => {
    if (scannedIds.length === 0) return;

    try {
      const res = await apiClient.patch("/manager/mark-sorted", {
        orderIds: scannedIds,
      });

      toast.success(`✅ ${res.data.modifiedCount} orders marked as sorted`);
      setScannedIds([]);
    } catch (err) {
      console.error(err);
      toast.error("Failed to mark orders as sorted");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">📦 Sort Packages</h1>
      <p className="text-muted-foreground">
        Scan order QR codes to mark them as sorted. The system will prevent
        duplicates automatically.
      </p>

      <Input
        ref={inputRef}
        placeholder="Scan or type order ID..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleScan(inputValue);
          }
        }}
        autoFocus
      />

      <div className="border rounded-lg p-4 bg-white shadow-sm">
        <h2 className="font-medium mb-2">
          📋 Scanned Orders: {scannedIds.length}
        </h2>
        <ul className="text-sm max-h-40 overflow-y-auto space-y-1">
          {scannedIds.map((id, idx) => (
            <li key={idx} className="text-gray-700">
              {idx + 1}. {id}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-4">
        <Button onClick={handleSubmit} disabled={scannedIds.length === 0}>
          ✅ Mark All as Sorted
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => setScannedIds([])}
          disabled={scannedIds.length === 0}
        >
          ♻️ Clear List
        </Button>
      </div>
    </div>
  );
}
