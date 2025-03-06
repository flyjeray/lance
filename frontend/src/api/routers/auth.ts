import {
  AuthCredentials,
  AuthMeResponse,
  AuthSignInResponse,
} from '@lance/shared/models/api/auth';
import APIEndpoints from '@lance/shared/constants/endpoints';
import axiosInstance from '..';

const { prefix, endpoints } = APIEndpoints.auth;

export class AuthAPI {
  static login = (credentials: AuthCredentials) =>
    axiosInstance.post<AuthSignInResponse>(
      prefix + endpoints.login,
      credentials
    );

  static me = () => axiosInstance.get<AuthMeResponse>(prefix + endpoints.me);
}
