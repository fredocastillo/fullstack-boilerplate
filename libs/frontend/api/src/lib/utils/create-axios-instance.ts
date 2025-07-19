import axios, { AxiosInstance } from 'axios';

export function createAxiosInstance(baseURL: string): AxiosInstance {
  const instance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Optional: add interceptors here if needed

  return instance;
}
