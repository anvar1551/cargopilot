import { Router } from "express";
import {
  getAssignedOrders,
  updateOrderStatusByDriver,
} from "../controllers/driverController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

/**
 * Driver-specific middleware to check if the logged-in user has the 'driver' role.
 * This middleware ensures that only users with role 'driver' can access these routes.
 */
const driverMiddleware = (req: any, res: any, next: any): void => {
  if (req.user && req.user.role === "driver") {
    next();
  } else {
    res
      .status(403)
      .json({ message: "Access denied: Drivers only", status: 403 });
  }
};

// Route to get all orders assigned to the driver (protected and driver-only)
router.get("/", authMiddleware, driverMiddleware, getAssignedOrders);

// Route to update the order status by a driver (protected and driver-only)
router.patch(
  "/:id/status",
  authMiddleware,
  driverMiddleware,
  updateOrderStatusByDriver
);

export default router;
