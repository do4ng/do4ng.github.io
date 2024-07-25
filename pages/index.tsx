/* eslint-disable @next/next/no-img-element */
'use client';

/* eslint-disable react-hooks/rules-of-hooks */
import type { GetStaticPropsContext, NextPage } from 'next';
import ErrorPage from 'next/error';
import Posts from './post/posts.json';
import PostCard from '../components/post-card';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { cleanTitle } from './post/[slug]';

const lengthPage = 6;

const Home: NextPage = () => {
  const postsArr = Object.keys(Posts).slice(1);
  const posts = {};
  const data = Posts[Object.keys(Posts)[0]];

  for (const post of postsArr) {
    posts[post] = Posts[post];
  }

  if (!posts) {
    return <ErrorPage statusCode={404} />;
  }

  const searchParams = useSearchParams();

  const page = searchParams.get('page');

  const showPosts =
    page === undefined
      ? Object.keys(posts).slice(-lengthPage)
      : Object.keys(posts).slice(
          Number(page) * lengthPage,
          (Number(page) + 1) * lengthPage
        );

  const pages = Array(Math.floor(Object.keys(posts).length / lengthPage) + 1).fill(0);

  return (
    <>
      <Head>
        <title>Home - do4ng</title>
      </Head>
      <NextSeo description="do4ng"></NextSeo>
      <div className="posts">
        {!page || Number(page || -1) === 0 ? (
          <>
            <div className="post-card-big" key={data.date}>
              <Link
                href={`/post/${cleanTitle(data.title)}`}
                className="no-a"
                legacyBehavior
              >
                <div className="post-button">
                  <img src={data.image} alt="img"></img>
                  <div className="post-button-detail">
                    <h3>{data.title}</h3>
                    <div className="post-detail">{data.description}</div>

                    <div className="post-button-tags">
                      <div className="tags">
                        {data.tags?.map((tag) => (
                          // eslint-disable-next-line react/jsx-key
                          <Link href={`/tag/${tag}`} legacyBehavior key={tag}>
                            <a>#{tag}</a>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </>
        ) : (
          <></>
        )}
        <div className="post-list">
          {showPosts.map((post) => (
            // eslint-disable-next-line react/jsx-key
            <PostCard data={posts[post]} key={post}></PostCard>
          ))}
        </div>
      </div>
      <div className="post-id">
        {pages.map((p, index) => (
          <Link href={`/?page=${index}`} key={index}>
            <button className={Number(page || 0) === index ? 'active' : ''}>
              {index + 1}
            </button>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Home;
