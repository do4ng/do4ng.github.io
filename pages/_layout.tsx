/* eslint-disable react-hooks/rules-of-hooks */
'use client';

/* eslint-disable @next/next/no-page-custom-font */

import { Link } from 'exta/components';

import { useEffect, useState } from 'react';

import '../styles/global.scss';

function MyApp({ children }) {
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
      <div className={`header-container fixed${isScrolled ? ' scrolled' : ''}`}>
        <div className="header-bg">
          <div className={`header`}>
            <div className="name">
              <Link href="/">🦄🐒</Link>
            </div>
            <div className="items">
              <Link href="/project" key="project">
                <i className="ri-instance-line"></i>
              </Link>
              <Link href="/tags" key="tags">
                <i className="ri-hashtag"></i>
              </Link>
              <Link href="/about" key="about">
                <i className="ri-at-line"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="root">
        <div className="container">{children}</div>
      </div>
    </>
  );
}

export default MyApp;
