import { CreateOrderPayload } from '@lance/shared/models/api/orders';
import { Order } from '@lance/shared/models/order';
import axiosInstance from '..';
import APIEndpoints from '@lance/shared/constants/endpoints';
import {
  PaginationPayload,
  SuccessfulAPIResponse,
} from '@lance/shared/models/api/general';

const { prefix, endpoints } = APIEndpoints.orders;

export class OrdersAPI {
  static create = (data: CreateOrderPayload) =>
    axiosInstance.post<SuccessfulAPIResponse<Order>>(
      prefix + endpoints.create,
      data
    );

  static get = (data: PaginationPayload) =>
    axiosInstance.get<SuccessfulAPIResponse<Order[]>>(prefix + endpoints.get, {
      params: data,
    });
}
