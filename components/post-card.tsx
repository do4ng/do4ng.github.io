/* eslint-disable @next/next/no-img-element */
import { Link, Image } from 'exta/components';
import { cleanTitle, PostType } from '../pages/post/[slug]';

export default function PostCard(props: { data: PostType; href: string }) {
  if (!props) return <></>;
  return (
    <>
      <div className="post-card" key={props.data.date}>
        <Link href={`/post/${props.href}`} className="no-a" prefetch={false}>
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
              <div className="tags code-font">
                {props.data.tags?.map((tag) => (
                  // eslint-disable-next-line react/jsx-key
                  <Link href={`/tag/${tag}`} prefetch={false} key={tag}>
                    #{tag}
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
