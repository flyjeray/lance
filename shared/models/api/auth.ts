import { APIResponse } from './general';

export type AuthCredentials = {
  login: string;
  password: string;
};

export type AuthSignInResponse = APIResponse<{
  token: string;
  uid: unknown;
}>;

export type AuthMeResponse = APIResponse<{
  name: string;
}>;
