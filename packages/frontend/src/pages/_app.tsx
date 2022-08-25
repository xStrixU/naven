import { AppProviders } from '@/providers/AppProviders';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';

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
  const getLayout = Component.getLayout ?? (page => page);

  return <AppProviders>{getLayout(<Component {...pageProps} />)}</AppProviders>;
};

export default App;
