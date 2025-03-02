import {
  AuthCredentials,
  AuthMeResponse,
  AuthSignInResponse,
} from '@lance/shared/models/api/auth';
import axiosInstance from '..';

export class AuthAPI {
  static login = (credentials: AuthCredentials) =>
    axiosInstance.post<AuthSignInResponse>('/auth/login', credentials);

  static me = () => axiosInstance.get<AuthMeResponse>('/auth/me');
}
