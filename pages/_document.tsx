/* eslint-disable react/no-unknown-property */
/* eslint-disable @next/next/no-css-tags */
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          rel="preload"
          href="/fonts/NanumSquareR.ttf"
          as="font"
          type="font/ttf"
          crossOrigin=""
        />
        <link href="/fonts/style.css" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
