import { GetStaticPropsContext } from 'next';
import { compileMdx } from '../../mdx/compile';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Content } from '../../mdx/content';

export async function getStaticProps(ctx: GetStaticPropsContext) {
  let markdown;
  if (process.env.NODE_ENV === 'development') {
    markdown = readFileSync(join(process.cwd(), 'posts', `${'0-hello'}.mdx`)).toString();
  } else {
    try {
      const res = await fetch(
        `https://raw.githubusercontent.com/do4ng/do4ng.github.io/main/posts/${'0-hello'}.mdx`
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
      compiled,
    },
  };
}

export default function Repos({ compiled }: { compiled: any }) {
  return (
    <>
      <h1 style={{ marginTop: '125px', paddingLeft: '10px' }}>Projects</h1>
      <div className="hello">
        <p className="title">/0-hello.mdx</p>
        <Content content={compiled}></Content>
      </div>
    </>
  );
}
