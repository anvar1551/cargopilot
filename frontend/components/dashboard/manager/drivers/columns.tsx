// components/manager/drivers/columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { IDriver } from "@/types/driver"; // we'll define this in types

export const driverColumns: ColumnDef<IDriver>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {row.getValue("role")}
      </Badge>
    ),
  },
  {
    accessorKey: "vehicle",
    header: "Vehicle",
    cell: ({ row }) => {
      const vehicle = row.original.vehicle;
      return vehicle
        ? `${vehicle.model} (${vehicle.plateNumber})`
        : "No vehicle";
    },
  },
  {
    accessorKey: "orderCount",
    header: "Orders",
    cell: ({ row }) => (
      <span className="font-medium">{row.original.orderCount || 0}</span>
    ),
  },
];
