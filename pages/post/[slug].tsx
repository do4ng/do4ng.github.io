import Link from 'next/link';
import posts from '../api/posts.json';
import { useRouter } from 'next/router';
const dev = process.env.NODE_ENV !== 'production';

export const server = dev ? 'http://localhost:3000' : 'https://do4ng.vercel.com';

export interface PostType {
  title: string;
  date: string;
  description: string;
  tags: string[];
  raw: string;
}

export interface PostData {
  html: string;
  data: PostType;
}

export function cleanTitle(title: string): string {
  return title.replace(/ /g, '-').trim().toLocaleLowerCase();
}
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  return { props: { posts } };
}

const Post = ({ posts }: { posts: Array<PostData> }) => {
  const router = useRouter();
  const { slug } = router.query;

  const rawPost = posts.filter((value) => {
    return cleanTitle(value.data.title) === cleanTitle(slug as string);
  });

  if (!rawPost) {
    return <>404</>;
  }

  const post = rawPost[0];

  return (
    <>
      <div className="post-container">
        <div className="preface">
          <div className="date">{post.data.date}</div>
          <div className="title">{post.data.title}</div>
          <div className="tags">
            {post.data.tags?.map((tag) => (
              // eslint-disable-next-line react/jsx-key
              <a href={`/tag/${tag}`}>#{tag}</a>
            ))}
          </div>
        </div>
        <div className="post" dangerouslySetInnerHTML={{ __html: post.html }}></div>
        <div className="footer">
          <div className="edit">
            <a
              href={`https://github.com/do4ng/do4ng.github.io/edit/main/posts/${post.data.raw}`}
            >
              Edit on Github
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
