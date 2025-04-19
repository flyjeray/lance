export type CreateOrderPayload = {
  title: string;
  description?: string;
  client: string;
  price: number;
  status: string;
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
