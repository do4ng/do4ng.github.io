/* eslint-disable react-hooks/rules-of-hooks */
import type { NextPage } from 'next';
import ErrorPage from 'next/error';
import posts from './api/posts.json';
import PostCard from '../components/post-card';
import { PostData, server } from './post/[slug]';

const Home: NextPage = () => {
  if (!posts) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      {posts.map((post) => (
        // eslint-disable-next-line react/jsx-key
        <PostCard data={post.data}></PostCard>
      ))}
    </>
  );
};

export default Home;
