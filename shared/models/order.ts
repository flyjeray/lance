import { Document, Schema, Types, model } from 'mongoose';

export type OrderBase = {
  _id: Types.ObjectId;
  title: string;
  description: string;
  is_completed: boolean;
  price: number;
  client_id: Types.ObjectId;
  user_owner_id: Types.ObjectId;
};

type OrderDocument = Document & OrderBase;

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
  price: {
    type: Number,
    required: true,
  },
  client_id: {
    type: Schema.Types.ObjectId,
    ref: 'clients',
    required: true,
  },
  user_owner_id: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
});

const OrderModel = model<OrderDocument>('orders', orderSchema);

export { OrderModel };
