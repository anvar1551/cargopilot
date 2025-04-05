"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DriverTabProps {
  driver: {
    name: string;
    email: string;
    role: string;
    vehicle?: {
      model: string;
      plateNumber: string;
      capacity: number;
    };
  } | null;
}

export function DriverTab({ driver }: DriverTabProps) {
  if (!driver) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Driver Assigned</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This order has not been assigned to a driver yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Driver Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <p>
          <strong>Name:</strong> {driver.name}
        </p>
        <p>
          <strong>Email:</strong> {driver.email}
        </p>
        <p>
          <strong>Role:</strong> {driver.role}
        </p>
        {driver.vehicle ? (
          <>
            <p>
              <strong>Vehicle Model:</strong> {driver.vehicle.model}
            </p>
            <p>
              <strong>Plate Number:</strong> {driver.vehicle.plateNumber}
            </p>
            <p>
              <strong>Capacity:</strong> {driver.vehicle.capacity} kg
            </p>
          </>
        ) : (
          <p className="text-muted-foreground">No vehicle info provided.</p>
        )}
      </CardContent>
    </Card>
  );
}
