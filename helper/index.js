const fs = require('fs');
const { join } = require('path');
const { getHighlighter } = require('shiki');
const markdown = require('markdown-it');
const meta = require('markdown-it-meta');

async function parseMarkdown(hl, raw) {
  const md = new markdown({
    html: true,
    highlight: (code, lang) => hl.codeToHtml(code, { lang }),
  });

  md.use(require('markdown-it-anchor'));
  md.use(meta);

  return {
    html: md.render(raw),
    data: md.meta,
  };
}

const posts = fs.readdirSync(join(__dirname, '../posts'));

// output: public/posts.json

const result = [];

async function main() {
  const hl = await getHighlighter({ theme: 'material-palenight' });
  for (const post of posts) {
    const parsed = await parseMarkdown(
      hl,
      fs.readFileSync(join(__dirname, '../posts', post)).toString()
    );
    parsed.data.raw = post;
    result.push(parsed);
  }

  fs.writeFileSync(
    join(__dirname, '../pages/api/posts.json'),
    JSON.stringify(result.reverse())
  );
}

main();
