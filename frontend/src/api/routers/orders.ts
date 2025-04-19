import {
  ChangeOrdersClientPayload,
  ChangeOrdersStatusPayload,
  CreateOrderPayload,
} from '@lance/shared/models/api/orders';
import { OrderBase } from '@lance/shared/models/order';
import axiosInstance from '..';
import APIEndpoints from '@lance/shared/constants/endpoints';
import {
  PaginationPayload,
  SingleEntityGetPayload,
  SuccessfulAPIResponse,
  SuccessfulPaginatedAPIResponse,
} from '@lance/shared/models/api/general';

const { prefix, endpoints } = APIEndpoints.orders;

export class OrdersAPI {
  static create = (data: CreateOrderPayload) =>
    axiosInstance
      .post<SuccessfulAPIResponse<OrderBase>>(prefix + endpoints.create, data)
      .then((res) => res.data);

  static getPaginated = (data: PaginationPayload) =>
    axiosInstance
      .get<SuccessfulPaginatedAPIResponse<OrderBase[]>>(
        prefix + endpoints.getPaginated,
        {
          params: data,
        }
      )
      .then((res) => res.data);

  static getSingle = (data: SingleEntityGetPayload) =>
    axiosInstance
      .get<SuccessfulAPIResponse<OrderBase>>(prefix + endpoints.getSingle, {
        params: data,
      })
      .then((res) => res.data);

  static changeClient = (data: ChangeOrdersClientPayload) =>
    axiosInstance
      .put<
        SuccessfulAPIResponse<OrderBase>
      >(prefix + endpoints.changeClient, data)
      .then((res) => res.data);

  static changeStatus = (data: ChangeOrdersStatusPayload) =>
    axiosInstance
      .put<
        SuccessfulAPIResponse<OrderBase>
      >(prefix + endpoints.changeStatus, data)
      .then((res) => res.data);
}
