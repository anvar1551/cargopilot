import { Router } from "express";
import { changeUserRole } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

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

export default router;
