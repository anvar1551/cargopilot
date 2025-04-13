// types/order.ts

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: "customer" | "manager" | "pickpoint" | "driver";
  vehicle?: {
    model: string;
    plateNumber: string;
    capacity: number;
  };
}

export interface IPackageDetails {
  weight: number;
  dimensions: string;
  type: string;
  description?: string;
}

export interface ITrackingEvent {
  timestamp: string;
  status: string;
  region: string;
  warehouse: string;
}

export interface IOrder {
  _id: string;
  customer: IUser;
  pickupAddress: string;
  dropoffAddress: string;
  status: "pending" | "in-transit" | "assigned" | "delivered" | "cancelled";
  labelURL?: string;
  packageDetails: IPackageDetails;
  paymentMethod: "sender" | "receiver";
  assignedDriver?: IUser;
  currentWarehouse?: string;
  tracking: ITrackingEvent[];
  createdAt: string;
  updatedAt: string;
}
