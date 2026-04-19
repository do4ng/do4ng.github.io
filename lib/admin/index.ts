// vite plugin for admin feature

import type { IncomingMessage } from 'http';
import type { Plugin } from 'vite';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

type PostMeta = {
  name: string;
  title: string;
  date: string;
  tags: string[];
  description: string;
};

interface TypedRequestBody {
  slug: string;
  meta: PostMeta;
  content: string;
}

type TypedRequest = IncomingMessage & {
  body: TypedRequestBody;
};

const POSTS_JSON_PATH = path.resolve(process.cwd(), './posts.json');
const POSTS_DIR = path.resolve(process.cwd(), 'posts');

function readPosts(): Record<string, PostMeta> {
  if (!fs.existsSync(POSTS_JSON_PATH)) return {};
  return JSON.parse(fs.readFileSync(POSTS_JSON_PATH, 'utf-8'));
}

function writePosts(data: Record<string, PostMeta>) {
  fs.writeFileSync(POSTS_JSON_PATH, JSON.stringify(data, null, 2));
}

export function adminMiddleware(): Plugin {
  return {
    name: 'admin-middleware',
    apply: 'serve',

    configureServer(server) {
      server.middlewares.use(bodyParser.json());

      server.middlewares.use('/apis/post', async (req: TypedRequest, res) => {
        const url = req.url || '';
        const method = req.method || 'GET';

        try {
          if (method === 'GET') {
            const posts = readPosts();

            const slug = new URL(req.url!, 'http://localhost').searchParams.get('slug');

            if (!slug) {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(posts));
              return;
            }

            const meta = posts[slug];
            console.log(slug, posts, meta);
            if (!meta) {
              res.statusCode = 404;
              return res.end('Not found');
            }

            const filePath = path.join(POSTS_DIR, `${meta.name}.mdx`);
            const content = fs.existsSync(filePath)
              ? fs.readFileSync(filePath, 'utf-8')
              : '';

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ meta, content }));
            return;
          }

          if (method === 'POST') {
            const { slug, meta, content } = req.body;

            if (!slug || !meta) {
              res.statusCode = 400;
              return res.end('Invalid body');
            }

            const posts = readPosts();

            posts[slug] = meta;
            writePosts(posts);

            const filePath = path.join(POSTS_DIR, `${meta.name}.mdx`);
            fs.writeFileSync(filePath, content || '');

            res.end(JSON.stringify({ ok: true }));
            return;
          }

          if (method === 'PUT') {
            const { slug, meta, content } = req.body;

            const posts = readPosts();
            if (!posts[slug]) {
              res.statusCode = 404;
              return res.end('Not found');
            }

            posts[slug] = meta;
            writePosts(posts);

            const filePath = path.join(POSTS_DIR, `${meta.name}.mdx`);
            fs.writeFileSync(filePath, content || '');

            res.end(JSON.stringify({ ok: true }));
            return;
          }

          // DELETE
          if (method === 'DELETE') {
            const { slug } = req.body;

            const posts = readPosts();
            const meta = posts[slug];

            if (!meta) {
              res.statusCode = 404;
              return res.end('Not found');
            }

            delete posts[slug];
            writePosts(posts);

            const filePath = path.join(POSTS_DIR, `${meta.name}.mdx`);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

            res.end(JSON.stringify({ ok: true }));
            return;
          }

          res.statusCode = 405;
          res.end('Method not allowed');
        } catch (err) {
          console.error(err);
          res.statusCode = 500;
          res.end('Server error');
        }
      });
    },
  };
}
