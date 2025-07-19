import { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface ApiRequestParams {
  axiosInstance: AxiosInstance;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: unknown;
  config?: AxiosRequestConfig;
}

export async function apiRequest<T>({
  axiosInstance,
  url,
  method,
  data,
  config,
}: ApiRequestParams): Promise<T> {
  const response = await axiosInstance.request<T>({
    url,
    method,
    data,
    ...config,
  });
  return response.data;
}
