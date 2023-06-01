import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import PostCard from '../../components/post-card';
import rawPosts from '../api/posts.json';
import Head from 'next/head';
import { NextSeo } from 'next-seo';

const Home: NextPage = () => {
  let posts = rawPosts;

  const router = useRouter();
  if (!router.isFallback && !posts) {
    return <ErrorPage statusCode={404} />;
  }
  const { slug } = router.query;

  posts = posts.filter((post) => post.data.tags?.includes(slug as string));

  return (
    <>
      <Head>{slug ? <title>#{slug} - do4ng</title> : <></>}</Head>
      <NextSeo title={`#${slug}`} description={slug as string}></NextSeo>
      <div className="directory">
        /tag/<strong>{slug}</strong>
      </div>
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
