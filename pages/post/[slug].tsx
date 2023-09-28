/* eslint-disable react-hooks/rules-of-hooks */
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import raw from 'rehype-raw';

import { GetServerSidePropsContext } from 'next';

import { useRef, useState } from 'react';

import postList from './posts.json';
import { plugin } from '../../plugins/anchor';
import { join } from 'path';
import { readFileSync } from 'fs';
import { BUNDLED_LANGUAGES } from 'shiki';
import MaterialPalenight from 'shiki/themes/material-theme-palenight.json';

const dev = process.env.NODE_ENV !== 'production';

const langsIcons = {
  ts: 'javascript-line',
  js: 'javascript-line',
  tsx: 'reactjs-line',
  jsx: 'reactjs-line',
  html: 'html5-line',
  css: 'css3-fill',
  txt: 'file-text-line',
  bash: 'terminal-box-line',
  sh: 'terminal-box-line',
};
const langs = {
  ts: 'Typescript',
  js: 'Javascript',
  tsx: 'React',
  jsx: 'React',
  html: 'HTML',
  css: 'CSS',
  txt: 'Plain',
  bash: 'Terminal',
  sh: 'Terminal',
};

const components = {
  h1: (props: any) => {
    return <h1 {...props}></h1>;
  },
  h2: (props: any) => {
    return <h2 {...props}></h2>;
  },
  h3: (props: any) => {
    return <h3 {...props}></h3>;
  },
  h4: (props: any) => {
    return <h4 {...props}></h4>;
  },
  h5: (props: any) => {
    return <h5 {...props}></h5>;
  },
  h6: (props: any) => {
    return <h6 {...props}></h6>;
  },
  pre: (props: any) => {
    const lang = props['data-language'];
    const [copy, setCopy] = useState('copy');

    const ref = useRef();

    return (
      <>
        <div className="code-block" style={props.style}>
          <div className="code-lang">
            <i className={`ri-${langsIcons[lang] || langsIcons.txt}`}></i>
            <span>{langs[lang] || langs.txt}</span>
            <button
              className="copy-code"
              onClick={() => {
                window.navigator.clipboard
                  .writeText((ref.current as any)?.innerText)
                  .then(() => {
                    setCopy('copied!');
                    setTimeout(() => {
                      setCopy('copy');
                    }, 2000);
                  });
              }}
            >
              {copy}
            </button>
          </div>
          <pre ref={ref} {...props}></pre>
        </div>
      </>
    );
  },
};

export const server = dev ? 'http://localhost:3000' : 'https://do4ng.vercel.com';

export interface PostType {
  title: string;
  date: string;
  description: string;
  tags: string[];
  raw: string;
  image?: string;
}

export interface PostData {
  html: string;
  data: PostType;
}

export function cleanTitle(title: string = ''): string {
  return title.replace(/ /g, '-').trim().toLocaleLowerCase();
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const rawPost = Object.keys(postList).filter((value) => {
    return cleanTitle(value) === cleanTitle(ctx.params.slug as string);
  });

  if (rawPost.length === 0) {
    return {
      props: {
        markdown: null,
      },
    };
  }

  try {
    /*
    const res = await fetch(
      `https://raw.githubusercontent.com/do4ng/do4ng.github.io/main/posts/${
        postList[rawPost[0]].name
      }.mdx`
    );
    const markdown = await res.text();
    */

    let markdown;
    if (process.env.NODE_ENV === 'development') {
      markdown = readFileSync(
        join(process.cwd(), 'posts', `${postList[rawPost[0]].name}.mdx`)
      );
    } else {
      try {
        const res = await fetch(
          `https://raw.githubusercontent.com/do4ng/do4ng.github.io/main/posts/${
            postList[rawPost[0]].name
          }.mdx`
        );
        markdown = await res.text();
        console.log(markdown);
      } catch (e) {
        console.error(e);
        return {
          props: {
            markdown: null,
            reason: e,
          },
        };
      }
    }

    return {
      props: {
        markdown: await serialize(markdown, {
          mdxOptions: {
            remarkPlugins: [remarkGfm, plugin],
            rehypePlugins: [
              [
                rehypePrettyCode,
                {
                  theme: MaterialPalenight,
                  paths: {
                    themes:
                      typeof window !== 'undefined'
                        ? 'https://cdn.jsdelivr.net/npm/shiki@latest/themes/'
                        : null,
                    wasm:
                      typeof window !== 'undefined'
                        ? 'https://cdn.jsdelivr.net/npm/shiki@latest/dist/'
                        : null,
                    languages:
                      typeof window !== 'undefined'
                        ? 'https://cdn.jsdelivr.net/npm/shiki@latest/languages/'
                        : null,
                  },
                  langs: [...BUNDLED_LANGUAGES],
                },
              ],
              raw,
            ],
          },
        }),
        data: postList[rawPost[0]],
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        markdown: null,
        reason: e,
      },
    };
  }
}

const Post = ({
  data,
  reason,
  markdown,
}: {
  data: PostType;
  markdown: MDXRemoteSerializeResult;
  reason: string;
}) => {
  const router = useRouter();
  const { slug } = router.query;

  console.log(reason);
  if (markdown === null) {
    return <>404</>;
  }

  return (
    <>
      <Head>
        <title>{(slug as string).replace(/-/g, ' ')} - do4ng</title>
        <meta name="author" content="do4ng"></meta>
        <meta name="keyword" content={`${data.tags.join(', ')}`}></meta>
      </Head>
      <NextSeo
        title={`${(slug as string).replace(/-/g, ' ')}`}
        description={data.description}
      ></NextSeo>
      <div className="post-container">
        <div className="preface">
          <div className="date">{data.date}</div>
          <div className="title">{data.title}</div>
          <div className="tags">
            {data.tags?.map((tag) => (
              // eslint-disable-next-line react/jsx-key
              <a href={`/tag/${tag}`} key={tag}>
                #{tag}
              </a>
            ))}
          </div>
        </div>
        <div className="post">
          <MDXRemote {...markdown} components={components} />
        </div>
        <div className="footer">
          <div className="edit">
            <a
              href={`https://github.com/do4ng/do4ng.github.io/edit/main/posts/${data.raw}`}
            >
              <i className="ri-edit-2-line"></i> Edit on Github
            </a>
          </div>
          <div className="back">
            <Link href="/">Back to blog</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
