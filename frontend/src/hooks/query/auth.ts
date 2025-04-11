import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthAPI } from '../../api/routers/auth';

export enum AuthQueryKeys {
  GET_ME = 'GET_ME',
}

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AuthAPI.login,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [AuthQueryKeys.GET_ME],
      });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AuthAPI.logout,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};

export const useMe = () =>
  useQuery({
    queryKey: [AuthQueryKeys.GET_ME],
    queryFn: AuthAPI.me,
  });
