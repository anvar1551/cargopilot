import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["customer", "manager", "driver", "pickpoint", "warehouse"]),
  warehouse: z.string().optional(),
});

export type UserSchema = z.infer<typeof userSchema>;
