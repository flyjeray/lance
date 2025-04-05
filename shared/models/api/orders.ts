export type CreateOrderPayload = {
  title: string;
  description?: string;
  client: string;
  price: number;
};

export type ChangeOrdersClientPayload = {
  orderID: string;
  newClientID: string;
};
