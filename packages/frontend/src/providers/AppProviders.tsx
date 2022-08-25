import { MantineProvider } from '@mantine/core';

import { GlobalStyles } from '@/styles/GlobalStyles';

import type { ReactNode } from 'react';

type AppProvidersProps = Readonly<{
  children: ReactNode;
}>;

export const AppProviders = ({ children }: AppProvidersProps) => (
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <GlobalStyles />
    {children}
  </MantineProvider>
);
