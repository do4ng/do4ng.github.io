import { defineConfig } from 'vite';
import { exta } from 'exta';
import react from '@vitejs/plugin-react';
import Sitemap from 'vite-plugin-sitemap';

export interface CompileOptions {
  /** @default {true} */
  ignoreSideEffects?: boolean;
  preserveSideEffects?: string[];
  outdir?: string;
  assetsExtensions?: string[];
}

export default defineConfig({
  plugins: [
    react(),
    exta({
      compileOptions: {
        ignoreSideEffects: true,
      } as CompileOptions,
    }),
  ],
  publicDir: './public',
});
