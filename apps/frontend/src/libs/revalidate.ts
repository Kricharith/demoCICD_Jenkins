'use server';

import { revalidatePath } from 'next/cache';

const  revalidateStats = new Map<string, number>();

export async function revalidateOnce(path: string, type?: 'layout' | 'page') {
  const count = (revalidateStats.get(path) || 0);
  if (count === 0) {
    revalidateStats.set(path, count + 1);
    revalidatePath(path, type);
    console.info(`revalidated ${path} with type ${type}`);
  }
}
