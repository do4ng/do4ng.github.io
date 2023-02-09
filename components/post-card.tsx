import Link from 'next/link';
import { cleanTitle, PostType } from '../pages/post/[slug]';

export default function PostCard(props: { data: PostType }) {
  if (!props) return <></>;
  return (
    <>
      <div className="post-card">
        <Link href={`/post/${cleanTitle(props.data.title)}`} className="no-a">
          <button className="post-button">
            <h3>{props.data.title}</h3>
            <div className="post-detail">
              {props.data.description}
              <div className="tags">
                {props.data.tags?.map((tag) => (
                  // eslint-disable-next-line react/jsx-key
                  <Link href={`/tag/${tag}`}>
                    <a>#{tag}</a>
                  </Link>
                ))}
              </div>
            </div>
          </button>
        </Link>
      </div>
    </>
  );
}
