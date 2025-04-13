// components/warehouse/SmartScanner.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScanActionModal } from "./ScanActionModal";
import { useSmartScannerStore } from "@/app/store/useSmartScannerStore";

export default function SmartScanner() {
  const [input, setInput] = useState("");
  const { setOrderId, openModal } = useSmartScannerStore();

  const handleScan = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setOrderId(trimmed);
    openModal();
    setInput("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">📦 Smart Scanner</h2>
        <p className="text-muted-foreground">
          Scan an order and choose an action.
        </p>
      </div>

      <div className="flex gap-4">
        <Input
          placeholder="Scan or enter Order ID..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleScan()}
        />
        <Button onClick={handleScan}>Scan</Button>
      </div>

      {/* Modal with actions */}
      <ScanActionModal />
    </div>
  );
}
