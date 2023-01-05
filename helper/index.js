const fs = require('fs');
const { join } = require('path');
const { getHighlighter } = require('shiki');
const markdown = require('markdown-it');
const meta = require('markdown-it-meta');

async function parseMarkdown(raw) {
  const highlighter = await getHighlighter({ theme: 'material-default' });
  const md = new markdown({
    html: true,
    highlight: (code, lang) => highlighter.codeToHtml(code, { lang }),
  });

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
  for (const post of posts) {
    const parsed = await parseMarkdown(
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
