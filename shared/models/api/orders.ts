import { APIResponse } from './general';
import { Order } from '../order';

export type CreateOrderPayload = {
  title: string;
  description?: string;
};

export type CreateOrderResponse = APIResponse<{ data: Order }>;
