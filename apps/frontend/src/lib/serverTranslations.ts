// For server components that need translations
// You can create a server-side translation utility

import { getDictionary } from './getDictionary';
import { createTranslator, Locale, defaultLocale } from './i18n';

export async function getServerTranslations(locale?: Locale) {
  const actualLocale = locale || defaultLocale;
  const dictionary = await getDictionary(actualLocale);
  const t = createTranslator(dictionary);
  
  return { t, locale: actualLocale, dictionary };
}

// Usage in server components:
// const { t } = await getServerTranslations('en');
// return <div>{t('common.welcome')}</div>;
