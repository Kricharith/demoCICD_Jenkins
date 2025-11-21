import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';

import { ApiServiceProvider } from '@/components/ApiServiceProvider/ApiServiceProvider';
import { AutoConfigProvider, ConfigProvider } from '@/components/ConfigProvider/ConfigProvider';
import { DashboardLayout } from '@/components/DashboardLayout';
import { getPublicConfig } from '@/libs/config';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { use } from 'react';
import { theme } from '../theme';
import { Notifications } from '@mantine/notifications';
import { LocaleProvider } from '@/contexts/LocaleContext';

export const metadata = {
  title: 'Smart Asset',
  description: 'Smart Asset',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const config = use(getPublicConfig());

  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <Notifications />
          <ConfigProvider config={config}>
            <ApiServiceProvider>
              <LocaleProvider>
                <DashboardLayout>
                  {children}
                </DashboardLayout>
              </LocaleProvider>
            </ApiServiceProvider>
          </ConfigProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
