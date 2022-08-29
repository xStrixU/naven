import { createGetInitialProps } from '@mantine/next';
import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class _Document extends Document {
  static getInitialProps = createGetInitialProps();

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="preload"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
            href="/fonts/GreycliffCF/GreycliffCF-Regular.woff2"
          />
          <link
            rel="preload"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
            href="/fonts/GreycliffCF/GreycliffCF-Medium.woff2"
          />
          <link
            rel="preload"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
            href="/fonts/GreycliffCF/GreycliffCF-Bold.woff2"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto&display=optional"
          />
          <link rel="shortcut icon" href="/favicons/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
