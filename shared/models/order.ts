import { Document, Schema, model } from 'mongoose';

export type Order = {
  title: string;
  description: string;
  is_completed: boolean;
};

type OrderDocument = Document & Order;

const orderSchema = new Schema<OrderDocument>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  is_completed: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const OrderModel = model<OrderDocument>('orders', orderSchema);

export { OrderModel };
