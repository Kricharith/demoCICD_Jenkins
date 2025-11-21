
'use client';

import { createApiClient, createApiService, queryClient } from "@/libs/apiClient/common";
import { ApiHooksContext, ApiServiceContext, createApiHooks } from "@/libs/apiClient/hooks";
import { useConfigValue } from "@/libs/hooks";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { useMemo } from "react";

export type ApiServiceProviderProps = {
  children: React.ReactNode;
}


export function ApiServiceProvider({ children }: ApiServiceProviderProps) {
  const apiUrl = useConfigValue('NEXT_PUBLIC_API_URL') || '';

  const apiService = useMemo(() => createApiService(createApiClient(apiUrl)), [apiUrl]);
  const apiHooks = useMemo(() => createApiHooks(queryClient, apiService), [queryClient, apiService]);
  const persister = useMemo(() => createSyncStoragePersister({
    storage: typeof window !== 'undefined' ? window.localStorage : null,
  }), []);

  return  (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
      <ApiServiceContext.Provider value={apiService}>
        <ApiHooksContext.Provider value={apiHooks}>
          {children}
        </ApiHooksContext.Provider>
      </ApiServiceContext.Provider>
    </PersistQueryClientProvider>
  )
}


