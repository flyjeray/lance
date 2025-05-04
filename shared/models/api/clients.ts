import {
  PaginationPayloadSchema,
  SingleEntityGetPayloadSchema,
} from './general';
import z from 'zod';

export const CreateClientPayloadSchema = z.object({
  name: z.string(),
});

export type CreateClientPayload = z.infer<typeof CreateClientPayloadSchema>;

export type ClientNameDictionary = Record<string, string>;

export const UpdateClientPayloadSchema = z
  .object({
    data: z
      .object({
        name: z.string(),
        description: z.string(),
      })
      .partial(),
  })
  .merge(SingleEntityGetPayloadSchema);

export type UpdateClientPayload = z.infer<typeof UpdateClientPayloadSchema>;

export const GetClientOrdersPayloadSchema = SingleEntityGetPayloadSchema.merge(
  PaginationPayloadSchema
);

export type GetClientOrdersPayload = z.infer<
  typeof GetClientOrdersPayloadSchema
>;
