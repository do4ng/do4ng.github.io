import { components } from '../pages/post/[slug]';
import { runMdx } from './run';

interface Props {
  content: string;
}

export const Content = (props: Props): JSX.Element => {
  const content = props.content;
  const MDX: any = runMdx(content);
  return <MDX components={components} />;
};
