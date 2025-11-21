# Internationalization (i18n) Setup

This project uses a dynamic locale system that doesn't rely on URL routing. The locale is stored in localStorage and can be changed programmatically. The Language Switcher is built using Mantine UI components for a consistent design.

## Features

- **Dynamic locale switching** without URL changes
- **Persistent locale preference** in localStorage
- **Browser language detection** as fallback
- **Type-safe translations** with TypeScript
- **Loading states** for translation loading
- **Mantine UI Language Picker** with flag icons
- **Easy integration** with existing components

## Usage

### 1. Client Components

```tsx
'use client';
import { useTranslation } from '@/hooks/useTranslation';

export default function MyComponent() {
  const { t, locale, setLocale, isLoading } = useTranslation();
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      <h1>{t('common.welcome')}</h1>
      <button onClick={() => setLocale('th')}>
        Switch to Thai
      </button>
    </div>
  );
}
```
### 2. Server Components

```tsx
import { getServerTranslations } from '@/lib/serverTranslations';

export default async function ServerComponent() {
  const { t } = await getServerTranslations('en');
  
  return <div>{t('common.welcome')}</div>;
}
```

### 3. Language Switcher (Mantine UI)

The language switcher is built with Mantine UI components and includes flag icons:

```tsx
import LanguageSwitcher from '@/components/LanguageSwitcher';

// Use anywhere in your app - it automatically uses the current locale context
<LanguageSwitcher />

// With custom styling
<LanguageSwitcher className="my-custom-class" />
```

The Language Switcher features:
- **Flag icons** for visual language identification
- **Native language names** (English, ไทย)
- **Mantine UI Menu** component for dropdown
- **Consistent styling** with your Mantine theme
- **Dark/light theme support**

## File Structure

```
src/
├── contexts/
│   └── LocaleContext.tsx     # Locale state management
├── hooks/
│   └── useTranslation.ts     # Main translation hook
├── lib/
│   ├── i18n.ts              # Core i18n utilities
│   ├── getDictionary.ts     # Dictionary loading
│   └── serverTranslations.ts # Server-side translations
├── locales/
│   ├── en.json              # English translations
│   └── th.json              # Thai translations
└── components/
    └── LanguageSwitcher.tsx  # Language switcher UI
```

## Adding New Languages

1. Add the locale to `src/lib/i18n.ts`:
```ts
export const locales = ['en', 'th', 'fr'] as const;
```

2. Create a new translation file:
```
src/locales/fr.json
```

3. Update the dictionary loader:
```ts
const dictionaries = {
  en: () => import('@/locales/en.json').then((module) => module.default),
  th: () => import('@/locales/th.json').then((module) => module.default),
  fr: () => import('@/locales/fr.json').then((module) => module.default),
};
```

## Translation Keys

Use nested keys with dot notation:
```json
{
  "common": {
    "welcome": "Welcome"
  },
  "pages": {
    "home": {
      "title": "Home Page"
    }
  }
}
```

Access with: `t('pages.home.title')`

## Locale Detection Priority

1. **localStorage**: Stored user preference
2. **Browser language**: `navigator.language`
3. **Default**: English (`en`)
