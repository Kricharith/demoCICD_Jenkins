'use server';

export async function getPublicConfig(): Promise<Map<string, string|undefined>> {
  const config = new Map<string, string|undefined>();
  Object.keys(process.env)
    .filter(key => key.startsWith('NEXT_PUBLIC_'))
    .forEach(key => {
      config.set(key, process.env[key]);
    });
  return config;
}

