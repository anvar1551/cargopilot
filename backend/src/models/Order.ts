import { Schema, model, Document, Types } from "mongoose";

export interface IPackageDetails {
  weight: number; // in kg
  dimensions: string; // e.g., "30x20x10"
  type: string; // e.g., "document", "parcel", "box"
  description?: string;
}

export type PaymentMethod = "sender" | "receiver";

export interface ITrackingEvent {
  timestamp: Date;
  status: string;
  region: string;
  warehouse: string;
}

export interface IOrder extends Document {
  customer: Types.ObjectId;
  pickupAddress: string;
  dropoffAddress: string;
  status: "pending" | "in-transit" | "assigned" | "delivered" | "cancelled";
  labelURL?: string;
  packageDetails: IPackageDetails;
  paymentMethod: PaymentMethod;
  assignedDriver?: Types.ObjectId;
  currentWarehouse?: string;
  tracking: ITrackingEvent[];
  createdAt: Date;
  updatedAt: Date;
}

const packageDetailsSchema = new Schema<IPackageDetails>({
  weight: { type: Number, required: true },
  dimensions: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String },
});

const trackingEventSchema = new Schema<ITrackingEvent>({
  timestamp: { type: Date, default: Date.now },
  status: { type: String, required: true },
  region: { type: String, required: true },
  warehouse: { type: String, required: true },
});

const orderSchema = new Schema<IOrder>(
  {
    customer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    pickupAddress: { type: String, required: true },
    dropoffAddress: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "in-transit", "assigned", "delivered", "cancelled"],
      default: "pending",
    },
    labelURL: { type: String },
    packageDetails: { type: packageDetailsSchema, required: true },
    paymentMethod: {
      type: String,
      enum: ["sender", "receiver"],
      required: true,
    },
    assignedDriver: { type: Schema.Types.ObjectId, ref: "User" },
    currentWarehouse: { type: String },
    tracking: { type: [trackingEventSchema], default: [] },
  },
  { timestamps: true }
);

export default model<IOrder>("Order", orderSchema);
