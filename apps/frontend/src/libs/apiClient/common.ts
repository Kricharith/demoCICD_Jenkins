import axios, { AxiosInstance } from 'axios';
import { getPublicConfig } from '@/libs/config';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export const createApiClient = (baseURL: string): AxiosInstance => {
  const api = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return api;
};


export const createDefaultApiClient = async (): Promise<AxiosInstance> => {
  const config = await getPublicConfig();
  return createApiClient(config.get('NEXT_PUBLIC_API_URL') || '');
};

export interface ApiService {

}


export const createApiService = (apiClient: AxiosInstance): ApiService => {
  return {

  };
};

