import { Locale } from '@/lib/i18n';

const dictionaries = {
  en: () => import('@/locales/en.json').then((module) => module.default),
  th: () => import('@/locales/th.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  if (locale in dictionaries) {
    return dictionaries[locale]();
  }
  // Fallback to English if locale not found
  return dictionaries.en();
};
