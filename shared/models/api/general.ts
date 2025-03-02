export type ErrorResponse = {
  error: unknown;
};

export type APIResponse<T> =
  | ({ success: true } & T)
  | ({ success: false } & ErrorResponse);
