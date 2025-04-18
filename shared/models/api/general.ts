export type SuccessfulAPIResponse<T> = { data: T };
export type SuccessfulPaginatedAPIResponse<T> = SuccessfulAPIResponse<T> & {
  pagination: PaginationResponse;
};
type FailedAPIResponse = { error: unknown };

export type PaginationPayload = {
  page?: string;
  perPage?: string;
};

export type PaginationResponse = {
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
};

export type SingleEntityGetPayload = {
  id: string;
};

export type APIResponse<T> = SuccessfulAPIResponse<T> | FailedAPIResponse;

export type PaginatedAPIResponse<T> =
  | SuccessfulPaginatedAPIResponse<T>
  | FailedAPIResponse;
