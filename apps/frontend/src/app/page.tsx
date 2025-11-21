'use client';

import { Container, Title } from '@mantine/core';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useConfigValue } from '@/libs/hooks';

export default function HomePage() {
  const { t, isLoading, dictionary } = useTranslation();
  const apiBaseUrl = useConfigValue('NEXT_PUBLIC_API_BASE_URL');

  if (isLoading || !dictionary) {
    return (
      <Container size="sm">
        <div>{t('common.loading')}</div>
      </Container>
    );
  }

  return (
    <Container size="sm">
      <div className="flex justify-between items-center mb-6">
        <Title order={1}>{t('pages.title')}</Title>
        <LanguageSwitcher />
      </div>
      <p className="text-gray-600">{t('common.welcome')}</p>
      <p className="text-gray-600">{t('pages.description')}</p>
      <p className="text-gray-600">{`API_BASE_URL: ` + apiBaseUrl}</p>
    </Container>
  );
}

