import axiosInstance from '..';
import APIEndpoints from '@lance/shared/constants/endpoints';
import {
  PaginationPayload,
  SuccessfulAPIResponse,
} from '@lance/shared/models/api/general';
import { CreateClientPayload } from '@lance/shared/models/api/clients';
import { Client } from '@lance/shared/models/client';

const { prefix, endpoints } = APIEndpoints.clients;

export class OrdersAPI {
  static create = (data: CreateClientPayload) =>
    axiosInstance.post<SuccessfulAPIResponse<Client>>(
      prefix + endpoints.create,
      data
    );

  static get = (data: PaginationPayload) =>
    axiosInstance.get<SuccessfulAPIResponse<Client[]>>(prefix + endpoints.get, {
      params: data,
    });
}
