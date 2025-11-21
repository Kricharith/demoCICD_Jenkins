import { QueryClient } from "@tanstack/react-query";
import { ApiService } from "./common";
import { createContext, useContext } from "react";


export interface ApiHooks {

}

export const createApiHooks = (queryClient: QueryClient, apiService: ApiService): ApiHooks => {
  return {
 
  };
};


export const ApiHooksContext = createContext<ApiHooks | undefined>(undefined);

export function useApiHooks(): ApiHooks {
  const apiHooks = useContext(ApiHooksContext);
  if (!apiHooks) {
    throw new Error('ApiHooks not found');
  }
  return apiHooks;
}


export const ApiServiceContext = createContext<ApiService | undefined>(undefined);

export function useApiService(): ApiService {
  const apiService = useContext(ApiServiceContext);
  if (!apiService) {
    throw new Error('ApiService not found');
  }
  return apiService;
}
