import {
  CreateOrderPayload,
  ExtendedOrder,
} from '@lance/shared/models/api/orders';
import { OrderBase } from '@lance/shared/models/order';
import axiosInstance from '..';
import APIEndpoints from '@lance/shared/constants/endpoints';
import {
  PaginationPayload,
  SingleEntityGetPayload,
  SuccessfulAPIResponse,
} from '@lance/shared/models/api/general';

const { prefix, endpoints } = APIEndpoints.orders;

export class OrdersAPI {
  static create = (data: CreateOrderPayload) =>
    axiosInstance.post<SuccessfulAPIResponse<OrderBase>>(
      prefix + endpoints.create,
      data
    );

  static getPaginated = (data: PaginationPayload) =>
    axiosInstance.get<SuccessfulAPIResponse<OrderBase[]>>(
      prefix + endpoints.getPaginated,
      {
        params: data,
      }
    );

  static getSingle = (data: SingleEntityGetPayload) =>
    axiosInstance.get<SuccessfulAPIResponse<ExtendedOrder>>(
      prefix + endpoints.getSingle,
      {
        params: data,
      }
    );
}
