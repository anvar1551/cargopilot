"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IOrder } from "@/types/order";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<IOrder>[] = [
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      const statusColor =
        status === "pending"
          ? "bg-yellow-100 text-yellow-800"
          : status === "in-transit"
          ? "bg-blue-100 text-blue-800"
          : status === "delivered"
          ? "bg-green-100 text-green-800"
          : status === "cancelled"
          ? "bg-red-100 text-red-800"
          : "bg-gray-100 text-gray-800";

      return <Badge className={`${statusColor} text-xs`}>{status}</Badge>;
    },
  },
  {
    accessorKey: "pickupAddress",
    header: "Pickup",
    cell: ({ row }) => {
      const address = row.getValue("pickupAddress") as string;
      return (
        <span title={address} className="truncate max-w-[150px] block">
          {address}
        </span>
      );
    },
  },
  {
    accessorKey: "dropoffAddress",
    header: "Dropoff",
  },
  {
    accessorKey: "customer.name",
    header: "Customer",
    cell: ({ row }) => row.original.customer?.name || "N/A",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const rawDate = row.getValue("createdAt") as string;
      const formatted = new Date(rawDate).toLocaleString();
      return <span className="text-sm text-muted-foreground">{formatted}</span>;
    },
  },
];
