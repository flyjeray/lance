import axiosInstance from '..';
import APIEndpoints from '@lance/shared/constants/endpoints';
import { SuccessfulAPIResponse } from '@lance/shared/models/api/general';
import {
  CreateStatusPayload,
  DeleteStatusPayload,
} from '@lance/shared/models/api/statuses';
import { Status } from '@lance/shared/models/status';

const { prefix, endpoints } = APIEndpoints.statuses;

export class StatusesAPI {
  static create = (data: CreateStatusPayload) =>
    axiosInstance
      .post<SuccessfulAPIResponse<Status>>(prefix + endpoints.create, data)
      .then((res) => res.data);

  static get = () =>
    axiosInstance
      .get<SuccessfulAPIResponse<Status[]>>(prefix + endpoints.get)
      .then((res) => res.data);

  static delete = (data: DeleteStatusPayload) =>
    axiosInstance
      .delete<
        SuccessfulAPIResponse<string>
      >(prefix + endpoints.delete, { params: data })
      .then((res) => res.data);
}
