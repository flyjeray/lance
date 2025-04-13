import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ClientsAPI } from '../../api/routers/clients';
import {
  PaginationPayload,
  SingleEntityGetPayload,
} from '@lance/shared/models/api/general';
import { OrdersQueryKeys } from './orders';

export enum ClientsQueryKeys {
  GET_LIST = 'CLIENTS_GET_LIST',
  GET_NAMES = 'CLIENTS_GET_NAMES',
  GET_SINGLE = 'CLIENTS_GET_SINGLE',
  GET_ORDERS = 'CLIENTS_GET_ORDERS',
}

export const useCreateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ClientsAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ClientsQueryKeys.GET_LIST],
      });
      queryClient.invalidateQueries({
        queryKey: [ClientsQueryKeys.GET_NAMES],
      });
    },
  });
};

export const useDeleteClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ClientsAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ClientsQueryKeys.GET_LIST],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: [ClientsQueryKeys.GET_NAMES],
      });
      queryClient.invalidateQueries({
        queryKey: [OrdersQueryKeys.GET_LIST],
      });
    },
  });
};

export const useClientList = (data: PaginationPayload) =>
  useQuery({
    queryKey: [ClientsQueryKeys.GET_LIST, data.page],
    queryFn: () => ClientsAPI.getPaginated(data),
  });

export const useClient = (data: SingleEntityGetPayload) =>
  useQuery({
    queryKey: [ClientsQueryKeys.GET_SINGLE, data.id],
    queryFn: () => ClientsAPI.getSingle(data),
  });

export const useClientNameDictionary = () =>
  useQuery({
    queryKey: [ClientsQueryKeys.GET_NAMES],
    queryFn: ClientsAPI.getNameDictionary,
  });

export const useClientOrders = (
  data: SingleEntityGetPayload & PaginationPayload
) =>
  useQuery({
    queryKey: [ClientsQueryKeys.GET_ORDERS, data.id, data.page],
    queryFn: () => ClientsAPI.getOrders(data),
  });
