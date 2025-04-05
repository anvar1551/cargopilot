import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "customer" | "manager" | "pickpoint" | "driver";
  vehicle: {
    model: string;
    plateNumber: string;
    capacity: number; // in kg or volume
  };
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["customer", "manager", "pickpoint", "driver"],
      default: "customer",
    },
    vehicle: {
      model: String,
      plateNumber: String,
      capacity: Number,
    },
  },
  { timestamps: true }
);

export default model<IUser>("User", userSchema);
