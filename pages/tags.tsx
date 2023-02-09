import type { NextPage } from 'next';
import Link from 'next/link';
import posts from './api/posts.json';

export function removeArrayDup(arr: any[]) {
  let result = [];
  const counts = {};
  arr.forEach((element) => {
    if (!result.includes(element)) {
      result.push(element);
      counts[element] = 1;
    } else {
      counts[element] += 1;
    }
  });
  return { result, counts };
}

const Home: NextPage = () => {
  let raw = [];

  posts.forEach((post) => {
    raw = [...raw, ...(post.data.tags || [])];
  });

  const { result, counts } = removeArrayDup(raw);

  return (
    <div className="tag-list">
      <h2>Tags</h2>
      <div className="tag-items">
        {result.map((tag) => (
          <>
            <div className="tag-item">
              <Link href={`/tag/${tag}`}>
                <a className="tag-a">#{tag}</a>
              </Link>
              <span className="tag-count">({counts[tag]})</span>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Home;
