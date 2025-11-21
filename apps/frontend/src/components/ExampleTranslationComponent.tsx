'use client';

import { useTranslation } from '@/hooks/useTranslation';
import { Button, Card, Text, Title, Group, Stack } from '@mantine/core';
import LanguageSwitcher from './LanguageSwitcher';

export default function ExampleComponent() {
  const { t, locale, setLocale, isLoading } = useTranslation();

  if (isLoading) {
    return <div>Loading translations...</div>;
  }

  const handleLanguageChange = () => {
    // You can programmatically change language
    const newLocale = locale === 'en' ? 'th' : 'en';
    setLocale(newLocale);
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="md">
        <Group justify="space-between" align="center">
          <Title order={3}>{t('common.welcome')}</Title>
          <LanguageSwitcher />
        </Group>
        
        <Text size="sm">
          {t('pages.description')}
        </Text>
        
        <Text size="xs" c="dimmed">
          Current locale: {locale}
        </Text>
        
        <Group>
          <Button onClick={handleLanguageChange} variant="light">
            Switch to {locale === 'en' ? 'Thai' : 'English'}
          </Button>
          
          <Button variant="outline">
            {t('common.save')}
          </Button>
          
          <Button variant="subtle">
            {t('common.cancel')}
          </Button>
        </Group>
      </Stack>
    </Card>
  );
}
