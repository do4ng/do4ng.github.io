import type { NextPage } from 'next';
import { PostData, server } from './post/[slug]';

export function removeArrayDup(arr: any[]): any[] {
  let result = [];
  arr.forEach((element) => {
    if (!result.includes(element)) {
      result.push(element);
    }
  });
  return result;
}

export async function getStaticProps({ params }) {
  // Call an external API endpoint to get posts
  const res = await fetch(`${server}/posts.json`);
  const posts = await res.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return { props: { posts } };
}

const Home: NextPage = ({ posts }: { posts: PostData[] }) => {
  let raw = [];

  posts.forEach((post) => {
    raw = [...raw, ...(post.data.tags || [])];
  });

  const tags = removeArrayDup(raw);

  return (
    <div className="tag-list">
      <h2>Tags</h2>
      {tags.map((tag) => (
        <>
          <a href={`/tag/${tag}`} className="tag-item">
            #{tag}
          </a>
        </>
      ))}
    </div>
  );
};

export default Home;
