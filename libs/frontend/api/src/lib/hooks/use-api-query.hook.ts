import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { AxiosError, AxiosInstance } from 'axios';
import { apiRequest } from '../utils/api-request';

export function useApiQuery<
  TData = unknown,
  TError = AxiosError,
  TQueryKey extends readonly unknown[] = readonly unknown[]
>(
  axiosInstance: AxiosInstance,
  queryKey: TQueryKey,
  url: string,
  options?: UseQueryOptions<TData, TError, TData, TQueryKey>
): UseQueryResult<TData, TError> {
  return useQuery<TData, TError, TData, TQueryKey>({
    queryKey,
    queryFn: () => apiRequest<TData>({ axiosInstance, url, method: 'GET' }),
    ...options,
  });
}
