import { Types } from "mongoose";
import User, { IUser } from "../models/User";
import bcrypt from "bcrypt";

export const updateUserRole = async (
  userId: string,
  newRole: "customer" | "manager" | "pickpoint" | "driver"
): Promise<IUser | null> => {
  // Update the user's role in the database and return the updated document.
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { role: newRole },
    { new: true } // Return the updated document.
  );
  return updatedUser;
};

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  role: "customer" | "driver" | "manager" | "pickpoint" | "warehouse";
  warehouse?: Types.ObjectId;
}

export const createUserWithRole = async ({
  name,
  email,
  password,
  role,
  warehouse,
}: CreateUserInput): Promise<IUser> => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  if (role === "warehouse" && !warehouse) {
    throw new Error("Warehouse ID is required for warehouse role");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const userData: Partial<IUser> = {
    name,
    email,
    password: hashedPassword,
    role,
  };

  // ✅ Only assign warehouse if role is warehouse
  if (role === "warehouse") {
    if (!warehouse) {
      throw new Error("Warehouse ID is required for warehouse role");
    }
    userData.warehouse = warehouse;
  }

  const user = await User.create(userData);
  return user;
};

// Assign warehouse to users
export const assignWarehouseToUser = async (
  userId: string,
  warehouseId: string
): Promise<IUser | null> => {
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { warehouse: warehouseId },
    { new: true }
  );

  return updatedUser;
};
