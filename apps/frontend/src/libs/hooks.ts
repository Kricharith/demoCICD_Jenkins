import { createContext, useContext } from 'react';

export const ConfigContext = createContext<Map<string, string|undefined> | undefined>(undefined);

export function useConfig(): Map<string, string|undefined> {
  const config = useContext(ConfigContext);
  if (!config) {
    throw new Error('Config not found');
  }
  return config;
}


export function useConfigValue(key: string): string|undefined {
  const config = useConfig();
  return config.get(key);
}
