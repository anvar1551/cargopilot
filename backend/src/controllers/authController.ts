import { Request, Response, NextFunction } from "express";
import { registerUser, loginUser } from "../services/authService";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const user = await registerUser({ name, email, password });
    res
      .status(201)
      .json({ message: "User registered successfully", status: 201, user });
  } catch (error: any) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const { token, role, user } = await loginUser(email, password);

    res.status(200).json({
      message: "Login successful",
      status: 200,
      token,
      role,
      user, // 👈 this is what frontend needs
    });
  } catch (error: any) {
    next(error);
  }
};
