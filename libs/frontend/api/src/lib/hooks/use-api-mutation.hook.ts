import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
  UseMutationResult,
} from '@tanstack/react-query';
import { AxiosError, AxiosInstance } from 'axios';
import { apiRequest, ApiRequestParams } from '../utils/api-request';

interface UseApiMutationParams extends Omit<ApiRequestParams, 'data'> {
  serviceKey: string;
}

export function useApiMutation<
  TData = unknown,
  TVariables = unknown,
  TError = AxiosError
>(
  axiosInstance: AxiosInstance,
  params: Omit<UseApiMutationParams, 'axiosInstance'>,
  options?: UseMutationOptions<TData, TError, TVariables>
): UseMutationResult<TData, TError, TVariables> {
  const queryClient = useQueryClient();

  return useMutation<TData, TError, TVariables>({
    mutationFn: (variables: TVariables) =>
      apiRequest<TData>({ axiosInstance, ...params, data: variables }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [params.serviceKey] });
    },
    ...options,
  });
}
