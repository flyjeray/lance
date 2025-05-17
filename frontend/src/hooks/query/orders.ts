import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { OrdersAPI } from '../../api/routers/orders';
import { SingleEntityGetPayload } from '@lance/shared/models/api/general';
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

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: OrdersAPI.update,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [OrdersQueryKeys.GET_SINGLE, variables.id],
      });
      queryClient.invalidateQueries({
        queryKey: [OrdersQueryKeys.GET_LIST],
      });
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: OrdersAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [OrdersQueryKeys.GET_LIST],
      });
    },
  });
};

export const useOrderList = (data: GetFilteredOrdersPayload) =>
  useQuery({
    queryKey: [OrdersQueryKeys.GET_LIST, data],
    queryFn: () => OrdersAPI.getPaginated(data),
  });

export const useOrder = (data: SingleEntityGetPayload) =>
  useQuery({
    queryKey: [OrdersQueryKeys.GET_SINGLE, data.id],
    queryFn: () => OrdersAPI.getSingle(data),
  });

export const useChangeOrderClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: OrdersAPI.changeClient,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [OrdersQueryKeys.GET_SINGLE, variables.orderID],
      });
      queryClient.invalidateQueries({
        queryKey: [ClientsQueryKeys.GET_ORDERS],
      });
    },
  });
};

export const useChangeOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: OrdersAPI.changeStatus,
    onSuccess: (_, payload) => {
      queryClient.invalidateQueries({
        queryKey: [OrdersQueryKeys.GET_SINGLE, payload.orderID],
      });
      queryClient.invalidateQueries({
        queryKey: [ClientsQueryKeys.GET_ORDERS],
      });
    },
  });
};

export const useSwitchOrderCompletionStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: OrdersAPI.switchCompleteStatus,
    onSuccess: (_, payload) => {
      queryClient.invalidateQueries({
        queryKey: [OrdersQueryKeys.GET_SINGLE, payload.id],
      });
      queryClient.invalidateQueries({
        queryKey: [OrdersQueryKeys.GET_LIST],
        exact: false,
      });
    },
  });
};
