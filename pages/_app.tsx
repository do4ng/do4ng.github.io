/* eslint-disable @next/next/no-page-custom-font */
import '../styles/global.scss';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import { DefaultSeo } from 'next-seo';

const DEFAULT_SEO = {
  title: 'do4ng',
  description: "do4ng's blog",
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://do4ng.vercel.app',
    title: "do4ng's blog",
    site_name: 'do4ng',
    images: [
      {
        url: '/metamong.jpg',
        width: 285,
        height: 167,
        alt: 'img',
      },
    ],
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...DEFAULT_SEO}></DefaultSeo>
      <div className="root">
        <div className="header">
          <div className="name">
            <Link href="/">DOLMIN</Link>
          </div>
          <div className="items">
            <Link href="/tags">
              <i className="ri-hashtag"></i>
            </Link>
            <Link href="/about">
              <i className="ri-at-line"></i>
            </Link>
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
