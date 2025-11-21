'use client';

import { useEffect } from 'react';
import { revalidateOnce } from '@/libs/revalidate';

export function useRevalidatePathOnce(path: string, type?: 'layout' | 'page') {
  useEffect(() => {
    console.log(`useRevalidatePathOnce called for ${path} with type ${type}`);
    revalidateOnce(path, type);
  }, [path, type]);
}
