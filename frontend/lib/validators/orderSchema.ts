// lib/validators/orderSchema.ts
import { z } from "zod";

export const orderSchema = z.object({
  pickupAddress: z.string().min(1, "Pickup address is required"),
  dropoffAddress: z.string().min(1, "Dropoff address is required"),
  paymentMethod: z.enum(["sender", "receiver"]),
  packageDetails: z.object({
    weight: z.coerce.number().min(0.1, "Weight must be a positive number"),
    dimensions: z.string().min(1, "Dimensions are required"),
    type: z.enum(["document", "box", "fragile"]),
    description: z.string().optional(),
  }),
});

export type OrderSchema = z.infer<typeof orderSchema>;
