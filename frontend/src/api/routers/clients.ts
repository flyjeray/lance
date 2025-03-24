import axiosInstance from '..';
import APIEndpoints from '@lance/shared/constants/endpoints';
import {
  PaginationPayload,
  SingleEntityGetPayload,
  SuccessfulAPIResponse,
} from '@lance/shared/models/api/general';
import {
  ClientNameDictionary,
  CreateClientPayload,
} from '@lance/shared/models/api/clients';
import { Client } from '@lance/shared/models/client';

const { prefix, endpoints } = APIEndpoints.clients;

export class ClientsAPI {
  static create = (data: CreateClientPayload) =>
    axiosInstance.post<SuccessfulAPIResponse<Client>>(
      prefix + endpoints.create,
      data
    );

  static getPaginated = (data: PaginationPayload) =>
    axiosInstance.get<SuccessfulAPIResponse<Client[]>>(
      prefix + endpoints.getPaginated,
      {
        params: data,
      }
    );

  static getSingle = (data: SingleEntityGetPayload) =>
    axiosInstance.get<SuccessfulAPIResponse<Client>>(
      prefix + endpoints.getSingle,
      {
        params: data,
      }
    );

  static getNameDictionary = () =>
    axiosInstance.get<SuccessfulAPIResponse<ClientNameDictionary>>(
      prefix + endpoints.nameDictionary
    );
}
