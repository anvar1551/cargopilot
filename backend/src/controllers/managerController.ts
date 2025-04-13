// backend/controllers/managerController.ts
import { Request, Response, NextFunction } from "express";
import Order from "../models/Order";
import User from "../models/User";
import {
  assignWarehouseToUser,
  createUserWithRole,
} from "../services/userService";
import Warehouse from "../models/Warehouse";

export const getDashboardStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: "pending" });
    const assignedOrders = await Order.countDocuments({
      assignedDriver: { $ne: null },
    });
    const activeDrivers = await User.countDocuments({ role: "driver" });

    res.status(200).json({
      status: 200,
      data: {
        totalOrders,
        pendingOrders,
        assignedOrders,
        activeDrivers,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getAllOrdersWithDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const orders = await Order.find()
      .populate("customer", "name email role")
      .populate("assignedDriver")
      .sort({ createdAt: -1 });

    res.status(200).json({ status: 200, data: orders });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password, role, warehouse } = req.body;

    if (!name || !email || !password || !role) {
      res.status(400).json({ message: "All fields are required", status: 400 });
    }

    const user = await createUserWithRole({
      name,
      email,
      password,
      role,
      warehouse,
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAllDrivers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const drivers = await User.find({ role: "driver" });

    const driverData = await Promise.all(
      drivers.map(async (driver) => {
        const ordersCount = await Order.countDocuments({
          assignedDriver: driver._id,
        });

        return {
          _id: driver._id,
          name: driver.name,
          email: driver.email,
          role: driver.role,
          vehicle: driver.vehicle,
          orderCount: ordersCount,
        };
      })
    );

    res.status(200).json({ status: 200, data: driverData });
  } catch (error) {
    next(error);
  }
};

export const createWarehouse = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, location, code } = req.body;

    if (!name || !location || !code) {
      res.status(400).json({ message: "All fields are required", status: 400 });
    }

    const existing = await Warehouse.findOne({ code });

    if (existing) {
      res
        .status(409)
        .json({ message: "Warehouse code already exists", status: 409 });
    }

    const warehouse = await Warehouse.create({
      name,
      location,
      code,
      createdBy: req.user!.id,
    });

    res.status(201).json({
      message: "Warehouse created successfully",
      status: 201,
      warehouse,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllWarehouses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const warehouses = await Warehouse.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "Warehouses fetched successfully",
      status: 200,
      data: warehouses,
    });
  } catch (error) {
    next(error);
  }
};

export const assignWarehouseToUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const { warehouseId } = req.body;

    const user = await assignWarehouseToUser(userId, warehouseId);

    res.status(200).json({
      message: "Warehouse assigned successfully",
      status: 200,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
