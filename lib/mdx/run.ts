import { runSync } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import { MDXContent } from 'mdx/types';

export const runMdx = (code: any): Promise<MDXContent> => {
  const mdx = runSync(code, runtime);
  const { default: Content } = mdx;
  return Content;
};
