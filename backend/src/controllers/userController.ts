import { Request, Response, NextFunction } from "express";
import { updateUserRole } from "../services/userService";

export const changeUserRole = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, newRole } = req.body;

    // Basic runtime validation: ensure both userId and newRole are provided.
    if (!userId || !newRole) {
      res
        .status(400)
        .json({ message: "User ID and new role are required", status: 400 });
      return;
    }

    // Allowed roles check.
    const allowedRoles = ["customer", "manager", "pickpoint", "driver"];
    if (!allowedRoles.includes(newRole)) {
      res.status(400).json({ message: "Invalid role provided", status: 400 });
      return;
    }

    // Call the service function to update the user role.
    const updatedUser = await updateUserRole(userId, newRole);
    if (!updatedUser) {
      res.status(404).json({ message: "User not found", status: 404 });
      return;
    }

    res
      .status(200)
      .json({
        message: "User role updated successfully",
        status: 200,
        user: updatedUser,
      });
  } catch (error: any) {
    next(error);
  }
};
