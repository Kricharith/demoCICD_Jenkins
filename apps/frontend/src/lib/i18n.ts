export const locales = ['en', 'th'] as const;
export type Locale = typeof locales[number];

export const defaultLocale: Locale = 'en';

// Dictionary type for type safety
export interface Dictionary {
  [key: string]: string | Dictionary;
}

// Helper function to get nested translation
export function getTranslation(dict: Dictionary, key: string): string {
  const keys = key.split('.');
  let current: any = dict;
  
  for (const k of keys) {
    if (current[k] === undefined) {
      return key; // Return key if translation not found
    }
    current = current[k];
  }
  
  return typeof current === 'string' ? current : key;
}

// Create a simple translation function that works with the dictionary
export function createTranslator(dictionary: Dictionary) {
  return (key: string): string => getTranslation(dictionary, key);
}
