import {
  CreateOrderPayload,
  CreateOrderResponse,
} from '@lance/shared/models/api/orders';
import axiosInstance from '..';
import APIEndpoints from '@lance/shared/constants/endpoints';

const { prefix, endpoints } = APIEndpoints.orders;

export class OrdersAPI {
  static create = (data: CreateOrderPayload) =>
    axiosInstance.post<CreateOrderResponse>(prefix + endpoints.create, data);
}
