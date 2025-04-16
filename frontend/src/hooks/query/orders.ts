import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { OrdersAPI } from '../../api/routers/orders';
import {
  PaginationPayload,
  SingleEntityGetPayload,
} from '@lance/shared/models/api/general';
import { ClientsQueryKeys } from './clients';
import { GetFilteredOrdersPayload } from '@lance/shared/models/api/orders';

export enum OrdersQueryKeys {
  GET_LIST = 'ORDERS_GET_LIST',
  GET_SINGLE = 'ORDERS_GET_SINGLE',
}

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: OrdersAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [OrdersQueryKeys.GET_LIST],
      });
    },
  });
};

export const useOrderList = (
  data: PaginationPayload & GetFilteredOrdersPayload
) =>
  useQuery({
    queryKey: [OrdersQueryKeys.GET_LIST, data],
    queryFn: () => OrdersAPI.getPaginated(data),
  });

export const useOrder = (data: SingleEntityGetPayload) =>
  useQuery({
    queryKey: [OrdersQueryKeys.GET_SINGLE, data.id],
    queryFn: () => OrdersAPI.getSingle(data),
  });

export const useChangeOrderClient = (orderID: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: OrdersAPI.changeClient,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [OrdersQueryKeys.GET_SINGLE, orderID],
      });
      queryClient.invalidateQueries({
        queryKey: [ClientsQueryKeys.GET_ORDERS],
      });
    },
  });
};
