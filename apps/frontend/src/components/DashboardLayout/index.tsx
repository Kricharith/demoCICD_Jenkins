'use client';

import { ActionIcon, AppShell, Burger, Group, NavLink, Text, useMantineColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMoonStars, IconSun, IconHome, IconBlocks, IconBooks } from "@tabler/icons-react";
import cx from 'clsx';
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import classes from './DashboardLayout.module.css';
import { useTranslation } from "@/hooks/useTranslation";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle, close }] = useDisclosure();
  const { toggleColorScheme } = useMantineColorScheme({ keepTransitions: true });
  const { t } = useTranslation();

  const pathname = usePathname();

  React.useEffect(() => {
    close();
  }, [pathname, close]);

  React.useEffect(() => {
    let scrollTimer: NodeJS.Timeout;

    const handleScroll = () => {
      document.documentElement.classList.add('scrolling');

      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        document.documentElement.classList.remove('scrolling');
      }, 1000); // Adjust this value to control how long the scrollbar remains visible after scrolling stops
    };

    window.addEventListener('scroll', handleScroll, true);

    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      clearTimeout(scrollTimer);
    };
  }, []);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'md', collapsed: { mobile: !opened } }}
      // aside={{ width: 300, breakpoint: 'xl', collapsed: { desktop: false, mobile: true } }}
      padding="md"
      transitionDuration={0}
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <IconBlocks size="1.5rem" stroke={1.5} color="tomato" />
            <Text size="xl" fw={900} variant="gradient" gradient={{ from: 'pink', to: 'blue', deg: 90 }}>Smart Asset</Text>
          </Group>
          <Group justify="right" mb="md">
            <ActionIcon
              onClick={() => toggleColorScheme()}
              variant="default"
              size="xl"
              aria-label="Toggle color scheme"
            >
              <IconMoonStars className={cx(classes.dark)} stroke={1.5} />
              <IconSun className={cx(classes.light)} stroke={1.5} />
            </ActionIcon>
            <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <NavLink
          active={pathname === '/'}
          label={t('pages.navPage.home')}
          component={Link}
          leftSection={<IconHome size="1rem" stroke={1.5} />}
          href="/"
        />
        {/* <NavLink
          active={pathname.search(/^\/home\/?/) !== -1}
          label={t('pages.navPage.home')}
          component={Link}
          leftSection={<IconBooks size="1rem" stroke={1.5} />}
          href="/home"
        /> */}

      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
