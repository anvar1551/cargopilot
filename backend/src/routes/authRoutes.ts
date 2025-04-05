import { Router, Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { register, login } from "../controllers/authController";

const router = Router();

// Validation middleware for registration
const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array(), status: 400 });
    return;
  }
  next();
};

router.post(
  "/register",
  [
    body("name", "Name is required").notEmpty(),
    body("email", "Please include a valid email").isEmail(),
    body("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
  ],
  validateRegister,
  register
);

router.post("/login", login);

export default router;
