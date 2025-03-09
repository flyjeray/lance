import { Document, Schema, Types, model } from 'mongoose';

export type Order = {
  title: string;
  description: string;
  is_completed: boolean;
  client: Types.ObjectId;
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
  client: {
    type: Schema.Types.ObjectId,
    ref: 'clients',
    required: true,
  },
});

const OrderModel = model<OrderDocument>('orders', orderSchema);

export { OrderModel };
