import { AppProviders } from '@/providers/AppProviders';

import type { AppProps } from 'next/app';

import '@/styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AppProviders>
      <Component {...pageProps} />
    </AppProviders>
  );
};

export default App;
