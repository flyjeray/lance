import { OrderBase } from '../order';

export type CreateOrderPayload = {
  title: string;
  description?: string;
  client: string;
  price: number;
  status: string;
};

export type UpdateOrderPayload = { id: string } & {
  data: Partial<
    Omit<OrderBase, '_id' | 'user_owner_id' | 'client_id' | 'status_id'>
  >;
};

export type ChangeOrdersClientPayload = {
  orderID: string;
  newClientID: string;
};

export type ChangeOrdersStatusPayload = {
  orderID: string;
  newStatusID: string;
};

export type GetFilteredOrdersPayload = Partial<{
  clientID: string;
  minPrice: number;
  maxPrice: number;
  statusID: string;
}>;
