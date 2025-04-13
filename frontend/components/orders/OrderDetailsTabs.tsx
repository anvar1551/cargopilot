"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DriverTab } from "./DriverTab";
import TrackingTimeline from "./TrackingTimeline";
import { useEffect, useState } from "react";
import apiClient from "@/lib/apiClient";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { IDriver } from "@/types/driver";
import { toast } from "sonner";

// interface OrderDetailsTabsProps {
//   orderId: string;
// }

interface OrderDetailsTabsProps {
  order: any; // We'll improve this with type later
}

export function OrderDetailsTabs({ order }: OrderDetailsTabsProps) {
  const [drivers, setDrivers] = useState<IDriver[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDriverId, setSelectedDriverId] = useState("");

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const res = await apiClient.get("/manager/drivers");
        setDrivers(res.data.data);
      } catch (error) {
        console.error("Failed to fetch drivers", error);
      } finally {
        setLoading(false);
      }
    };

    if (!order.assignedDriver) {
      fetchDrivers();
    }
  }, [order.assignedDriver]);

  const handleAssignDriver = async () => {
    try {
      await apiClient.patch(`/manager/orders/${order._id}/assign-driver`, {
        driverId: selectedDriverId,
      });
      toast.success("Driver assigned successfully");
      setSelectedDriverId("");
      window.location.reload(); // or refetch order if you use SWR/React Query
    } catch (error) {
      toast.error("Failed to assign driver");
      console.error(error);
    }
  };

  return (
    <Tabs defaultValue="info" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="info">Order Info</TabsTrigger>
        <TabsTrigger value="vehicle">Vehicle</TabsTrigger>
        <TabsTrigger value="driver">Driver</TabsTrigger>
        <TabsTrigger value="customer">Customer</TabsTrigger>
        <TabsTrigger value="tracking">Tracking</TabsTrigger>
      </TabsList>

      <TabsContent value="info">
        <div className="p-6 rounded-lg bg-white shadow-md space-y-2">
          <h2 className="text-xl font-semibold">Order Overview</h2>

          <div className="text-sm">
            <p>
              <strong>Status:</strong> {order.status}
            </p>
            <p>
              <strong>Pickup Address:</strong> {order.pickupAddress}
            </p>
            <p>
              <strong>Dropoff Address:</strong> {order.dropoffAddress}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Payment Method:</strong> {order.paymentMethod}
            </p>
          </div>

          <hr />

          <h3 className="text-md font-medium mt-4">Package Details</h3>
          <div className="text-sm">
            <p>
              <strong>Type:</strong> {order.packageDetails?.type}
            </p>
            <p>
              <strong>Weight:</strong> {order.packageDetails?.weight} kg
            </p>
            <p>
              <strong>Dimensions:</strong> {order.packageDetails?.dimensions}
            </p>
            {order.packageDetails?.description && (
              <p>
                <strong>Description:</strong> {order.packageDetails.description}
              </p>
            )}
          </div>

          {order.labelURL && (
            <>
              <hr />
              <a
                href={order.labelURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                View Label
              </a>
            </>
          )}
        </div>
      </TabsContent>

      <TabsContent value="vehicle">
        <div className="p-6 rounded-lg bg-white shadow-md space-y-2">
          <h2 className="text-xl font-semibold mb-2">Vehicle Info</h2>

          {order.assignedDriver ? (
            <>
              <p className="text-sm">
                <strong>Assigned Driver ID:</strong> {order.assignedDriver}
              </p>
              <p className="text-sm text-muted-foreground">
                (Vehicle details will be available once connected to a vehicle
                model.)
              </p>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              No driver assigned yet.
            </p>
          )}
        </div>
      </TabsContent>

      <TabsContent value="driver">
        <div className="p-6 rounded-lg bg-white shadow-md space-y-4">
          <h2 className="text-xl font-semibold mb-2">Driver Info</h2>

          {order.assignedDriver ? (
            <>
              <p>
                <strong>Name:</strong> {order.assignedDriver.name}
              </p>
              <p>
                <strong>Email:</strong> {order.assignedDriver.email}
              </p>
              <p>
                <strong>Role:</strong> {order.assignedDriver.role}
              </p>
            </>
          ) : (
            <>
              {loading ? (
                <p>Loading available drivers...</p>
              ) : (
                <>
                  <Select onValueChange={setSelectedDriverId}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select driver to assign" />
                    </SelectTrigger>
                    <SelectContent>
                      {drivers.map((driver) => (
                        <SelectItem key={driver._id} value={driver._id}>
                          {driver.name} ({driver.email})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button
                    onClick={handleAssignDriver}
                    disabled={!selectedDriverId}
                    className="mt-2"
                  >
                    Assign Driver
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      </TabsContent>

      <TabsContent value="customer">
        <div className="p-6 rounded-lg bg-white shadow-md space-y-2">
          <h2 className="text-xl font-semibold mb-2">Customer Info</h2>

          <p>
            <strong>Name:</strong> {order.customer.name}
          </p>
          <p>
            <strong>Email:</strong> {order.customer.email}
          </p>
          <p>
            <strong>Role:</strong> {order.customer.role}
          </p>
        </div>
      </TabsContent>

      <TabsContent value="tracking">
        <TrackingTimeline tracking={order.tracking} />
      </TabsContent>
    </Tabs>
  );
}
