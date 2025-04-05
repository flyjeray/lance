import { AuthCredentials, AuthMeResponse } from '@lance/shared/models/api/auth';
import { SuccessfulAPIResponse } from '@lance/shared/models/api/general';
import APIEndpoints from '@lance/shared/constants/endpoints';
import axiosInstance from '..';

const { prefix, endpoints } = APIEndpoints.auth;

export class AuthAPI {
  static login = (credentials: AuthCredentials) =>
    axiosInstance.post<SuccessfulAPIResponse<string>>(
      prefix + endpoints.login,
      credentials
    );

  static logout = () => axiosInstance.post(prefix + endpoints.logout);

  static me = () =>
    axiosInstance.get<SuccessfulAPIResponse<AuthMeResponse>>(
      prefix + endpoints.me
    );
}
