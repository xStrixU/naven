import { MantineProvider } from '@mantine/core';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { UserProvider } from './UserProvider';

import { GlobalStyles } from '@/styles/GlobalStyles';

import type { QueryClient } from '@tanstack/react-query';
import type { ReactNode } from 'react';

type AppProvidersProps = Readonly<{
  queryClient: QueryClient;
  children: ReactNode;
}>;

export const AppProviders = ({ queryClient, children }: AppProvidersProps) => (
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <GlobalStyles />
        <ReactQueryDevtools />
        {children}
      </UserProvider>
    </QueryClientProvider>
  </MantineProvider>
);
