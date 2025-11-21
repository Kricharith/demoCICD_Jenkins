'use client';

import { ConfigContext } from '@/libs/hooks';
import { useRevalidatePathOnce } from '@/hooks/useRevalidatePathOnce';
import { getPublicConfig } from '@/libs/config';
import { useEffect, useState } from 'react';


export type ConfigProviderProps = {
  config: Map<string, string|undefined>;
  children: React.ReactNode;
}

export function ConfigProvider({ config, children }: ConfigProviderProps) {
  useRevalidatePathOnce('/', 'layout');
  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
}

export function AutoConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<Map<string, string|undefined>>();
  useEffect(() => {
    getPublicConfig().then(setConfig);
  }, []);

  if (!config) {
    return <div>Loading...</div>;
  }

  return <ConfigProvider config={config}>{children}</ConfigProvider>;
}
