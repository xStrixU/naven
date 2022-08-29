import { QueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { Layout } from '@/components/Layout/Layout';

import { AppProviders } from '@/providers/AppProviders';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';

import '@/styles/fonts.css';

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

const App = ({
  Component,
  pageProps,
}: AppProps & {
  Component: NextPageWithLayout;
}) => {
  const [queryClient] = useState(() => new QueryClient());

  const getLayout = Component.getLayout ?? (page => <Layout>{page}</Layout>);

  return (
    <AppProviders queryClient={queryClient}>
      {getLayout(<Component {...pageProps} />)}
    </AppProviders>
  );
};

export default App;
