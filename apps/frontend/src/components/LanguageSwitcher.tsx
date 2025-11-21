'use client';

import { useState } from 'react';
import { UnstyledButton, Menu, Group, Text } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { Locale } from '@/lib/i18n';
import { useLocaleContext } from '@/contexts/LocaleContext';
import classes from './LanguageSwitcher.module.css';

interface LanguageSwitcherProps {
  className?: string;
}

const languageData = [
  {
    label: 'English',
    code: 'en' as Locale,
    flag: '🇺🇸',
    nativeName: 'English'
  },
  {
    label: 'Thai',
    code: 'th' as Locale,
    flag: '🇹🇭',
    nativeName: 'ไทย'
  },
];

export default function LanguageSwitcher({
  className = ''
}: LanguageSwitcherProps) {
  const { locale: currentLocale, setLocale } = useLocaleContext();
  const [opened, setOpened] = useState(false);

  const selected = languageData.find(lang => lang.code === currentLocale) || languageData[0];

  const items = languageData.map((item) => (
    <Menu.Item
      leftSection={<span style={{ fontSize: '18px' }}>{item.flag}</span>}
      onClick={() => {
        setLocale(item.code);
        setOpened(false);
      }}
      key={item.code}
    >
      {item.nativeName}
    </Menu.Item>
  ));

  return (
    <Menu
      opened={opened}
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
      width="target"
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton className={`${classes.control} ${className}`} data-expanded={opened || undefined}>
          <Group gap="xs">
            <span className={classes.flag}>{selected?.flag}</span>
            <Text size="sm" fw={500}>
              {selected?.nativeName}
            </Text>
          </Group>
          <IconChevronDown size={16} className={classes.icon} stroke={1.5} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>{items}</Menu.Dropdown>
    </Menu>
  );
}
