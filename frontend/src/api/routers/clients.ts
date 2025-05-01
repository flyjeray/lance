import axiosInstance from '..';
import APIEndpoints from '@lance/shared/constants/endpoints';
import {
  PaginationPayload,
  SingleEntityGetPayload,
  SuccessfulAPIResponse,
  SuccessfulPaginatedAPIResponse,
} from '@lance/shared/models/api/general';
import {
  ClientNameDictionary,
  CreateClientPayload,
  UpdateClientPayload,
} from '@lance/shared/models/api/clients';
import { Client } from '@lance/shared/models/client';
import { OrderBase } from '@lance/shared/models/order';

const { prefix, endpoints } = APIEndpoints.clients;

export class ClientsAPI {
  static create = (data: CreateClientPayload) =>
    axiosInstance
      .post<SuccessfulAPIResponse<Client>>(prefix + endpoints.create, data)
      .then((res) => res.data);

  static update = (data: UpdateClientPayload) =>
    axiosInstance
      .post<SuccessfulAPIResponse<Client>>(prefix + endpoints.update, data)
      .then((res) => res.data);

  static getPaginated = (data: PaginationPayload) =>
    axiosInstance
      .get<SuccessfulPaginatedAPIResponse<Client[]>>(
        prefix + endpoints.getPaginated,
        {
          params: data,
        }
      )
      .then((res) => res.data);

  static getSingle = (data: SingleEntityGetPayload) =>
    axiosInstance
      .get<SuccessfulAPIResponse<Client>>(prefix + endpoints.getSingle, {
        params: data,
      })
      .then((res) => res.data);

  static getNameDictionary = () =>
    axiosInstance
      .get<
        SuccessfulAPIResponse<ClientNameDictionary>
      >(prefix + endpoints.nameDictionary)
      .then((res) => res.data);

  static getOrders = (data: SingleEntityGetPayload & PaginationPayload) =>
    axiosInstance
      .get<
        SuccessfulPaginatedAPIResponse<OrderBase[]>
      >(prefix + endpoints.getClientOrders, { params: data })
      .then((res) => res.data);

  static delete = (data: SingleEntityGetPayload) =>
    axiosInstance
      .delete<
        SuccessfulAPIResponse<string>
      >(prefix + endpoints.delete, { params: data })
      .then((res) => res.data);
}
