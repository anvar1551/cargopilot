import { Request, Response, NextFunction } from "express";
import * as orderService from "../services/orderService";

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { pickupAddress, dropoffAddress, packageDetails, paymentMethod } =
      req.body;
    const customer = req.user?.id; // 👈 Extracted from JWT

    if (
      !customer ||
      !pickupAddress ||
      !dropoffAddress ||
      !packageDetails ||
      !paymentMethod
    ) {
      res.status(400).json({ message: "All fields are required", status: 400 });
      return;
    }

    const order = await orderService.createOrder({
      customer,
      pickupAddress,
      dropoffAddress,
      packageDetails,
      paymentMethod,
    });
    res
      .status(201)
      .json({ message: "Order created successfully", status: 201, order });
  } catch (error: any) {
    next(error);
  }
};

export const getOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const orderId = req.params.id;
    const order = await orderService.getOrderById(orderId);
    if (!order) {
      res.status(404).json({ message: "Order not found", status: 404 });
      return;
    }

    res
      .status(200)
      .json({ message: "Order fetched successfully", status: 200, order });
  } catch (error: any) {
    next(error);
  }
};

export const getMyOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const customerId = req.user?.id;

    if (!customerId) {
      res.status(401).json({ message: "Unauthorized", status: 401 });
      return;
    }

    const orders = await orderService.getOrdersByCustomer(customerId);

    res.status(200).json({
      message: "Orders fetched successfully",
      status: 200,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

export const addTracking = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const orderId = req.params.id;
    const { status, region, warehouse } = req.body;

    if (!status || !region || !warehouse) {
      res.status(400).json({
        message: "Status, region, and warehouse are required",
        status: 400,
      });
      return;
    }

    const order = await orderService.addTrackingEvent(orderId, {
      status,
      region,
      warehouse,
    });
    res.status(200).json({
      message: "Tracking event added successfully",
      status: 200,
      order,
    });
  } catch (error: any) {
    next(error);
  }
};

// Function updates the order status
export const updateOrderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    // Basic validation: ensure a valid status is provided
    const validStatuses = ["pending", "in-transit", "delivered", "cancelled"];
    if (!status || !validStatuses.includes(status)) {
      res.status(400).json({ message: "Invalid status provided", status: 400 });
      return;
    }

    const order = await orderService.updateOrderStatus(orderId, status);
    if (!order) {
      res.status(404).json({ message: "Order not found", status: 404 });
      return;
    }

    res
      .status(200)
      .json({ message: "Order status updated successfully", status, order });
  } catch (error: any) {
    next(error);
  }
};
