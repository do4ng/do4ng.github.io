import { compile, CompileOptions } from '@mdx-js/mdx';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import raw from 'rehype-raw';

import { plugin } from '../plugins/anchor';

const touched = { current: false };

// https://github.com/memos-pub/memos.pub/blob/dd4933e511fd605ac4aaad38e4ea03ef151794ba/lib/mdx/plugins/code.ts

export const compileMdx = async (content: string): Promise<string> => {
  if (typeof window !== 'undefined') throw Error('compileMdx should run on server only');

  const options: CompileOptions = {
    format: 'md',
    outputFormat: 'function-body',
    remarkPlugins: [remarkGfm, plugin],
    development: false,
    rehypePlugins: [
      [
        // @ts-ignore
        rehypePrettyCode,
        {
          keepBackground: false,
        },
      ],
      raw,
    ],
  };

  const code = await compile(content, options);

  const text = String(code);

  return text;
};
