import z from 'zod';

export type SuccessfulAPIResponse<T> = { data: T };
export type SuccessfulPaginatedAPIResponse<T> = SuccessfulAPIResponse<T> & {
  pagination: PaginationResponse;
};
type FailedAPIResponse = { error: unknown };

export const PaginationPayloadSchema = z
  .object({
    page: z.string(),
    perPage: z.string(),
  })
  .partial();

export type PaginationPayload = z.infer<typeof PaginationPayloadSchema>;

export type PaginationResponse = {
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
};

export const SingleEntityGetPayloadSchema = z.object({
  id: z.string(),
});

export type SingleEntityGetPayload = z.infer<
  typeof SingleEntityGetPayloadSchema
>;

export type APIResponse<T> = SuccessfulAPIResponse<T> | FailedAPIResponse;

export type PaginatedAPIResponse<T> =
  | SuccessfulPaginatedAPIResponse<T>
  | FailedAPIResponse;
