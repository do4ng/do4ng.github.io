/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import timeCounting from 'time-counting';

import { GetStaticPropsContext } from 'next';

import { useRef, useState } from 'react';

import postList from './posts.json';
import { join } from 'path';
import { readFileSync, readdir } from 'fs';

import { Content } from '../../mdx/content';
import { compileMdx } from '../../mdx/compile';
import { LoadTags } from '../tag/[slug]';
import React from 'react';

const touched = { current: false };

// https://github.com/vercel/next.js/issues/52711
// https://github.com/memos-pub/memos.pub/blob/a3babb1f149f05c43012278331f885d81f5fcfac/lib/mdx/plugins/code.ts

const getShikiPath = (): string => {
  return join(process.cwd(), '/shiki');
};

const touchShikiPath = (): void => {
  if (touched.current) return;
  readdir(getShikiPath(), () => {});
  touched.current = true;
};

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
  div: (props: any) => {
    if (props['data-rehype-pretty-code-fragment'] === '') {
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
}

export interface PostData {
  html: string;
  data: PostType;
}

export function cleanTitle(title: string = ''): string {
  return title.replace(/ /g, '-').trim().toLocaleLowerCase();
}

// https://www.emgoto.com/react-table-of-contents/
const Headings = ({ headings, activeId }) => (
  <ul>
    {headings.map((heading) => (
      <li key={heading.id} className={heading.id === activeId ? 'active' : ''}>
        <a href={`#${heading.id}`}>{heading.title.slice(1)}</a>
        {heading.items.length > 0 && (
          <ul>
            {heading.items.map((child) => (
              <li key={child.id} className={child.id === activeId ? 'active' : ''}>
                <a href={`#${child.id}`}>{child.title}</a>
              </li>
            ))}
          </ul>
        )}
      </li>
    ))}
  </ul>
);

const useHeadingsData = () => {
  const [nestedHeadings, setNestedHeadings] = React.useState([]);

  React.useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll('.post h2, .post h3'));

    // Created a list of headings, with H3s nested
    const newNestedHeadings = getNestedHeadings(headingElements);
    setNestedHeadings(newNestedHeadings);
  }, []);

  return { nestedHeadings };
};

const getNestedHeadings = (headingElements) => {
  const nestedHeadings = [];

  headingElements.forEach((heading, index) => {
    const { innerText: title, id } = heading;

    if (heading.nodeName === 'H2') {
      nestedHeadings.push({ id, title, items: [] });
    } else if (heading.nodeName === 'H3' && nestedHeadings.length > 0) {
      nestedHeadings[nestedHeadings.length - 1].items.push({
        id,
        title,
      });
    }
  });

  return nestedHeadings;
};

const useIntersectionObserver = (setActiveId) => {
  const headingElementsRef = React.useRef({});
  React.useEffect(() => {
    const callback = (headings) => {
      headingElementsRef.current = headings.reduce((map, headingElement) => {
        map[headingElement.target.id] = headingElement;
        return map;
      }, headingElementsRef.current);

      const visibleHeadings = [];
      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key];
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
      });

      const getIndexFromId = (id) =>
        headingElements.findIndex((heading) => heading.id === id);

      if (visibleHeadings.length === 1) {
        setActiveId(visibleHeadings[0].target.id);
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort(
          // @ts-ignore
          (a, b) => getIndexFromId(a.target.id) > getIndexFromId(b.target.id)
        );

        setActiveId(sortedVisibleHeadings[0].target.id);
      }
    };

    const observer = new IntersectionObserver(callback, {
      root: document.querySelector('iframe'),
      rootMargin: '500px',
    });

    const headingElements = Array.from(document.querySelectorAll('h2, h3'));

    headingElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [setActiveId]);
};

const TableOfContents = ({ data }) => {
  const [activeId, setActiveId] = React.useState();
  const { nestedHeadings } = useHeadingsData();
  useIntersectionObserver(setActiveId);

  return (
    <nav aria-label="Table of contents">
      <a className="no-a" href="#">
        On this page
      </a>
      <Headings headings={nestedHeadings} activeId={activeId} />
      <a
        href={`https://github.com/do4ng/do4ng.github.io/edit/main/posts/${data.raw}`}
        className="no-a"
      ></a>
    </nav>
  );
};

export function getStaticPaths() {
  return {
    paths: Object.keys(postList).map((post) => ({
      params: { slug: post.toLowerCase() },
    })),
    fallback: false,
  };
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  touchShikiPath();
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
      ).toString();
    } else {
      try {
        const res = await fetch(
          `https://raw.githubusercontent.com/do4ng/do4ng.github.io/main/posts/${
            postList[rawPost[0]].name
          }.mdx`
        );
        markdown = await res.text();
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

    const compiled = await compileMdx(markdown);

    return {
      props: {
        markdown,
        compiled,
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
  compiled,
}: {
  data: PostType;
  markdown: string;
  compiled: any;
  reason: string;
}) => {
  const router = useRouter();
  const { slug } = router.query;

  const anotherPosts: PostType[] = LoadTags(data.tags[0]).map((t) => ({
    ...postList[t],
    origin: t,
  })) as any;

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
          <div className="title">{data.title}</div>
          <div className="post-items">
            <div className="name">do4ng</div>
            <div className="border"> • </div>
            <div className="date">{timeCounting(data.date)}</div>
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

            <Content content={compiled}></Content>

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

          <div className="table-of-content">
            <TableOfContents data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
