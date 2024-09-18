import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import PostCard from '../../components/post-card';
import rawPosts from '../post/posts.json';
import Head from 'next/head';
import { NextSeo } from 'next-seo';

export const LoadTags = (slug: string | string[]) => {
  const posts = Object.keys(rawPosts).filter((post) =>
    rawPosts[post].tags?.includes(slug as string)
  );

  return posts;
};

const Home: NextPage = () => {
  const router = useRouter();
  if (!router.isFallback && !rawPosts) {
    return <ErrorPage statusCode={404} />;
  }
  const { slug } = router.query;

  const posts = LoadTags(slug);

  return (
    <>
      <Head>{slug ? <title>#{slug} - do4ng</title> : <></>}</Head>
      <NextSeo title={`#${slug}`} description={slug as string}></NextSeo>
      <div className="posts">
        <div className="directory">
          #<strong style={{ textTransform: 'capitalize' }}>{slug as string}</strong>
          <span style={{ color: '#5a7fe4', paddingLeft: '5px' }}>
            ({posts.length}개의 글)
          </span>
        </div>
        <div className="post-list">
          {posts.map((post) => (
            // eslint-disable-next-line react/jsx-key
            <PostCard data={rawPosts[post]} key={post}></PostCard>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
