import { Schema, model, Document, Types } from "mongoose";

export interface IWarehouse extends Document {
  name: string;
  location: string;
  code: string; // e.g., "WH-BER"
  createdBy: Types.ObjectId; // Manager who created this warehouse
}

const warehouseSchema = new Schema<IWarehouse>(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default model<IWarehouse>("Warehouse", warehouseSchema);
