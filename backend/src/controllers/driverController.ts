import { Request, Response, NextFunction } from "express";
import Order from "../models/Order";

export const getAssignedOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const driverId = req.user?.id;

    if (!driverId) {
      res.status(401).json({ message: "Unauthorized", status: 401 });
      return;
    }

    // Find orders assigned to this driver.
    const orders = await Order.find({ assignedDriver: driverId });
    if (!orders) {
      res
        .status(200)
        .json({ message: "No orders found on this driver", status: 200 });
    }

    res
      .status(200)
      .json({
        message: "Assigned orders fetched successfully",
        status: 200,
        orders,
      });
  } catch (error: any) {
    next(error);
  }
};

/**
 * Update an order's status as performed by the driver.
 * For example, a driver may mark an order as 'delivered'.
 */
export const updateOrderStatusByDriver = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    // For simplicity, we allow drivers to mark an order only as 'delivered'.
    if (status !== "delivered") {
      res
        .status(400)
        .json({
          message: "Driver can only mark orders as delivered",
          status: 400,
        });
      return;
    }

    // Ensure that the order belongs to this driver.
    const order = await Order.findOne({
      _id: orderId,
      assignedDriver: req.user?.id,
    });
    if (!order) {
      res
        .status(404)
        .json({
          message: "Order not found or not assigned to this driver",
          status: 404,
        });
      return;
    }

    // Update the order status.
    order.status = status;
    await order.save();

    res
      .status(200)
      .json({
        message: "Order status updated successfully",
        status: 200,
        order,
      });
  } catch (error: any) {
    next(error);
  }
};
