/* eslint-disable @next/next/no-img-element */
import { Link, Image } from 'exta/components';
import { cleanTitle, PostType } from '../pages/post/[slug]';

export default function PostCard(props: { data: PostType }) {
  if (!props) return <></>;
  return (
    <>
      <div className="post-card" key={props.data.date}>
        <Link
          href={`/post/${cleanTitle(props.data.title)}`}
          className="no-a"
          prefetch={false}
        >
          <div className="post-button">
            {props.data.image ? (
              <Image src={props.data.image} alt="img"></Image>
            ) : (
              <div></div>
            )}
            <div className="post-button-detail">
              <h3>{props.data.title}</h3>
              <div className="post-detail">{props.data.description}</div>
            </div>
            <div className="post-button-tags">
              <div className="tags">
                {props.data.tags?.map((tag) => (
                  // eslint-disable-next-line react/jsx-key
                  <Link href={`/tag/${tag}`} prefetch={false} key={tag}>
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
