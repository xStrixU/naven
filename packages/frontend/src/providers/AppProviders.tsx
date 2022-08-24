import { MantineProvider } from '@mantine/core';

import type { ReactNode } from 'react';

type AppProvidersProps = Readonly<{
  children: ReactNode;
}>;

export const AppProviders = ({ children }: AppProvidersProps) => (
  <MantineProvider withGlobalStyles withNormalizeCSS>
    {children}
  </MantineProvider>
);
