import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { StatusesAPI } from '../../api/routers/statuses';

export enum StatusesQueryKeys {
  CREATE = 'STATUSES_CREATE',
  GET = 'STATUSES_GET',
}

export const useCreateStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: StatusesAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [StatusesQueryKeys.GET],
      });
    },
  });
};

export const useStatusList = () =>
  useQuery({
    queryKey: [StatusesQueryKeys.GET],
    queryFn: StatusesAPI.get,
  });
