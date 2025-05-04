import { SingleEntityGetPayloadSchema } from './general';
import z from 'zod';

export const CreateStatusPayloadSchema = z.object({
  label: z.string(),
});

export type CreateStatusPayload = z.infer<typeof CreateStatusPayloadSchema>;

export const DeleteStatusPayloadSchema = z
  .object({
    replacement_id: z.string(),
  })
  .merge(SingleEntityGetPayloadSchema);

export type DeleteStatusPayload = z.infer<typeof DeleteStatusPayloadSchema>;
