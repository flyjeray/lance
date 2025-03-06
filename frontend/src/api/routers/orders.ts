import {
  CreateOrderPayload,
  CreateOrderResponse,
} from '@lance/shared/models/api/orders';
import axiosInstance from '..';

export class OrdersAPI {
  static create = (data: CreateOrderPayload) =>
    axiosInstance.post<CreateOrderResponse>('/orders/create', data);
}
