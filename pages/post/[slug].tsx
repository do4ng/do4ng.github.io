/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import { Head, Link } from 'exta/components';

import { useRef, useState } from 'react';

import postList from './posts.json';
import { join } from 'path';
import { readFileSync } from 'fs';

import { Content } from '../../mdx/content';
import { compileMdx } from '../../mdx/compile';
import { LoadTags } from '../tag/[slug]';

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
  rs: 'Rust',
};

export const components = {
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
  figure: (props: any) => {
    if (props['data-rehype-pretty-code-figure'] === '') {
      if (props.children[0]?.props['data-rehype-pretty-code-title'] !== '') {
        const lang = props.children.props['data-language'];
        const [copy, setCopy] = useState('copy');
        const ref = useRef<HTMLButtonElement>();
        return (
          <div data-rehype-pretty-code-fragment="">
            <div {...props.children.props} data-rehype-pretty-code-title="">
              <div className="code-lang">
                <i className={`ri-${langsIcons[lang] || langsIcons.txt}`}></i>
                <span>{langs[lang] || langs.txt}</span>
                <button
                  ref={ref}
                  className="copy-code"
                  onClick={() => {
                    const code =
                      ref.current.parentNode.parentNode.parentNode.querySelector(
                        'code'
                      ).innerText;

                    window.navigator.clipboard.writeText(code).then(() => {
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
            </div>
            {props.children}
          </div>
        );
      }
    }

    if (props['data-rehype-pretty-code-title'] === '') {
      const lang = props['data-language'];
      const [copy, setCopy] = useState('copy');
      const ref = useRef<HTMLButtonElement>();
      const title = props.children;

      return (
        <div {...props}>
          <div className="code-lang">
            <i className={`ri-${langsIcons[lang] || langsIcons.txt}`}></i>
            <span>{title}</span>
            <button
              ref={ref}
              className="copy-code"
              onClick={() => {
                const code =
                  ref.current.parentNode.parentNode.parentNode.querySelector(
                    'code'
                  ).innerText;

                window.navigator.clipboard.writeText(code).then(() => {
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
        </div>
      );
    }
    return <div {...props}></div>;
  },
  pre: (props: any) => {
    return (
      <>
        <div className="code-block" style={props.style}>
          <pre {...props}></pre>
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
  img_from?: string;
}

export interface PostData {
  html: string;
  data: PostType;
}

export function cleanTitle(title: string = ''): string {
  return title.replace(/ /g, '-').trim().toLocaleLowerCase();
}

export function getStaticParams() {
  return Object.keys(postList).map((post) => ({
    slug: post.toLowerCase(),
  }));
}

export async function getStaticProps({ params }) {
  const rawPost = Object.keys(postList).filter((value) => {
    return cleanTitle(value) === cleanTitle(decodeURI(params.slug as string));
  });

  if (rawPost.length === 0) {
    return {
      markdown: null,
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

    const markdown = readFileSync(
      join(process.cwd(), 'posts', `${postList[rawPost[0]].name}.mdx`)
    ).toString();

    const compiled = await compileMdx(markdown);
    return {
      markdown,
      compiled,
      data: postList[rawPost[0]],
    };
  } catch (e) {
    console.error(e);
    return {
      markdown: null,
      reason: e,
    };
  }
}

const Post = ({
  params,
  props,
}: {
  params: { slug: string };
  props: {
    data: PostType;
    markdown: string;
    compiled: any;
    reason: string;
  };
}) => {
  const { data, compiled } = props;
  let { slug } = params;

  slug = decodeURI(slug);

  const anotherPosts: PostType[] = LoadTags(data.tags[0]).map((t) => ({
    ...postList[t],
    origin: t,
  })) as any;

  if (props.markdown === null) {
    return <>404</>;
  }

  return (
    <>
      <Head>
        <title>{data.title} - do4ng</title>
        <meta name="description" content={data.description} />
        <meta name="keywords" content={data.tags.join(',')} />
        <meta property="og:title" content={data.title} />
        <meta property="og:description" content={data.description} />
      </Head>
      <div className="post-container">
        <div className="preface">
          <div className="title">{data.title}</div>
          <div className="post-items">
            <div className="name">do4ng</div>
            <div className="border"> • </div>
            <div className="date">{data.date}</div>
          </div>
          <div className="tags">
            {data.tags?.map((tag) => (
              // eslint-disable-next-line react/jsx-key
              <a href={`/tag/${tag}`} key={tag} className="posttag">
                #{tag}
              </a>
            ))}
          </div>
        </div>
        <div className="post-layer">
          <div className="post">
            <img src={data.image} alt=""></img>
            <p
              className="img-from"
              dangerouslySetInnerHTML={{ __html: data.img_from || '' }}
            ></p>

            <main>
              <Content content={compiled}></Content>
            </main>

            <div className="other-posts">
              <h4>#{data.tags[0]}의 다른 글</h4>
              <div className="other-posts-container">
                {anotherPosts.map((post) => (
                  <>
                    <div className="other-post">
                      <Link
                        className={
                          (post as any).origin.toLowerCase() ===
                          (slug as string).toLowerCase()
                            ? 'active'
                            : null
                        }
                        href={`/post/${(post as any).origin}`}
                        prefetch={false}
                      >
                        {post.title}
                      </Link>
                    </div>
                  </>
                ))}
              </div>
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
        </div>
      </div>
    </>
  );
};

export default Post;
