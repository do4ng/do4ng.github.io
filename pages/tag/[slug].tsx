import PostCard from '../../components/post-card';
import rawPosts from '../post/posts.json';
import { removeArrayDup } from '../tags';
import posts from '../post/posts.json';

export const LoadTags = (slug: string | string[]) => {
  const posts = Object.keys(rawPosts).filter((post) =>
    rawPosts[post].tags?.includes(slug as string)
  );

  return posts;
};

export function getStaticParams() {
  let raw = [];

  Object.keys(posts).forEach((post) => {
    raw = [...raw, ...(posts[post].tags || [])];
  });

  const { result } = removeArrayDup(raw);

  return result.map((r) => ({ slug: r }));
}

const Home = ({ params: { slug } }) => {
  const posts = LoadTags(slug);

  return (
    <>
      <div className="posts">
        <div className="directory">
          #<strong style={{ textTransform: 'capitalize' }}>{slug as string}</strong>
          <span style={{ color: '#5a7fe4', paddingLeft: '5px' }}>
            ({posts.length}개의 글)
          </span>
        </div>
        <div className="post-list">
          {posts.map((post) => (
            // eslint-disable-next-line react/jsx-key
            <PostCard data={rawPosts[post]} key={post}></PostCard>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
