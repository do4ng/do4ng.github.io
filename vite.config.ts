import { defineConfig, Plugin } from 'vite';
import { exta } from 'exta';
import react from '@vitejs/plugin-react';
import { writeFileSync } from 'fs';
import path from 'node:path';

import posts from './pages/post/posts.json';

const baseURL = 'https://do4ng.vercel.app';

export interface CompileOptions {
  /** @default {true} */
  ignoreSideEffects?: boolean;
  preserveSideEffects?: string[];
  outdir?: string;
  assetsExtensions?: string[];
}
function toISODate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  const d = new Date(Date.UTC(year, month - 1, day));
  return d.toISOString(); // 예: "2025-09-03T00:00:00.000Z"
}

export function SitemapPlugin(baseURL: string): Plugin {
  return {
    name: 'build:sitemap',
    apply: 'build',
    closeBundle() {
      const sitemap: string[] = [];

      sitemap.push('<?xml version="1.0" encoding="UTF-8"?>');
      sitemap.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

      sitemap.push(`  <url>`);
      sitemap.push(`    <loc>${baseURL}/</loc>`);
      sitemap.push(`    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>`);
      sitemap.push(`  </url>`);

      for (const [key, post] of Object.entries(posts)) {
        sitemap.push(`  <url>`);
        sitemap.push(`    <loc>${baseURL}/post/${key}</loc>`);
        if (post.date) {
          sitemap.push(`    <lastmod>${toISODate(post.date)}</lastmod>`);
        }
        sitemap.push(`  </url>`);
      }

      sitemap.push('</urlset>');

      const outPath = path.resolve(process.cwd(), 'dist', 'sitemap.xml');
      writeFileSync(outPath, sitemap.join('\n'), 'utf-8');

      console.log(`✅ sitemap.xml generated at ${outPath}`);
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    exta({
      compileOptions: {
        ignoreSideEffects: true,
      } as CompileOptions,
    }),

    SitemapPlugin(baseURL),
  ],
  publicDir: './public',
});
