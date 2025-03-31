import { OrderBase } from '../order';

export type CreateOrderPayload = {
  title: string;
  description?: string;
  client: string;
};

export type ExtendedOrder = OrderBase & {
  client_data: {
    name: string;
  };
};

export type ChangeOrdersClientPayload = {
  orderID: string;
  newClientID: string;
};
