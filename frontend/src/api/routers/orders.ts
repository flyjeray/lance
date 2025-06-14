import {
  ChangeOrdersClientPayload,
  ChangeOrdersStatusPayload,
  CreateOrderPayload,
  SwitchOrderCompletionStatusPayload,
  UpdateOrderPayload,
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

  static update = (data: UpdateOrderPayload) =>
    axiosInstance
      .post<SuccessfulAPIResponse<OrderBase>>(prefix + endpoints.update, data)
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

  static delete = (data: SingleEntityGetPayload) =>
    axiosInstance
      .delete<
        SuccessfulAPIResponse<string>
      >(prefix + endpoints.delete, { params: data })
      .then((res) => res.data);

  static switchCompleteStatus = (data: SwitchOrderCompletionStatusPayload) =>
    axiosInstance
      .put<
        SuccessfulAPIResponse<string>
      >(prefix + endpoints.switchCompleteStatus, data)
      .then((res) => res.data);
}
