"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
import { orderSchema, OrderSchema } from "@/lib/validators/orderSchema";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import apiClient from "@/lib/apiClient";
import { useState } from "react";

export default function CreateOrderPage() {
  const form = useForm<OrderSchema>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      pickupAddress: "",
      dropoffAddress: "",
      paymentMethod: "sender",
      packageDetails: {
        weight: 0,
        dimensions: "",
        type: "document",
        description: "",
      },
    },
  });

  const [success, setSuccess] = useState(false);

  const onSubmit = async (data: OrderSchema) => {
    try {
      const formattedData = {
        pickupAddress: data.pickupAddress,
        dropoffAddress: data.dropoffAddress,
        paymentMethod: data.paymentMethod,
        packageDetails: {
          weight: data.packageDetails.weight,
          dimensions: data.packageDetails.dimensions,
          type: data.packageDetails.type,
          description: data.packageDetails.description,
        },
      };

      console.log(data);
      await apiClient.post("/orders", formattedData);
      setSuccess(true);
      form.reset();
    } catch (error) {
      console.error("Order creation failed", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">📦 Create a New Order</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Pickup Address */}
          <FormField
            control={form.control}
            name="pickupAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pickup Address</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Dropoff Address */}
          <FormField
            control={form.control}
            name="dropoffAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dropoff Address</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Weight */}
          <FormField
            control={form.control}
            name="packageDetails.weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight (kg)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Dimensions */}
          <FormField
            control={form.control}
            name="packageDetails.dimensions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dimensions (e.g. 30x20x10)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Type */}
          <FormField
            control={form.control}
            name="packageDetails.type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Package Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="document">Document</SelectItem>
                    <SelectItem value="box">Box</SelectItem>
                    <SelectItem value="fragile">Fragile</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="packageDetails.description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description (optional)</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Payment Method */}
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Method</FormLabel>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="sender"
                      checked={field.value === "sender"}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                    Sender
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="receiver"
                      checked={field.value === "receiver"}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                    Receiver
                  </label>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit">Create Order</Button>
        </form>
      </Form>

      {success && (
        <p className="text-green-600 mt-4 font-medium">✅ Order created!</p>
      )}
    </div>
  );
}
