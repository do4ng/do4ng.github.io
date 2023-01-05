import '../styles/global.scss';
import type { AppProps } from 'next/app';
import Link from 'next/link';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="root">
        <div className="header">
          <div className="name">
            <Link href="/">do4ng</Link>
          </div>
          <div className="items">
            <Link href="/tags">Tags</Link>
            <Link href="/about">About</Link>
          </div>
        </div>
        <div className="container">
          <Component {...pageProps} />
        </div>
      </div>
    </>
  );
}

export default MyApp;
