/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>About - do4ng</title>
      </Head>
      <div className="about">
        <Image src="/metamong.jpg" width="120px" height="120px"></Image>
        <div style={{ marginTop: '20px' }}>Hello. I'm a student living in Korea.</div>
        <div>
          <a href="https://github.com/do4ng">github</a>
        </div>
      </div>
    </>
  );
};

export default Home;
