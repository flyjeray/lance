import z from 'zod';
import {
  PaginationPayloadSchema,
  SingleEntityGetPayloadSchema,
} from './general';

export const CreateOrderPayloadSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  client: z.string(),
  price: z.number(),
  status: z.string(),
});

export type CreateOrderPayload = z.infer<typeof CreateOrderPayloadSchema>;

export const UpdateOrderPayloadSchema = z
  .object({
    data: z
      .object({
        title: z.string(),
        description: z.string(),
        price: z.number(),
      })
      .partial(),
  })
  .merge(SingleEntityGetPayloadSchema);

export type UpdateOrderPayload = z.infer<typeof UpdateOrderPayloadSchema>;

export const ChangeOrdersClientPayloadSchema = z.object({
  orderID: z.string(),
  newClientID: z.string(),
});

export type ChangeOrdersClientPayload = z.infer<
  typeof ChangeOrdersClientPayloadSchema
>;

export const ChangeOrdersStatusPayloadSchema = z.object({
  orderID: z.string(),
  newStatusID: z.string(),
});

export type ChangeOrdersStatusPayload = z.infer<
  typeof ChangeOrdersStatusPayloadSchema
>;

export const GetFilteredOrdersPayloadSchema = z
  .object({
    clientID: z.string(),
    minPrice: z.number(),
    maxPrice: z.number(),
    statusID: z.string(),
  })
  .partial()
  .merge(PaginationPayloadSchema);

export type GetFilteredOrdersPayload = z.infer<
  typeof GetFilteredOrdersPayloadSchema
>;
