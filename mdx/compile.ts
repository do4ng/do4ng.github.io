import { compile, CompileOptions } from '@mdx-js/mdx';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import raw from 'rehype-raw';

import fs from 'fs';
import { join } from 'path';

import { plugin } from '../plugins/anchor';
import { getHighlighter } from 'shiki';

const touched = { current: false };

// https://github.com/memos-pub/memos.pub/blob/dd4933e511fd605ac4aaad38e4ea03ef151794ba/lib/mdx/plugins/code.ts

const getShikiPath = (): string => {
  return join(process.cwd(), 'shiki');
};

const touchShikiPath = (): void => {
  if (touched.current) return;
  fs.readdir(getShikiPath(), () => {});
  touched.current = true;
};

export const compileMdx = async (content: string): Promise<string> => {
  if (typeof window !== 'undefined') throw Error('compileMdx should run on server only');

  const options: CompileOptions = {
    format: 'md',
    outputFormat: 'function-body',
    remarkPlugins: [remarkGfm, plugin],
    development: false,
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: 'material-theme-palenight',
          getHighlighter: async () => {
            touchShikiPath();
            const highlighter = await getHighlighter({
              ...(options as any),
              paths: {
                languages: `${getShikiPath()}/languages/`,
                themes: `${getShikiPath()}/themes/`,
              },
            });

            return highlighter;
          },
          paths: {
            languages: `${getShikiPath()}/languages/`,
            themes: `${getShikiPath()}/themes/`,
          },
        },
      ],
      raw,
    ],
  };

  const code = await compile(content, options);

  console.log(typeof code);

  const text = String(code);

  return text;
};
