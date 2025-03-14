export type SuccessfulAPIResponse<T> = { data: T };
type FailedAPIResponse = { error: unknown };

export type PaginationPayload = {
  page: number;
  perPage: number;
};

export type PaginationResponse = {
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
};

export type APIResponse<T> = SuccessfulAPIResponse<T> | FailedAPIResponse;

export type PaginatedAPIResponse<T> =
  | (SuccessfulAPIResponse<T> & { pagination: PaginationResponse })
  | FailedAPIResponse;
