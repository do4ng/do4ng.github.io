/* eslint-disable react-hooks/rules-of-hooks */
import type { NextPage } from 'next';
import ErrorPage from 'next/error';
import posts from './api/posts.json';
import PostCard from '../components/post-card';
import Head from 'next/head';
import { NextSeo } from 'next-seo';

const Home: NextPage = () => {
  if (!posts) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>Home - do4ng</title>
      </Head>
      <NextSeo description="do4ng"></NextSeo>
      <div className="posts">
        {posts.map((post) => (
          // eslint-disable-next-line react/jsx-key
          <PostCard data={post.data}></PostCard>
        ))}
      </div>
    </>
  );
};

export default Home;
