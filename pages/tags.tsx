import { Link } from 'exta/components';
import posts from './post/posts.json';

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

const Home = () => {
  let raw = [];

  Object.keys(posts).forEach((post) => {
    raw = [...raw, ...(posts[post].tags || [])];
  });

  const { result, counts } = removeArrayDup(raw);

  return (
    <div className="tag-list">
      <h2>
        <i className="ri-hashtag"></i>
      </h2>
      <div className="tag-items">
        {result.map((tag) => (
          <>
            <div className="tag-item">
              <Link href={`/tag/${tag}`} legacyBehavior>
                <a className="tag-a posttag">
                  #{tag}
                  <span className="tag-count">({counts[tag]})</span>
                </a>
              </Link>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Home;
