import Order, { IOrder, IPackageDetails, PaymentMethod } from "../models/Order";
import { Types } from "mongoose";

// Dummy function to simulate label generation
const generateLabel = (orderId: string): string => {
  return `https://your-label-service.com/label/${orderId}`;
};

interface CreateOrderInput {
  customer: string;
  pickupAddress: string;
  dropoffAddress: string;
  packageDetails: IPackageDetails;
  paymentMethod: PaymentMethod;
}

export const createOrder = async (
  orderData: CreateOrderInput
): Promise<IOrder> => {
  const order = await Order.create({
    customer: new Types.ObjectId(orderData.customer),
    pickupAddress: orderData.pickupAddress,
    dropoffAddress: orderData.dropoffAddress,
    packageDetails: orderData.packageDetails,
    paymentMethod: orderData.paymentMethod,
  });

  // Generate label for the order using the order id
  const labelURL = generateLabel((order._id as Types.ObjectId).toString());
  order.labelURL = labelURL;
  await order.save();

  return order;
};

export const getOrderById = async (orderId: string): Promise<IOrder | null> => {
  return await Order.findById(orderId)
    .populate("customer")
    .populate("assignedDriver");
};

export const getOrdersByCustomer = async (
  customerId: string
): Promise<IOrder[]> => {
  return await Order.find({ customer: customerId })
    .populate("customer")
    .populate("assignedDriver")
    .sort({ createdAt: -1 });
};

// Adds Tracking history to the oreder object
export const addTrackingEvent = async (
  orderId: string,
  eventData: { status: string; region: string; warehouse: string }
): Promise<IOrder | null> => {
  const order = await Order.findById(orderId);
  if (!order) {
    throw new Error("Order not founded");
  }

  order.tracking.push({ ...eventData, timestamp: new Date() });

  // Update the currentWarehouse field to reflect the latest warehouse.
  order.currentWarehouse = eventData.warehouse;

  await order.save();
  return order;
};

// Update the status of an order.
export const updateOrderStatus = async (
  orderId: string,
  newStatus: "pending" | "in-transit" | "delivered" | "cancelled"
): Promise<IOrder | null> => {
  // Find the order by id and update its status.
  const order = await Order.findById(orderId);
  if (!order) {
    throw new Error("Order not found");
  }

  // Update the status field
  order.status = newStatus;
  await order.save();
  return order;
};
