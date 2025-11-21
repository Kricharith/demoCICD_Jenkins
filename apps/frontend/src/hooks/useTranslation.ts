'use client';

import { useEffect, useState } from 'react';
import { useLocaleContext } from '@/contexts/LocaleContext';
import { getDictionary } from '@/lib/getDictionary';
import { Dictionary, createTranslator } from '@/lib/i18n';

export function useTranslation() {
  const { locale, setLocale, isLoading: localeLoading } = useLocaleContext();
  const [dictionary, setDictionary] = useState<Dictionary | null>(null);
  const [isDictionaryLoading, setIsDictionaryLoading] = useState(true);

  useEffect(() => {
    if (!localeLoading) {
      setIsDictionaryLoading(true);
      getDictionary(locale)
        .then((dict) => {
          setDictionary(dict);
          setIsDictionaryLoading(false);
        })
        .catch((error) => {
          console.error('Failed to load dictionary:', error);
          setIsDictionaryLoading(false);
        });
    }
  }, [locale, localeLoading]);

  const t = (key: string): string => {
    if (!dictionary) {
      return key; // Return key if dictionary not loaded yet
    }
    return createTranslator(dictionary)(key);
  };

  return {
    t,
    locale,
    setLocale,
    isLoading: localeLoading || isDictionaryLoading,
    dictionary
  };
}
