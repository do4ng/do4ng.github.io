// mdx/compile.ts
import { compile } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import raw from "rehype-raw";

// plugins/anchor.ts
import visit from "unist-util-visit";
import toString from "mdast-util-to-string";
var plugin = () => {
  return (tree, file) => {
    visit(tree, "heading", (node, index, parent) => {
      const html = toString(node);
      node.type = "html";
      node.children = void 0;
      node.value = `<h${node.depth} id="${html}"><a href="#${html}">#</a>${html}</h${node.depth}>`;
    });
  };
};

// mdx/compile.ts
var compileMdx = async (content) => {
  if (typeof window !== "undefined") throw Error("compileMdx should run on server only");
  const options = {
    format: "md",
    outputFormat: "function-body",
    remarkPlugins: [remarkGfm, plugin],
    development: false,
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          keepBackground: false
        }
      ],
      raw
    ]
  };
  const code = await compile(content, options);
  const text = String(code);
  return text;
};

// pages/project/index.tsx
import { readFileSync } from "fs";
import { join } from "path";

// pages/post/[slug].tsx
import { Link as Link3 } from "exta/components";
import { useRef, useState } from "react";

// components/post-card.tsx
import { Link, Image } from "exta/components";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";

// pages/tags.tsx
import { Link as Link2 } from "exta/components";
import { Fragment as Fragment2, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";

// pages/tag/[slug].tsx
import { Fragment as Fragment3, jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";

// pages/post/[slug].tsx
import { Fragment as Fragment4, jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
var dev = process.env.NODE_ENV !== "production";

// mdx/run.ts
import { runSync } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";

// mdx/content.tsx
import { jsx as jsx5 } from "react/jsx-runtime";

// pages/project/index.tsx
import { Fragment as Fragment5, jsx as jsx6, jsxs as jsxs5 } from "react/jsx-runtime";
async function getStaticProps() {
  let markdown;
  if (process.env.NODE_ENV === "development") {
    markdown = readFileSync(join(process.cwd(), "posts", `${"0-hello"}.mdx`)).toString();
  } else {
    try {
      const res = await fetch(
        `https://raw.githubusercontent.com/do4ng/do4ng.github.io/main/posts/${"0-hello"}.mdx`
      );
      markdown = await res.text();
    } catch (e) {
      console.error(e);
      return {
        props: {
          markdown: null,
          reason: e
        }
      };
    }
  }
  const compiled = await compileMdx(markdown);
  return {
    compiled
  };
}
export {
  getStaticProps
};
