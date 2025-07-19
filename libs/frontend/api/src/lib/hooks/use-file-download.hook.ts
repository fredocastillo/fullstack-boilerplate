import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosInstance } from 'axios';

export interface FileDownloadParams {
  url: string;
  filename: string;
}

export function useFileDownload(
  axiosInstance: AxiosInstance
): UseMutationResult<void, Error, FileDownloadParams> {
  return useMutation<void, Error, FileDownloadParams>({
    mutationFn: async ({ url, filename }) => {
      const response = await axiosInstance.get(url, { responseType: 'blob' });
      const blob = new Blob([response.data]);
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
    },
  });
}
