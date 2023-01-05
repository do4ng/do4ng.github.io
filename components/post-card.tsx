import Link from 'next/link';
import { cleanTitle, PostType } from '../pages/post/[slug]';

export default function PostCard(props: { data: PostType }) {
  if (!props) return <></>;
  return (
    <>
      <div className="post-card">
        <h3>
          <Link href={`/post/${cleanTitle(props.data.title)}`} className="no-a">
            {props.data.title}
          </Link>
        </h3>
        <div className="post-detail">
          <div className="tags">
            {props.data.tags?.map((tag) => (
              // eslint-disable-next-line react/jsx-key
              <a href={`/tag/${tag}`}>#{tag}</a>
            ))}
          </div>
          {props.data.description}
        </div>
      </div>
    </>
  );
}
