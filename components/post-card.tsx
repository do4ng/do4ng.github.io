/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { cleanTitle, PostType } from '../pages/post/[slug]';

export default function PostCard(props: { data: PostType }) {
  if (!props) return <></>;
  return (
    <>
      <div className="post-card" key={props.data.date}>
        <Link
          href={`/post/${cleanTitle(props.data.title)}`}
          className="no-a"
          legacyBehavior
        >
          <div className="post-button">
            <img src={props.data.image} alt="img"></img>
            <div className="post-button-detail">
              <h3>{props.data.title}</h3>
              <div className="post-detail">{props.data.description}</div>
            </div>
            <div className="post-button-tags">
              <div className="tags">
                {props.data.tags?.map((tag) => (
                  // eslint-disable-next-line react/jsx-key
                  <Link href={`/tag/${tag}`} legacyBehavior key={tag}>
                    <a>#{tag}</a>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
