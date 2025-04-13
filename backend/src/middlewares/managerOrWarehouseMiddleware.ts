// middleware/managerOrWarehouseMiddleware.ts
import { Request, Response, NextFunction } from "express";
export function managerOrWarehouseMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const role = req.user?.role;
  if (role !== "manager" && role !== "warehouse") {
    res.status(403).json({ message: "Forbidden" });
  }
  next();
}
