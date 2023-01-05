import type { NextPage } from 'next';
import ErrorPage from 'next/error';
import posts from './api/posts.json';
import PostCard from '../components/post-card';
import { PostData, server } from './post/[slug]';

export async function getStaticProps({ params }) {
  return { props: { posts } };
}

const Home: NextPage = ({ posts }: { posts: PostData[] }) => {
  if (!posts) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <>
      {posts.reverse().map((post) => (
        // eslint-disable-next-line react/jsx-key
        <PostCard data={post.data}></PostCard>
      ))}
    </>
  );
};

export default Home;
