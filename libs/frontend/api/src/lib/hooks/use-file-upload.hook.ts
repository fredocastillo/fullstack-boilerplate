import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface FileUploadParams {
  url: string;
  file: File;
  config?: AxiosRequestConfig;
}

export function useFileUpload<TResponse = AxiosResponse>(
  axiosInstance: AxiosInstance,
  options?: UseMutationOptions<TResponse, Error, FileUploadParams>
): UseMutationResult<TResponse, Error, FileUploadParams> {
  return useMutation<TResponse, Error, FileUploadParams>({
    mutationFn: async ({ url, file, config }) => {
      const formData = new FormData();
      formData.append('file', file);
      return axiosInstance.post(url, formData, config);
    },
    ...options,
  });
}
