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

export type GetFilteredOrdersPayload = Partial<{
  clientID: string;
  minPrice: number;
  maxPrice: number;
}>;
