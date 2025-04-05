import { Router } from "express";
import {
  addTracking,
  createOrder,
  getMyOrders,
  getOrder,
  updateOrderStatus,
} from "../controllers/orderController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// Create oreder (protected route)
router.post("/", authMiddleware, createOrder);

router.get("/my", authMiddleware, getMyOrders);

// Get order by id (protected route)
router.get("/:id", authMiddleware, getOrder);

// Add tracking event (protected route)
router.post("/:id/tracking", authMiddleware, addTracking);

// Update order status (new protected route)
// This endpoint uses the PATCH HTTP method to update the status field
router.patch("/:id/status", authMiddleware, updateOrderStatus);

export default router;
