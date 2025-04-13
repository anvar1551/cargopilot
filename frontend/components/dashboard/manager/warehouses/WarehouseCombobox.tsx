"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface Warehouse {
  _id: string;
  name: string;
}

interface Props {
  warehouses: Warehouse[];
  value: string | undefined;
  onChange: (value: string) => void;
}

export function WarehouseCombobox({ warehouses, value, onChange }: Props) {
  const [open, setOpen] = React.useState(false);

  const selectedWarehouse = warehouses.find((w) => w._id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedWarehouse?.name || "Select warehouse"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search warehouses..." />
          <CommandEmpty>No warehouse found.</CommandEmpty>
          <CommandGroup>
            {warehouses.map((wh) => (
              <CommandItem
                key={wh._id}
                onSelect={() => {
                  onChange(wh._id);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === wh._id ? "opacity-100" : "opacity-0"
                  )}
                />
                {wh.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
