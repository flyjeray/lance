import { Document, Schema, Types, model } from 'mongoose';

export type OrderBase = {
  _id: Types.ObjectId;
  title: string;
  description: string;
  price: number;
  client_id: Types.ObjectId;
  user_owner_id: Types.ObjectId;
  status_id: Types.ObjectId;
  is_completed: boolean;
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
  status_id: {
    type: Schema.Types.ObjectId,
    ref: 'statuses',
    required: true,
  },
  is_completed: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const OrderModel = model<OrderDocument>('orders', orderSchema);

export { OrderModel };
