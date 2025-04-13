import { Router } from "express";
import { changeUserRole } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  createUser,
  getAllOrdersWithDetails,
  getDashboardStats,
  getAllDrivers,
  createWarehouse,
  getAllWarehouses,
  assignWarehouseToUserHandler,
} from "../controllers/managerController";
import {
  assignDriver,
  markOrdersAsSorted,
} from "../controllers/orderController";

const router = Router();

/**
 * Manager middleware to ensure the user is a manager.
 * If not, returns a 403 error.
 */
const managerMiddleware = (req: any, res: any, next: any): void => {
  if (req.user && req.user.role === "manager") {
    next();
  } else {
    res
      .status(403)
      .json({ message: "Access denied: Managers only", status: 403 });
  }
};

// Protected route: Only managers can update user roles.
// New endpoint: PATCH /api/manager/user-role
router.patch("/user-role", authMiddleware, managerMiddleware, changeUserRole);
router.get("/overview", authMiddleware, managerMiddleware, getDashboardStats); // 👈 NEW
router.get(
  "/orders",
  authMiddleware,
  managerMiddleware,
  getAllOrdersWithDetails
);
router.post("/users", authMiddleware, managerMiddleware, createUser);
router.patch(
  "/users/:userId/assign-warehouse",
  authMiddleware,
  managerMiddleware,
  assignWarehouseToUserHandler
);

router.get("/drivers", authMiddleware, managerMiddleware, getAllDrivers);
router.patch(
  "/orders/:orderId/assign-driver",
  authMiddleware,
  managerMiddleware,
  assignDriver
);

router.patch(
  "/mark-sorted",
  authMiddleware,
  managerMiddleware, // or a future warehouseMiddleware
  markOrdersAsSorted
);

router.post("/warehouse", authMiddleware, managerMiddleware, createWarehouse);
router.get("/warehouses", authMiddleware, managerMiddleware, getAllWarehouses);

export default router;
