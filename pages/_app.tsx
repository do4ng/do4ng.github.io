/* eslint-disable react-hooks/rules-of-hooks */
'use client';

/* eslint-disable @next/next/no-page-custom-font */

import '../styles/global.scss';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { DefaultSeo } from 'next-seo';
import { useEffect, useState } from 'react';

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
  const [isScrolled, setScrolled] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset;
      if (scrollTop > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    });
  });

  return (
    <>
      <DefaultSeo {...DEFAULT_SEO}></DefaultSeo>

      <div className={`header-container fixed${isScrolled ? ' scrolled' : ''}`}>
        <div className="header-bg">
          <div className={`header`}>
            <div className="name">
              <Link href="/">🦄🐒</Link>
            </div>
            <div className="items">
              <Link href="/project">
                <i className="ri-instance-line"></i>
              </Link>
              <Link href="/tags">
                <i className="ri-hashtag"></i>
              </Link>
              <Link href="/about">
                <i className="ri-at-line"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="root">
        <div className="container">
          <Component {...pageProps} />
        </div>
      </div>
    </>
  );
}

export default MyApp;
