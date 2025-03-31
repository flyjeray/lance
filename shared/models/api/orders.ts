export type CreateOrderPayload = {
  title: string;
  description?: string;
  client: string;
};

export type ChangeOrdersClientPayload = {
  orderID: string;
  newClientID: string;
};
