import type { NextPage } from 'next';
import PostCard from '../components/post-card';
import { PostData, server } from './post/[slug]';

export async function getStaticProps({ params }) {
  // Call an external API endpoint to get posts
  const res = await fetch(`${server}/posts.json`);
  const posts = await res.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return { props: { posts } };
}

const Home: NextPage = ({ posts }: { posts: PostData[] }) => {
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
