import type { NextPage } from 'next';
import Link from 'next/link';
import posts from './api/posts.json';

export function removeArrayDup(arr: any[]): any[] {
  let result = [];
  arr.forEach((element) => {
    if (!result.includes(element)) {
      result.push(element);
    }
  });
  return result;
}

const Home: NextPage = () => {
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
