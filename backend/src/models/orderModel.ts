import mongoose, { Schema, ObjectId, Document } from "mongoose";

export interface IOrderItem {
  productTitle: string;
  productImage: string;
  quantity: number;
  unitPrice: number;
}

export interface IOrder extends Document {
  orderItems: ObjectId[];
  total: number;
  address: string;
  userId: ObjectId | string;
}

const OrderItemSchema = new Schema<IOrderItem>({
  productTitle: { type: String, required: true },
  productImage: { type: String, required: true },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
});

const OrderSchema = new Schema<IOrder>({
  orderItems: [OrderItemSchema],
  total: { type: Number, required: true },
  address: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

export const orderModel = mongoose.model<IOrder>("Order", OrderSchema);