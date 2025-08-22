// components/post-card.tsx
import { Link as Link2, Image } from "exta/components";

// pages/post/[slug].tsx
import { Link } from "exta/components";
import { useRef, useState } from "react";

// pages/post/posts.json
var posts_default = {
  "SSG-\uD504\uB808\uC784\uC6CC\uD06C-\uB9CC\uB4E4\uAE30": {
    name: "2025-03-23",
    title: "SSG \uD504\uB808\uC784\uC6CC\uD06C \uB9CC\uB4E4\uAE30",
    date: "2025-08-22",
    tags: ["javascript", "dev", "ssg"],
    image: "/assets/ssg.gif",
    description: "\uC77C\uC9C0 #1"
  },
  "\uBC88\uB4E4\uB7EC\uB97C-\uB9CC\uB4E4\uC5C8\uB2E4": {
    name: "2025-01-19",
    title: "\uBC88\uB4E4\uB7EC\uB97C \uB9CC\uB4E4\uC5C8\uB2E4",
    date: "2025-01-19",
    tags: ["javascript", "bundler", "dev", "serpack"],
    description: "swc\uAE30\uBC18 \uBC88\uB4E4\uB7EC\uB97C \uB9CC\uB4E4\uC5C8\uB2E4",
    image: "/img/2025-01-19.png"
  },
  "\uBC88\uB4E4\uB41C-\uD30C\uC77C\uC5D0\uC11C-\uC624\uB958-\uCD94\uC801\uD558\uAE30": {
    name: "2024-07-24",
    title: "\uBC88\uB4E4\uB41C \uD30C\uC77C\uC5D0\uC11C \uC624\uB958 \uCD94\uC801\uD558\uAE30",
    date: "2024-07-24",
    tags: ["javascript", "testing", "dev"],
    description: "",
    image: "/img/2024-07-24.png",
    img_from: 'bg from <a href="https://unsplash.com/">Unsplash</a>\uC5D0 \uC788\uB294 <a href="https://unsplash.com/ko/@boliviainteligente">@BoliviaInteligente</a>\uC758 \uC0AC\uC9C4'
  },
  "\uC0C8\uB85C\uC6B4-\uBB38\uC11C": {
    name: "2023-11-23",
    title: "\uC0C8\uB85C\uC6B4 \uBB38\uC11C",
    date: "2023-11-23",
    tags: ["ui", "next"],
    description: "vitepress\uC5D0\uC11C \uD0C8\uCD9C\uD558\uACE0 \uC9C1\uC811 \uBB38\uC11C \uB9CC\uB4E4\uAE30",
    image: "/assets/2023-11-23.png"
  },
  "Typescript\uC5D0\uC11C-Javascript\uB85C-\uC774\uC8FC\uD558\uAE30": {
    name: "2023-10-07",
    title: "Typescript\uC5D0\uC11C Javascript\uB85C \uC774\uC8FC\uD558\uAE30",
    date: "2023-10-07",
    tags: ["typescript", "javascript"],
    description: "\uD604\uC7AC Typescript\uC758 \uBB38\uC81C\uC810",
    image: "/img/2023-10-07.png"
  },
  "\uB098\uB9CC\uC758-\uD504\uB860\uD2B8\uC5D4\uB4DC-\uB77C\uC774\uBE0C\uB7EC\uB9AC-\uB9CC\uB4E4\uAE30-(2)": {
    name: "2023-09-30",
    title: "\uB098\uB9CC\uC758 \uD504\uB860\uD2B8\uC5D4\uB4DC \uB77C\uC774\uBE0C\uB7EC\uB9AC \uB9CC\uB4E4\uAE30 (2)",
    date: "2023-09-30",
    tags: ["dev", "frontend", "javascript"],
    description: "\uBCF5\uBD99\uC644\uB8CC",
    image: "/img/2023-09-29.png"
  },
  "\uB098\uB9CC\uC758-\uD504\uB860\uD2B8\uC5D4\uB4DC-\uB77C\uC774\uBE0C\uB7EC\uB9AC-\uB9CC\uB4E4\uAE30-(1)": {
    name: "2023-09-29",
    title: "\uB098\uB9CC\uC758 \uD504\uB860\uD2B8\uC5D4\uB4DC \uB77C\uC774\uBE0C\uB7EC\uB9AC \uB9CC\uB4E4\uAE30 (1)",
    date: "2023-09-29",
    tags: ["dev", "frontend", "javascript"],
    description: "\uC9ED\uC5D1\uD2B8",
    image: "/img/2023-09-29.png"
  },
  "npm-\uD328\uD0A4\uC9C0": {
    name: "2023-09-28",
    title: "npm \uD328\uD0A4\uC9C0",
    date: "2023-09-28",
    tags: ["dev", "npm", "zely", "asto"],
    description: "\uB9CC\uB4E0 npm \uD328\uD0A4\uC9C0\uB4E4",
    image: "/img/2023-09-28.png"
  },
  "\uBE14\uB85C\uADF8-\uC5C5\uB370\uC774\uD2B8": {
    name: "2023-09-27",
    title: "\uBE14\uB85C\uADF8 \uC5C5\uB370\uC774\uD2B8",
    date: "2023-09-27",
    tags: ["blog"],
    description: "\uBCC4\uB85C \uBC14\uB010\uAC74 \uC5C6\uB2E4",
    image: "/img/2023-09-27.png"
  },
  "react\uC5D0-ssr-\uC801\uC6A9\uD558\uAE30": {
    name: "2023-02-09",
    title: "React\uC5D0 SSR \uC801\uC6A9\uD558\uAE30",
    date: "2023-02-09",
    tags: ["frontend", "dev", "react"],
    description: "next \uB530\uB77C\uD558\uAE30",
    image: "/img/2023-02-09.png"
  }
};

// mdx/run.ts
import { runSync } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";

// mdx/content.tsx
import { jsx } from "react/jsx-runtime";

// mdx/compile.ts
import { compile } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import raw from "rehype-raw";

// plugins/anchor.ts
import visit from "unist-util-visit";
import toString from "mdast-util-to-string";

// pages/post/[slug].tsx
import { Fragment, jsx as jsx2, jsxs } from "react/jsx-runtime";
var dev = process.env.NODE_ENV !== "production";

// components/post-card.tsx
import { Fragment as Fragment2, jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";

// pages/tags.tsx
import { Link as Link3 } from "exta/components";
import { Fragment as Fragment3, jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
function removeArrayDup(arr) {
  let result = [];
  const counts = {};
  arr.forEach((element) => {
    if (!result.includes(element)) {
      result.push(element);
      counts[element] = 1;
    } else {
      counts[element] += 1;
    }
  });
  return { result, counts };
}

// pages/tag/[slug].tsx
import { Fragment as Fragment4, jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
function getStaticParams() {
  let raw2 = [];
  Object.keys(posts_default).forEach((post) => {
    raw2 = [...raw2, ...posts_default[post].tags || []];
  });
  const { result } = removeArrayDup(raw2);
  return result.map((r) => ({ slug: r }));
}
export {
  getStaticParams
};
