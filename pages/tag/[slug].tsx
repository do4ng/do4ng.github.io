import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import PostCard from '../../components/post-card';
import posts from '../api/posts.json';
import { PostData, server } from '../post/[slug]';

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  return { props: { posts } };
}

const Home: NextPage = ({ posts }: { posts: PostData[] }) => {
  const router = useRouter();
  if (!router.isFallback && !posts) {
    return <ErrorPage statusCode={404} />;
  }
  const { slug } = router.query;

  posts = posts.filter((post) => post.data.tags?.includes(slug as string));

  return (
    <>
      <div className="directory">
        /tag/<strong>{slug}</strong>
      </div>
      {posts.map((post) => (
        // eslint-disable-next-line react/jsx-key
        <PostCard data={post.data}></PostCard>
      ))}
    </>
  );
};

export default Home;
