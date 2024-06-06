import { Schema, model } from "mongoose";
import { Order } from "./order.interface";

const OrderSchema = new Schema({
  email: { type: String, required: true },
  productId: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
});

const OrderModel = model<Order>('Order', OrderSchema);


export default OrderModel;