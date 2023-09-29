import { compile, CompileOptions } from '@mdx-js/mdx';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import raw from 'rehype-raw';

import fs from 'fs';
import { join } from 'path';
import { getHighlighter, BUNDLED_LANGUAGES, BUNDLED_THEMES } from 'shiki';

import MaterialPalenight from 'shiki/themes/material-theme-palenight.json';

import { plugin } from '../plugins/anchor';

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
          theme: MaterialPalenight,
          getHighlighter: async (options) => {
            touchShikiPath();
            const highlighter = await getHighlighter({
              ...options,
              paths: {
                themes:
                  typeof window !== 'undefined'
                    ? 'https://cdn.jsdelivr.net/npm/shiki@latest/themes/'
                    : join(process.cwd(), 'shiki/themes'),
                languages:
                  typeof window !== 'undefined'
                    ? 'https://cdn.jsdelivr.net/npm/shiki@latest/languages/'
                    : join(process.cwd(), 'shiki/languages'),
              },
            });

            return highlighter;
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
