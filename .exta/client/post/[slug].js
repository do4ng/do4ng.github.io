// pages/post/[slug].tsx
import { Link as Link3 } from "exta/components";
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
var runMdx = (code) => {
  const mdx = runSync(code, runtime);
  const { default: Content2 } = mdx;
  return Content2;
};

// mdx/content.tsx
import { jsx } from "react/jsx-runtime";
var Content = (props) => {
  const content = props.content;
  const MDX = runMdx(content);
  return jsx(MDX, { components });
};

// mdx/compile.ts
import { compile } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import raw from "rehype-raw";

// plugins/anchor.ts
import visit from "unist-util-visit";
import toString from "mdast-util-to-string";

// components/post-card.tsx
import { Link, Image } from "exta/components";
import { Fragment, jsx as jsx2, jsxs } from "react/jsx-runtime";

// pages/tags.tsx
import { Link as Link2 } from "exta/components";
import { Fragment as Fragment2, jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";

// pages/tag/[slug].tsx
import { Fragment as Fragment3, jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var LoadTags = (slug) => {
  const posts = Object.keys(posts_default).filter(
    (post) => posts_default[post].tags?.includes(slug)
  );
  return posts;
};

// pages/post/[slug].tsx
import { Fragment as Fragment4, jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
var langsIcons = {
  ts: "javascript-line",
  js: "javascript-line",
  tsx: "reactjs-line",
  jsx: "reactjs-line",
  html: "html5-line",
  css: "css3-fill",
  txt: "file-text-line",
  bash: "terminal-box-line",
  sh: "terminal-box-line"
};
var langs = {
  ts: "Typescript",
  js: "Javascript",
  tsx: "React",
  jsx: "React",
  html: "HTML",
  css: "CSS",
  txt: "Plain",
  bash: "Terminal",
  sh: "Terminal",
  rs: "Rust"
};
var components = {
  h1: (props) => {
    return jsx5("h1", { ...props });
  },
  h2: (props) => {
    return jsx5("h2", { ...props });
  },
  h3: (props) => {
    return jsx5("h3", { ...props });
  },
  h4: (props) => {
    return jsx5("h4", { ...props });
  },
  h5: (props) => {
    return jsx5("h5", { ...props });
  },
  h6: (props) => {
    return jsx5("h6", { ...props });
  },
  figure: (props) => {
    if (props["data-rehype-pretty-code-figure"] === "") {
      if (props.children[0]?.props["data-rehype-pretty-code-title"] !== "") {
        const lang = props.children.props["data-language"];
        const [copy, setCopy] = useState("copy");
        const ref = useRef();
        return jsxs4("div", { "data-rehype-pretty-code-fragment": "", children: [
          jsx5("div", { ...props.children.props, "data-rehype-pretty-code-title": "", children: jsxs4("div", { className: "code-lang", children: [
            jsx5("i", { className: `ri-${langsIcons[lang] || langsIcons.txt}` }),
            jsx5("span", { children: langs[lang] || langs.txt }),
            jsx5(
              "button",
              {
                ref,
                className: "copy-code",
                onClick: () => {
                  const code = ref.current.parentNode.parentNode.parentNode.querySelector(
                    "code"
                  ).innerText;
                  window.navigator.clipboard.writeText(code).then(() => {
                    setCopy("copied!");
                    setTimeout(() => {
                      setCopy("copy");
                    }, 2e3);
                  });
                },
                children: copy
              }
            )
          ] }) }),
          props.children
        ] });
      }
    }
    if (props["data-rehype-pretty-code-title"] === "") {
      const lang = props["data-language"];
      const [copy, setCopy] = useState("copy");
      const ref = useRef();
      const title = props.children;
      return jsx5("div", { ...props, children: jsxs4("div", { className: "code-lang", children: [
        jsx5("i", { className: `ri-${langsIcons[lang] || langsIcons.txt}` }),
        jsx5("span", { children: title }),
        jsx5(
          "button",
          {
            ref,
            className: "copy-code",
            onClick: () => {
              const code = ref.current.parentNode.parentNode.parentNode.querySelector(
                "code"
              ).innerText;
              window.navigator.clipboard.writeText(code).then(() => {
                setCopy("copied!");
                setTimeout(() => {
                  setCopy("copy");
                }, 2e3);
              });
            },
            children: copy
          }
        )
      ] }) });
    }
    return jsx5("div", { ...props });
  },
  pre: (props) => {
    return jsx5(Fragment4, { children: jsx5("div", { className: "code-block", style: props.style, children: jsx5("pre", { ...props }) }) });
  }
};
var Post = ({
  params,
  props
}) => {
  const { data, compiled } = props;
  let { slug } = params;
  slug = decodeURI(slug);
  const anotherPosts = LoadTags(data.tags[0]).map((t) => ({
    ...posts_default[t],
    origin: t
  }));
  if (props.markdown === null) {
    return jsx5(Fragment4, { children: "404" });
  }
  return jsx5(Fragment4, { children: jsxs4("div", { className: "post-container", children: [
    jsxs4("div", { className: "preface", children: [
      jsx5("div", { className: "title", children: data.title }),
      jsxs4("div", { className: "post-items", children: [
        jsx5("div", { className: "name", children: "do4ng" }),
        jsx5("div", { className: "border", children: " \u2022 " }),
        jsx5("div", { className: "date", children: data.date })
      ] }),
      jsx5("div", { className: "tags", children: data.tags?.map((tag) => (
        // eslint-disable-next-line react/jsx-key
        jsxs4("a", { href: `/tag/${tag}`, className: "posttag", children: [
          "#",
          tag
        ] }, tag)
      )) })
    ] }),
    jsx5("div", { className: "post-layer", children: jsxs4("div", { className: "post", children: [
      jsx5("img", { src: data.image, alt: "" }),
      jsx5(
        "p",
        {
          className: "img-from",
          dangerouslySetInnerHTML: { __html: data.img_from || "" }
        }
      ),
      jsx5("main", { children: jsx5(Content, { content: compiled }) }),
      jsxs4("div", { className: "other-posts", children: [
        jsxs4("h4", { children: [
          "#",
          data.tags[0],
          "\uC758 \uB2E4\uB978 \uAE00"
        ] }),
        jsx5("div", { className: "other-posts-container", children: anotherPosts.map((post) => jsx5(Fragment4, { children: jsx5("div", { className: "other-post", children: jsx5(
          Link3,
          {
            className: post.origin.toLowerCase() === slug.toLowerCase() ? "active" : null,
            href: `/post/${post.origin}`,
            prefetch: false,
            children: post.title
          }
        ) }) })) })
      ] }),
      jsxs4("div", { className: "footer", children: [
        jsx5("div", { className: "edit", children: jsxs4(
          "a",
          {
            href: `https://github.com/do4ng/do4ng.github.io/edit/main/posts/${data.raw}`,
            children: [
              jsx5("i", { className: "ri-edit-2-line" }),
              " Edit on Github"
            ]
          }
        ) }),
        jsx5("div", { className: "back", children: jsx5(Link3, { href: "/", children: "Back to blog" }) })
      ] })
    ] }) })
  ] }) });
};
var slug_default = Post;
export {
  slug_default as _page
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vcGFnZXMvcG9zdC8lNUJzbHVnJTVELnRzeCIsICIuLi8uLi8uLi9wYWdlcy9wb3N0L3Bvc3RzLmpzb24iLCAiLi4vLi4vLi4vbWR4L3J1bi50cyIsICIuLi8uLi8uLi9tZHgvY29udGVudC50c3giLCAiLi4vLi4vLi4vbWR4L2NvbXBpbGUudHMiLCAiLi4vLi4vLi4vcGx1Z2lucy9hbmNob3IudHMiLCAiLi4vLi4vLi4vY29tcG9uZW50cy9wb3N0LWNhcmQudHN4IiwgIi4uLy4uLy4uL3BhZ2VzL3RhZ3MudHN4IiwgIi4uLy4uLy4uL3BhZ2VzL3RhZy8lNUJzbHVnJTVELnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyogZXNsaW50LWRpc2FibGUgQG5leHQvbmV4dC9uby1pbWctZWxlbWVudCAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSByZWFjdC1ob29rcy9ydWxlcy1vZi1ob29rcyAqL1xyXG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAnZXh0YS9jb21wb25lbnRzJztcclxuXHJcbmltcG9ydCB7IHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XHJcblxyXG5pbXBvcnQgcG9zdExpc3QgZnJvbSAnLi9wb3N0cy5qc29uJztcclxuaW1wb3J0IHsgam9pbiB9IGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgeyByZWFkRmlsZVN5bmMsIHJlYWRkaXIgfSBmcm9tICdmcyc7XHJcblxyXG5pbXBvcnQgeyBDb250ZW50IH0gZnJvbSAnLi4vLi4vbWR4L2NvbnRlbnQnO1xyXG5pbXBvcnQgeyBjb21waWxlTWR4IH0gZnJvbSAnLi4vLi4vbWR4L2NvbXBpbGUnO1xyXG5pbXBvcnQgeyBMb2FkVGFncyB9IGZyb20gJy4uL3RhZy9bc2x1Z10nO1xyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyB1c2VMb2NhdGlvbiB9IGZyb20gJyRleHRhLXJvdXRlcic7XHJcblxyXG5jb25zdCB0b3VjaGVkID0geyBjdXJyZW50OiBmYWxzZSB9O1xyXG5cclxuY29uc3QgZGV2ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJztcclxuXHJcbmNvbnN0IGxhbmdzSWNvbnMgPSB7XHJcbiAgdHM6ICdqYXZhc2NyaXB0LWxpbmUnLFxyXG4gIGpzOiAnamF2YXNjcmlwdC1saW5lJyxcclxuICB0c3g6ICdyZWFjdGpzLWxpbmUnLFxyXG4gIGpzeDogJ3JlYWN0anMtbGluZScsXHJcbiAgaHRtbDogJ2h0bWw1LWxpbmUnLFxyXG4gIGNzczogJ2NzczMtZmlsbCcsXHJcbiAgdHh0OiAnZmlsZS10ZXh0LWxpbmUnLFxyXG4gIGJhc2g6ICd0ZXJtaW5hbC1ib3gtbGluZScsXHJcbiAgc2g6ICd0ZXJtaW5hbC1ib3gtbGluZScsXHJcbn07XHJcbmNvbnN0IGxhbmdzID0ge1xyXG4gIHRzOiAnVHlwZXNjcmlwdCcsXHJcbiAganM6ICdKYXZhc2NyaXB0JyxcclxuICB0c3g6ICdSZWFjdCcsXHJcbiAganN4OiAnUmVhY3QnLFxyXG4gIGh0bWw6ICdIVE1MJyxcclxuICBjc3M6ICdDU1MnLFxyXG4gIHR4dDogJ1BsYWluJyxcclxuICBiYXNoOiAnVGVybWluYWwnLFxyXG4gIHNoOiAnVGVybWluYWwnLFxyXG4gIHJzOiAnUnVzdCcsXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgY29tcG9uZW50cyA9IHtcclxuICBoMTogKHByb3BzOiBhbnkpID0+IHtcclxuICAgIHJldHVybiA8aDEgey4uLnByb3BzfT48L2gxPjtcclxuICB9LFxyXG4gIGgyOiAocHJvcHM6IGFueSkgPT4ge1xyXG4gICAgcmV0dXJuIDxoMiB7Li4ucHJvcHN9PjwvaDI+O1xyXG4gIH0sXHJcbiAgaDM6IChwcm9wczogYW55KSA9PiB7XHJcbiAgICByZXR1cm4gPGgzIHsuLi5wcm9wc30+PC9oMz47XHJcbiAgfSxcclxuICBoNDogKHByb3BzOiBhbnkpID0+IHtcclxuICAgIHJldHVybiA8aDQgey4uLnByb3BzfT48L2g0PjtcclxuICB9LFxyXG4gIGg1OiAocHJvcHM6IGFueSkgPT4ge1xyXG4gICAgcmV0dXJuIDxoNSB7Li4ucHJvcHN9PjwvaDU+O1xyXG4gIH0sXHJcbiAgaDY6IChwcm9wczogYW55KSA9PiB7XHJcbiAgICByZXR1cm4gPGg2IHsuLi5wcm9wc30+PC9oNj47XHJcbiAgfSxcclxuICBmaWd1cmU6IChwcm9wczogYW55KSA9PiB7XHJcbiAgICBpZiAocHJvcHNbJ2RhdGEtcmVoeXBlLXByZXR0eS1jb2RlLWZpZ3VyZSddID09PSAnJykge1xyXG4gICAgICBpZiAocHJvcHMuY2hpbGRyZW5bMF0/LnByb3BzWydkYXRhLXJlaHlwZS1wcmV0dHktY29kZS10aXRsZSddICE9PSAnJykge1xyXG4gICAgICAgIGNvbnN0IGxhbmcgPSBwcm9wcy5jaGlsZHJlbi5wcm9wc1snZGF0YS1sYW5ndWFnZSddO1xyXG4gICAgICAgIGNvbnN0IFtjb3B5LCBzZXRDb3B5XSA9IHVzZVN0YXRlKCdjb3B5Jyk7XHJcbiAgICAgICAgY29uc3QgcmVmID0gdXNlUmVmPEhUTUxCdXR0b25FbGVtZW50PigpO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICA8ZGl2IGRhdGEtcmVoeXBlLXByZXR0eS1jb2RlLWZyYWdtZW50PVwiXCI+XHJcbiAgICAgICAgICAgIDxkaXYgey4uLnByb3BzLmNoaWxkcmVuLnByb3BzfSBkYXRhLXJlaHlwZS1wcmV0dHktY29kZS10aXRsZT1cIlwiPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29kZS1sYW5nXCI+XHJcbiAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9e2ByaS0ke2xhbmdzSWNvbnNbbGFuZ10gfHwgbGFuZ3NJY29ucy50eHR9YH0+PC9pPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4+e2xhbmdzW2xhbmddIHx8IGxhbmdzLnR4dH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgIHJlZj17cmVmfVxyXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJjb3B5LWNvZGVcIlxyXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29kZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICByZWYuY3VycmVudC5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnY29kZSdcclxuICAgICAgICAgICAgICAgICAgICAgICkuaW5uZXJUZXh0O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQoY29kZSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBzZXRDb3B5KCdjb3BpZWQhJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0Q29weSgnY29weScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSwgMjAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIHtjb3B5fVxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICB7cHJvcHMuY2hpbGRyZW59XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHByb3BzWydkYXRhLXJlaHlwZS1wcmV0dHktY29kZS10aXRsZSddID09PSAnJykge1xyXG4gICAgICBjb25zdCBsYW5nID0gcHJvcHNbJ2RhdGEtbGFuZ3VhZ2UnXTtcclxuICAgICAgY29uc3QgW2NvcHksIHNldENvcHldID0gdXNlU3RhdGUoJ2NvcHknKTtcclxuICAgICAgY29uc3QgcmVmID0gdXNlUmVmPEhUTUxCdXR0b25FbGVtZW50PigpO1xyXG4gICAgICBjb25zdCB0aXRsZSA9IHByb3BzLmNoaWxkcmVuO1xyXG5cclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IHsuLi5wcm9wc30+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvZGUtbGFuZ1wiPlxyXG4gICAgICAgICAgICA8aSBjbGFzc05hbWU9e2ByaS0ke2xhbmdzSWNvbnNbbGFuZ10gfHwgbGFuZ3NJY29ucy50eHR9YH0+PC9pPlxyXG4gICAgICAgICAgICA8c3Bhbj57dGl0bGV9PC9zcGFuPlxyXG4gICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgcmVmPXtyZWZ9XHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiY29weS1jb2RlXCJcclxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb2RlID1cclxuICAgICAgICAgICAgICAgICAgcmVmLmN1cnJlbnQucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcihcclxuICAgICAgICAgICAgICAgICAgICAnY29kZSdcclxuICAgICAgICAgICAgICAgICAgKS5pbm5lclRleHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgd2luZG93Lm5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KGNvZGUpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBzZXRDb3B5KCdjb3BpZWQhJyk7XHJcbiAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldENvcHkoJ2NvcHknKTtcclxuICAgICAgICAgICAgICAgICAgfSwgMjAwMCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAge2NvcHl9XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gPGRpdiB7Li4ucHJvcHN9PjwvZGl2PjtcclxuICB9LFxyXG4gIHByZTogKHByb3BzOiBhbnkpID0+IHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDw+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2RlLWJsb2NrXCIgc3R5bGU9e3Byb3BzLnN0eWxlfT5cclxuICAgICAgICAgIDxwcmUgey4uLnByb3BzfT48L3ByZT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC8+XHJcbiAgICApO1xyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgc2VydmVyID0gZGV2ID8gJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCcgOiAnaHR0cHM6Ly9kbzRuZy52ZXJjZWwuY29tJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUG9zdFR5cGUge1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgZGF0ZTogc3RyaW5nO1xyXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgdGFnczogc3RyaW5nW107XHJcbiAgcmF3OiBzdHJpbmc7XHJcbiAgaW1hZ2U/OiBzdHJpbmc7XHJcbiAgaW1nX2Zyb20/OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUG9zdERhdGEge1xyXG4gIGh0bWw6IHN0cmluZztcclxuICBkYXRhOiBQb3N0VHlwZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFuVGl0bGUodGl0bGU6IHN0cmluZyA9ICcnKTogc3RyaW5nIHtcclxuICByZXR1cm4gdGl0bGUucmVwbGFjZSgvIC9nLCAnLScpLnRyaW0oKS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RhdGljUGFyYW1zKCkge1xyXG4gIHJldHVybiBPYmplY3Qua2V5cyhwb3N0TGlzdCkubWFwKChwb3N0KSA9PiAoe1xyXG4gICAgc2x1ZzogcG9zdC50b0xvd2VyQ2FzZSgpLFxyXG4gIH0pKTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFN0YXRpY1Byb3BzKHsgcGFyYW1zIH0pIHtcclxuICBjb25zdCByYXdQb3N0ID0gT2JqZWN0LmtleXMocG9zdExpc3QpLmZpbHRlcigodmFsdWUpID0+IHtcclxuICAgIHJldHVybiBjbGVhblRpdGxlKHZhbHVlKSA9PT0gY2xlYW5UaXRsZShkZWNvZGVVUkkocGFyYW1zLnNsdWcgYXMgc3RyaW5nKSk7XHJcbiAgfSk7XHJcblxyXG4gIGlmIChyYXdQb3N0Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbWFya2Rvd246IG51bGwsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgdHJ5IHtcclxuICAgIC8qXHJcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChcclxuICAgICAgYGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9kbzRuZy9kbzRuZy5naXRodWIuaW8vbWFpbi9wb3N0cy8ke1xyXG4gICAgICAgIHBvc3RMaXN0W3Jhd1Bvc3RbMF1dLm5hbWVcclxuICAgICAgfS5tZHhgXHJcbiAgICApO1xyXG4gICAgY29uc3QgbWFya2Rvd24gPSBhd2FpdCByZXMudGV4dCgpO1xyXG4gICAgKi9cclxuXHJcbiAgICBjb25zdCBtYXJrZG93biA9IHJlYWRGaWxlU3luYyhcclxuICAgICAgam9pbihwcm9jZXNzLmN3ZCgpLCAncG9zdHMnLCBgJHtwb3N0TGlzdFtyYXdQb3N0WzBdXS5uYW1lfS5tZHhgKVxyXG4gICAgKS50b1N0cmluZygpO1xyXG5cclxuICAgIGNvbnN0IGNvbXBpbGVkID0gYXdhaXQgY29tcGlsZU1keChtYXJrZG93bik7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBtYXJrZG93bixcclxuICAgICAgY29tcGlsZWQsXHJcbiAgICAgIGRhdGE6IHBvc3RMaXN0W3Jhd1Bvc3RbMF1dLFxyXG4gICAgfTtcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKGUpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbWFya2Rvd246IG51bGwsXHJcbiAgICAgIHJlYXNvbjogZSxcclxuICAgIH07XHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBQb3N0ID0gKHtcclxuICBwYXJhbXMsXHJcbiAgcHJvcHMsXHJcbn06IHtcclxuICBwYXJhbXM6IHsgc2x1Zzogc3RyaW5nIH07XHJcbiAgcHJvcHM6IHtcclxuICAgIGRhdGE6IFBvc3RUeXBlO1xyXG4gICAgbWFya2Rvd246IHN0cmluZztcclxuICAgIGNvbXBpbGVkOiBhbnk7XHJcbiAgICByZWFzb246IHN0cmluZztcclxuICB9O1xyXG59KSA9PiB7XHJcbiAgY29uc3QgeyBkYXRhLCBjb21waWxlZCB9ID0gcHJvcHM7XHJcbiAgbGV0IHsgc2x1ZyB9ID0gcGFyYW1zO1xyXG5cclxuICBzbHVnID0gZGVjb2RlVVJJKHNsdWcpO1xyXG5cclxuICBjb25zdCBhbm90aGVyUG9zdHM6IFBvc3RUeXBlW10gPSBMb2FkVGFncyhkYXRhLnRhZ3NbMF0pLm1hcCgodCkgPT4gKHtcclxuICAgIC4uLnBvc3RMaXN0W3RdLFxyXG4gICAgb3JpZ2luOiB0LFxyXG4gIH0pKSBhcyBhbnk7XHJcblxyXG4gIGlmIChwcm9wcy5tYXJrZG93biA9PT0gbnVsbCkge1xyXG4gICAgcmV0dXJuIDw+NDA0PC8+O1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDw+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicG9zdC1jb250YWluZXJcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByZWZhY2VcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj57ZGF0YS50aXRsZX08L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicG9zdC1pdGVtc1wiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hbWVcIj5kbzRuZzwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvcmRlclwiPiBcdTIwMjIgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGF0ZVwiPntkYXRhLmRhdGV9PC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFnc1wiPlxyXG4gICAgICAgICAgICB7ZGF0YS50YWdzPy5tYXAoKHRhZykgPT4gKFxyXG4gICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC9qc3gta2V5XHJcbiAgICAgICAgICAgICAgPGEgaHJlZj17YC90YWcvJHt0YWd9YH0ga2V5PXt0YWd9IGNsYXNzTmFtZT1cInBvc3R0YWdcIj5cclxuICAgICAgICAgICAgICAgICN7dGFnfVxyXG4gICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBvc3QtbGF5ZXJcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicG9zdFwiPlxyXG4gICAgICAgICAgICA8aW1nIHNyYz17ZGF0YS5pbWFnZX0gYWx0PVwiXCI+PC9pbWc+XHJcbiAgICAgICAgICAgIDxwXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW1nLWZyb21cIlxyXG4gICAgICAgICAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogZGF0YS5pbWdfZnJvbSB8fCAnJyB9fVxyXG4gICAgICAgICAgICA+PC9wPlxyXG5cclxuICAgICAgICAgICAgPG1haW4+XHJcbiAgICAgICAgICAgICAgPENvbnRlbnQgY29udGVudD17Y29tcGlsZWR9PjwvQ29udGVudD5cclxuICAgICAgICAgICAgPC9tYWluPlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvdGhlci1wb3N0c1wiPlxyXG4gICAgICAgICAgICAgIDxoND4je2RhdGEudGFnc1swXX1cdUM3NTggXHVCMkU0XHVCOTc4IFx1QUUwMDwvaDQ+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvdGhlci1wb3N0cy1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgIHthbm90aGVyUG9zdHMubWFwKChwb3N0KSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvdGhlci1wb3N0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8TGlua1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChwb3N0IGFzIGFueSkub3JpZ2luLnRvTG93ZXJDYXNlKCkgPT09XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKHNsdWcgYXMgc3RyaW5nKS50b0xvd2VyQ2FzZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdhY3RpdmUnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IG51bGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBocmVmPXtgL3Bvc3QvJHsocG9zdCBhcyBhbnkpLm9yaWdpbn1gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVmZXRjaD17ZmFsc2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtwb3N0LnRpdGxlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9MaW5rPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb290ZXJcIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImVkaXRcIj5cclxuICAgICAgICAgICAgICAgIDxhXHJcbiAgICAgICAgICAgICAgICAgIGhyZWY9e2BodHRwczovL2dpdGh1Yi5jb20vZG80bmcvZG80bmcuZ2l0aHViLmlvL2VkaXQvbWFpbi9wb3N0cy8ke2RhdGEucmF3fWB9XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cInJpLWVkaXQtMi1saW5lXCI+PC9pPiBFZGl0IG9uIEdpdGh1YlxyXG4gICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmFja1wiPlxyXG4gICAgICAgICAgICAgICAgPExpbmsgaHJlZj1cIi9cIj5CYWNrIHRvIGJsb2c8L0xpbms+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC8+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBvc3Q7XHJcbiIsICJ7XHJcbiAgXCJTU0ctXHVENTA0XHVCODA4XHVDNzg0XHVDNkNDXHVEMDZDLVx1QjlDQ1x1QjRFNFx1QUUzMFwiOiB7XHJcbiAgICBcIm5hbWVcIjogXCIyMDI1LTAzLTIzXCIsXHJcbiAgICBcInRpdGxlXCI6IFwiU1NHIFx1RDUwNFx1QjgwOFx1Qzc4NFx1QzZDQ1x1RDA2QyBcdUI5Q0NcdUI0RTRcdUFFMzBcIixcclxuICAgIFwiZGF0ZVwiOiBcIjIwMjUtMDgtMjJcIixcclxuICAgIFwidGFnc1wiOiBbXCJqYXZhc2NyaXB0XCIsIFwiZGV2XCIsIFwic3NnXCJdLFxyXG4gICAgXCJpbWFnZVwiOiBcIi9hc3NldHMvc3NnLmdpZlwiLFxyXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlx1Qzc3Q1x1QzlDMCAjMVwiXHJcbiAgfSxcclxuICBcIlx1QkM4OFx1QjRFNFx1QjdFQ1x1Qjk3Qy1cdUI5Q0NcdUI0RTRcdUM1QzhcdUIyRTRcIjoge1xyXG4gICAgXCJuYW1lXCI6IFwiMjAyNS0wMS0xOVwiLFxyXG4gICAgXCJ0aXRsZVwiOiBcIlx1QkM4OFx1QjRFNFx1QjdFQ1x1Qjk3QyBcdUI5Q0NcdUI0RTRcdUM1QzhcdUIyRTRcIixcclxuICAgIFwiZGF0ZVwiOiBcIjIwMjUtMDEtMTlcIixcclxuICAgIFwidGFnc1wiOiBbXCJqYXZhc2NyaXB0XCIsIFwiYnVuZGxlclwiLCBcImRldlwiLCBcInNlcnBhY2tcIl0sXHJcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwic3djXHVBRTMwXHVCQzE4IFx1QkM4OFx1QjRFNFx1QjdFQ1x1Qjk3QyBcdUI5Q0NcdUI0RTRcdUM1QzhcdUIyRTRcIixcclxuICAgIFwiaW1hZ2VcIjogXCIvaW1nLzIwMjUtMDEtMTkucG5nXCJcclxuICB9LFxyXG4gIFwiXHVCQzg4XHVCNEU0XHVCNDFDLVx1RDMwQ1x1Qzc3Q1x1QzVEMFx1QzExQy1cdUM2MjRcdUI5NTgtXHVDRDk0XHVDODAxXHVENTU4XHVBRTMwXCI6IHtcclxuICAgIFwibmFtZVwiOiBcIjIwMjQtMDctMjRcIixcclxuICAgIFwidGl0bGVcIjogXCJcdUJDODhcdUI0RTRcdUI0MUMgXHVEMzBDXHVDNzdDXHVDNUQwXHVDMTFDIFx1QzYyNFx1Qjk1OCBcdUNEOTRcdUM4MDFcdUQ1NThcdUFFMzBcIixcclxuICAgIFwiZGF0ZVwiOiBcIjIwMjQtMDctMjRcIixcclxuICAgIFwidGFnc1wiOiBbXCJqYXZhc2NyaXB0XCIsIFwidGVzdGluZ1wiLCBcImRldlwiXSxcclxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJcIixcclxuICAgIFwiaW1hZ2VcIjogXCIvaW1nLzIwMjQtMDctMjQucG5nXCIsXHJcbiAgICBcImltZ19mcm9tXCI6IFwiYmcgZnJvbSA8YSBocmVmPVxcXCJodHRwczovL3Vuc3BsYXNoLmNvbS9cXFwiPlVuc3BsYXNoPC9hPlx1QzVEMCBcdUM3ODhcdUIyOTQgPGEgaHJlZj1cXFwiaHR0cHM6Ly91bnNwbGFzaC5jb20va28vQGJvbGl2aWFpbnRlbGlnZW50ZVxcXCI+QEJvbGl2aWFJbnRlbGlnZW50ZTwvYT5cdUM3NTggXHVDMEFDXHVDOUM0XCJcclxuICB9LFxyXG4gIFwiXHVDMEM4XHVCODVDXHVDNkI0LVx1QkIzOFx1QzExQ1wiOiB7XHJcbiAgICBcIm5hbWVcIjogXCIyMDIzLTExLTIzXCIsXHJcbiAgICBcInRpdGxlXCI6IFwiXHVDMEM4XHVCODVDXHVDNkI0IFx1QkIzOFx1QzExQ1wiLFxyXG4gICAgXCJkYXRlXCI6IFwiMjAyMy0xMS0yM1wiLFxyXG4gICAgXCJ0YWdzXCI6IFtcInVpXCIsIFwibmV4dFwiXSxcclxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJ2aXRlcHJlc3NcdUM1RDBcdUMxMUMgXHVEMEM4XHVDRDlDXHVENTU4XHVBQ0UwIFx1QzlDMVx1QzgxMSBcdUJCMzhcdUMxMUMgXHVCOUNDXHVCNEU0XHVBRTMwXCIsXHJcbiAgICBcImltYWdlXCI6IFwiL2Fzc2V0cy8yMDIzLTExLTIzLnBuZ1wiXHJcbiAgfSxcclxuICBcIlR5cGVzY3JpcHRcdUM1RDBcdUMxMUMtSmF2YXNjcmlwdFx1Qjg1Qy1cdUM3NzRcdUM4RkNcdUQ1NThcdUFFMzBcIjoge1xyXG4gICAgXCJuYW1lXCI6IFwiMjAyMy0xMC0wN1wiLFxyXG4gICAgXCJ0aXRsZVwiOiBcIlR5cGVzY3JpcHRcdUM1RDBcdUMxMUMgSmF2YXNjcmlwdFx1Qjg1QyBcdUM3NzRcdUM4RkNcdUQ1NThcdUFFMzBcIixcclxuICAgIFwiZGF0ZVwiOiBcIjIwMjMtMTAtMDdcIixcclxuICAgIFwidGFnc1wiOiBbXCJ0eXBlc2NyaXB0XCIsIFwiamF2YXNjcmlwdFwiXSxcclxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJcdUQ2MDRcdUM3QUMgVHlwZXNjcmlwdFx1Qzc1OCBcdUJCMzhcdUM4MUNcdUM4MTBcIixcclxuICAgIFwiaW1hZ2VcIjogXCIvaW1nLzIwMjMtMTAtMDcucG5nXCJcclxuICB9LFxyXG4gIFwiXHVCMDk4XHVCOUNDXHVDNzU4LVx1RDUwNFx1Qjg2MFx1RDJCOFx1QzVENFx1QjREQy1cdUI3N0NcdUM3NzRcdUJFMENcdUI3RUNcdUI5QUMtXHVCOUNDXHVCNEU0XHVBRTMwLSgyKVwiOiB7XHJcbiAgICBcIm5hbWVcIjogXCIyMDIzLTA5LTMwXCIsXHJcbiAgICBcInRpdGxlXCI6IFwiXHVCMDk4XHVCOUNDXHVDNzU4IFx1RDUwNFx1Qjg2MFx1RDJCOFx1QzVENFx1QjREQyBcdUI3N0NcdUM3NzRcdUJFMENcdUI3RUNcdUI5QUMgXHVCOUNDXHVCNEU0XHVBRTMwICgyKVwiLFxyXG4gICAgXCJkYXRlXCI6IFwiMjAyMy0wOS0zMFwiLFxyXG4gICAgXCJ0YWdzXCI6IFtcImRldlwiLCBcImZyb250ZW5kXCIsIFwiamF2YXNjcmlwdFwiXSxcclxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJcdUJDRjVcdUJEOTlcdUM2NDRcdUI4Q0NcIixcclxuICAgIFwiaW1hZ2VcIjogXCIvaW1nLzIwMjMtMDktMjkucG5nXCJcclxuICB9LFxyXG4gIFwiXHVCMDk4XHVCOUNDXHVDNzU4LVx1RDUwNFx1Qjg2MFx1RDJCOFx1QzVENFx1QjREQy1cdUI3N0NcdUM3NzRcdUJFMENcdUI3RUNcdUI5QUMtXHVCOUNDXHVCNEU0XHVBRTMwLSgxKVwiOiB7XHJcbiAgICBcIm5hbWVcIjogXCIyMDIzLTA5LTI5XCIsXHJcbiAgICBcInRpdGxlXCI6IFwiXHVCMDk4XHVCOUNDXHVDNzU4IFx1RDUwNFx1Qjg2MFx1RDJCOFx1QzVENFx1QjREQyBcdUI3N0NcdUM3NzRcdUJFMENcdUI3RUNcdUI5QUMgXHVCOUNDXHVCNEU0XHVBRTMwICgxKVwiLFxyXG4gICAgXCJkYXRlXCI6IFwiMjAyMy0wOS0yOVwiLFxyXG4gICAgXCJ0YWdzXCI6IFtcImRldlwiLCBcImZyb250ZW5kXCIsIFwiamF2YXNjcmlwdFwiXSxcclxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJcdUM5RURcdUM1RDFcdUQyQjhcIixcclxuICAgIFwiaW1hZ2VcIjogXCIvaW1nLzIwMjMtMDktMjkucG5nXCJcclxuICB9LFxyXG4gIFwibnBtLVx1RDMyOFx1RDBBNFx1QzlDMFwiOiB7XHJcbiAgICBcIm5hbWVcIjogXCIyMDIzLTA5LTI4XCIsXHJcbiAgICBcInRpdGxlXCI6IFwibnBtIFx1RDMyOFx1RDBBNFx1QzlDMFwiLFxyXG4gICAgXCJkYXRlXCI6IFwiMjAyMy0wOS0yOFwiLFxyXG4gICAgXCJ0YWdzXCI6IFtcImRldlwiLCBcIm5wbVwiLCBcInplbHlcIiwgXCJhc3RvXCJdLFxyXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlx1QjlDQ1x1QjRFMCBucG0gXHVEMzI4XHVEMEE0XHVDOUMwXHVCNEU0XCIsXHJcbiAgICBcImltYWdlXCI6IFwiL2ltZy8yMDIzLTA5LTI4LnBuZ1wiXHJcbiAgfSxcclxuICBcIlx1QkUxNFx1Qjg1Q1x1QURGOC1cdUM1QzVcdUIzNzBcdUM3NzRcdUQyQjhcIjoge1xyXG4gICAgXCJuYW1lXCI6IFwiMjAyMy0wOS0yN1wiLFxyXG4gICAgXCJ0aXRsZVwiOiBcIlx1QkUxNFx1Qjg1Q1x1QURGOCBcdUM1QzVcdUIzNzBcdUM3NzRcdUQyQjhcIixcclxuICAgIFwiZGF0ZVwiOiBcIjIwMjMtMDktMjdcIixcclxuICAgIFwidGFnc1wiOiBbXCJibG9nXCJdLFxyXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlx1QkNDNFx1Qjg1QyBcdUJDMTRcdUIwMTBcdUFDNzQgXHVDNUM2XHVCMkU0XCIsXHJcbiAgICBcImltYWdlXCI6IFwiL2ltZy8yMDIzLTA5LTI3LnBuZ1wiXHJcbiAgfSxcclxuICBcInJlYWN0XHVDNUQwLXNzci1cdUM4MDFcdUM2QTlcdUQ1NThcdUFFMzBcIjoge1xyXG4gICAgXCJuYW1lXCI6IFwiMjAyMy0wMi0wOVwiLFxyXG4gICAgXCJ0aXRsZVwiOiBcIlJlYWN0XHVDNUQwIFNTUiBcdUM4MDFcdUM2QTlcdUQ1NThcdUFFMzBcIixcclxuICAgIFwiZGF0ZVwiOiBcIjIwMjMtMDItMDlcIixcclxuICAgIFwidGFnc1wiOiBbXCJmcm9udGVuZFwiLCBcImRldlwiLCBcInJlYWN0XCJdLFxyXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIm5leHQgXHVCNTMwXHVCNzdDXHVENTU4XHVBRTMwXCIsXHJcbiAgICBcImltYWdlXCI6IFwiL2ltZy8yMDIzLTAyLTA5LnBuZ1wiXHJcbiAgfVxyXG59XHJcbiIsICJpbXBvcnQgeyBydW5TeW5jIH0gZnJvbSAnQG1keC1qcy9tZHgnO1xyXG5pbXBvcnQgKiBhcyBydW50aW1lIGZyb20gJ3JlYWN0L2pzeC1ydW50aW1lJztcclxuaW1wb3J0IHsgTURYQ29udGVudCB9IGZyb20gJ21keC90eXBlcyc7XHJcblxyXG5leHBvcnQgY29uc3QgcnVuTWR4ID0gKGNvZGU6IGFueSk6IFByb21pc2U8TURYQ29udGVudD4gPT4ge1xyXG4gIGNvbnN0IG1keCA9IHJ1blN5bmMoY29kZSwgcnVudGltZSk7XHJcbiAgY29uc3QgeyBkZWZhdWx0OiBDb250ZW50IH0gPSBtZHg7XHJcbiAgcmV0dXJuIENvbnRlbnQ7XHJcbn07XHJcbiIsICJpbXBvcnQgeyBjb21wb25lbnRzIH0gZnJvbSAnLi4vcGFnZXMvcG9zdC9bc2x1Z10nO1xyXG5pbXBvcnQgeyBydW5NZHggfSBmcm9tICcuL3J1bic7XHJcblxyXG5pbnRlcmZhY2UgUHJvcHMge1xyXG4gIGNvbnRlbnQ6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IENvbnRlbnQgPSAocHJvcHM6IFByb3BzKTogSlNYLkVsZW1lbnQgPT4ge1xyXG4gIGNvbnN0IGNvbnRlbnQgPSBwcm9wcy5jb250ZW50O1xyXG4gIGNvbnN0IE1EWDogYW55ID0gcnVuTWR4KGNvbnRlbnQpO1xyXG4gIHJldHVybiA8TURYIGNvbXBvbmVudHM9e2NvbXBvbmVudHN9IC8+O1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgY29tcGlsZSwgQ29tcGlsZU9wdGlvbnMgfSBmcm9tICdAbWR4LWpzL21keCc7XHJcbmltcG9ydCByZW1hcmtHZm0gZnJvbSAncmVtYXJrLWdmbSc7XHJcbmltcG9ydCByZWh5cGVQcmV0dHlDb2RlIGZyb20gJ3JlaHlwZS1wcmV0dHktY29kZSc7XHJcbmltcG9ydCByYXcgZnJvbSAncmVoeXBlLXJhdyc7XHJcblxyXG5pbXBvcnQgeyBwbHVnaW4gfSBmcm9tICcuLi9wbHVnaW5zL2FuY2hvcic7XHJcblxyXG5jb25zdCB0b3VjaGVkID0geyBjdXJyZW50OiBmYWxzZSB9O1xyXG5cclxuLy8gaHR0cHM6Ly9naXRodWIuY29tL21lbW9zLXB1Yi9tZW1vcy5wdWIvYmxvYi9kZDQ5MzNlNTExZmQ2MDVhYzRhYWFkMzhlNGVhMDNlZjE1MTc5NGJhL2xpYi9tZHgvcGx1Z2lucy9jb2RlLnRzXHJcblxyXG5leHBvcnQgY29uc3QgY29tcGlsZU1keCA9IGFzeW5jIChjb250ZW50OiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4gPT4ge1xyXG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykgdGhyb3cgRXJyb3IoJ2NvbXBpbGVNZHggc2hvdWxkIHJ1biBvbiBzZXJ2ZXIgb25seScpO1xyXG5cclxuICBjb25zdCBvcHRpb25zOiBDb21waWxlT3B0aW9ucyA9IHtcclxuICAgIGZvcm1hdDogJ21kJyxcclxuICAgIG91dHB1dEZvcm1hdDogJ2Z1bmN0aW9uLWJvZHknLFxyXG4gICAgcmVtYXJrUGx1Z2luczogW3JlbWFya0dmbSwgcGx1Z2luXSxcclxuICAgIGRldmVsb3BtZW50OiBmYWxzZSxcclxuICAgIHJlaHlwZVBsdWdpbnM6IFtcclxuICAgICAgW1xyXG4gICAgICAgIHJlaHlwZVByZXR0eUNvZGUsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAga2VlcEJhY2tncm91bmQ6IGZhbHNlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICAgIHJhdyxcclxuICAgIF0sXHJcbiAgfTtcclxuXHJcbiAgY29uc3QgY29kZSA9IGF3YWl0IGNvbXBpbGUoY29udGVudCwgb3B0aW9ucyk7XHJcblxyXG4gIGNvbnN0IHRleHQgPSBTdHJpbmcoY29kZSk7XHJcblxyXG4gIHJldHVybiB0ZXh0O1xyXG59O1xyXG4iLCAiaW1wb3J0IHZpc2l0IGZyb20gJ3VuaXN0LXV0aWwtdmlzaXQnO1xyXG5pbXBvcnQgdHlwZSAqIGFzIG1kYXN0IGZyb20gJ21kYXN0JztcclxuaW1wb3J0IHR5cGUgKiBhcyB1bmlmaWVkIGZyb20gJ3VuaWZpZWQnO1xyXG5pbXBvcnQgdG9TdHJpbmcgZnJvbSAnbWRhc3QtdXRpbC10by1zdHJpbmcnO1xyXG5cclxuZXhwb3J0IGNvbnN0IHBsdWdpbjogdW5pZmllZC5QbHVnaW48W10sIG1kYXN0LlJvb3Q+ID0gKCkgPT4ge1xyXG4gIHJldHVybiAodHJlZSwgZmlsZSkgPT4ge1xyXG4gICAgdmlzaXQodHJlZSwgJ2hlYWRpbmcnLCAobm9kZSwgaW5kZXgsIHBhcmVudCkgPT4ge1xyXG4gICAgICBjb25zdCBodG1sID0gdG9TdHJpbmcobm9kZSk7XHJcblxyXG4gICAgICAobm9kZSBhcyBhbnkpLnR5cGUgPSAnaHRtbCc7XHJcbiAgICAgIChub2RlIGFzIGFueSkuY2hpbGRyZW4gPSB1bmRlZmluZWQ7XHJcbiAgICAgIChub2RlIGFzIGFueSkudmFsdWUgPSBgPGgke1xyXG4gICAgICAgIChub2RlIGFzIGFueSkuZGVwdGhcclxuICAgICAgfSBpZD1cIiR7aHRtbH1cIj48YSBocmVmPVwiIyR7aHRtbH1cIj4jPC9hPiR7aHRtbH08L2gkeyhub2RlIGFzIGFueSkuZGVwdGh9PmA7XHJcbiAgICB9KTtcclxuICB9O1xyXG59O1xyXG4iLCAiLyogZXNsaW50LWRpc2FibGUgQG5leHQvbmV4dC9uby1pbWctZWxlbWVudCAqL1xyXG5pbXBvcnQgeyBMaW5rLCBJbWFnZSB9IGZyb20gJ2V4dGEvY29tcG9uZW50cyc7XHJcbmltcG9ydCB7IGNsZWFuVGl0bGUsIFBvc3RUeXBlIH0gZnJvbSAnLi4vcGFnZXMvcG9zdC9bc2x1Z10nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUG9zdENhcmQocHJvcHM6IHsgZGF0YTogUG9zdFR5cGUgfSkge1xyXG4gIGlmICghcHJvcHMpIHJldHVybiA8PjwvPjtcclxuICByZXR1cm4gKFxyXG4gICAgPD5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJwb3N0LWNhcmRcIiBrZXk9e3Byb3BzLmRhdGEuZGF0ZX0+XHJcbiAgICAgICAgPExpbmtcclxuICAgICAgICAgIGhyZWY9e2AvcG9zdC8ke2NsZWFuVGl0bGUocHJvcHMuZGF0YS50aXRsZSl9YH1cclxuICAgICAgICAgIGNsYXNzTmFtZT1cIm5vLWFcIlxyXG4gICAgICAgICAgcHJlZmV0Y2g9e2ZhbHNlfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicG9zdC1idXR0b25cIj5cclxuICAgICAgICAgICAge3Byb3BzLmRhdGEuaW1hZ2UgPyAoXHJcbiAgICAgICAgICAgICAgPEltYWdlIHNyYz17cHJvcHMuZGF0YS5pbWFnZX0gYWx0PVwiaW1nXCI+PC9JbWFnZT5cclxuICAgICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgICA8ZGl2PjwvZGl2PlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBvc3QtYnV0dG9uLWRldGFpbFwiPlxyXG4gICAgICAgICAgICAgIDxoMz57cHJvcHMuZGF0YS50aXRsZX08L2gzPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicG9zdC1kZXRhaWxcIj57cHJvcHMuZGF0YS5kZXNjcmlwdGlvbn08L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicG9zdC1idXR0b24tdGFnc1wiPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFnc1wiPlxyXG4gICAgICAgICAgICAgICAge3Byb3BzLmRhdGEudGFncz8ubWFwKCh0YWcpID0+IChcclxuICAgICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0L2pzeC1rZXlcclxuICAgICAgICAgICAgICAgICAgPExpbmsgaHJlZj17YC90YWcvJHt0YWd9YH0gcHJlZmV0Y2g9e2ZhbHNlfSBrZXk9e3RhZ30+XHJcbiAgICAgICAgICAgICAgICAgICAgPGE+I3t0YWd9PC9hPlxyXG4gICAgICAgICAgICAgICAgICA8L0xpbms+XHJcbiAgICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L0xpbms+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC8+XHJcbiAgKTtcclxufVxyXG4iLCAiaW1wb3J0IHsgTGluayB9IGZyb20gJ2V4dGEvY29tcG9uZW50cyc7XHJcbmltcG9ydCBwb3N0cyBmcm9tICcuL3Bvc3QvcG9zdHMuanNvbic7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlQXJyYXlEdXAoYXJyOiBhbnlbXSkge1xyXG4gIGxldCByZXN1bHQgPSBbXTtcclxuICBjb25zdCBjb3VudHMgPSB7fTtcclxuICBhcnIuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xyXG4gICAgaWYgKCFyZXN1bHQuaW5jbHVkZXMoZWxlbWVudCkpIHtcclxuICAgICAgcmVzdWx0LnB1c2goZWxlbWVudCk7XHJcbiAgICAgIGNvdW50c1tlbGVtZW50XSA9IDE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb3VudHNbZWxlbWVudF0gKz0gMTtcclxuICAgIH1cclxuICB9KTtcclxuICByZXR1cm4geyByZXN1bHQsIGNvdW50cyB9O1xyXG59XHJcblxyXG5jb25zdCBIb21lID0gKCkgPT4ge1xyXG4gIGxldCByYXcgPSBbXTtcclxuXHJcbiAgT2JqZWN0LmtleXMocG9zdHMpLmZvckVhY2goKHBvc3QpID0+IHtcclxuICAgIHJhdyA9IFsuLi5yYXcsIC4uLihwb3N0c1twb3N0XS50YWdzIHx8IFtdKV07XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHsgcmVzdWx0LCBjb3VudHMgfSA9IHJlbW92ZUFycmF5RHVwKHJhdyk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInRhZy1saXN0XCI+XHJcbiAgICAgIDxoMj5cclxuICAgICAgICA8aSBjbGFzc05hbWU9XCJyaS1oYXNodGFnXCI+PC9pPlxyXG4gICAgICA8L2gyPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhZy1pdGVtc1wiPlxyXG4gICAgICAgIHtyZXN1bHQubWFwKCh0YWcpID0+IChcclxuICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFnLWl0ZW1cIj5cclxuICAgICAgICAgICAgICA8TGluayBocmVmPXtgL3RhZy8ke3RhZ31gfSBsZWdhY3lCZWhhdmlvcj5cclxuICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cInRhZy1hIHBvc3R0YWdcIj5cclxuICAgICAgICAgICAgICAgICAgI3t0YWd9XHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRhZy1jb3VudFwiPih7Y291bnRzW3RhZ119KTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICA8L0xpbms+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC8+XHJcbiAgICAgICAgKSl9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEhvbWU7XHJcbiIsICJpbXBvcnQgUG9zdENhcmQgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9wb3N0LWNhcmQnO1xyXG5pbXBvcnQgcmF3UG9zdHMgZnJvbSAnLi4vcG9zdC9wb3N0cy5qc29uJztcclxuaW1wb3J0IHsgcmVtb3ZlQXJyYXlEdXAgfSBmcm9tICcuLi90YWdzJztcclxuaW1wb3J0IHBvc3RzIGZyb20gJy4uL3Bvc3QvcG9zdHMuanNvbic7XHJcblxyXG5leHBvcnQgY29uc3QgTG9hZFRhZ3MgPSAoc2x1Zzogc3RyaW5nIHwgc3RyaW5nW10pID0+IHtcclxuICBjb25zdCBwb3N0cyA9IE9iamVjdC5rZXlzKHJhd1Bvc3RzKS5maWx0ZXIoKHBvc3QpID0+XHJcbiAgICByYXdQb3N0c1twb3N0XS50YWdzPy5pbmNsdWRlcyhzbHVnIGFzIHN0cmluZylcclxuICApO1xyXG5cclxuICByZXR1cm4gcG9zdHM7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RhdGljUGFyYW1zKCkge1xyXG4gIGxldCByYXcgPSBbXTtcclxuXHJcbiAgT2JqZWN0LmtleXMocG9zdHMpLmZvckVhY2goKHBvc3QpID0+IHtcclxuICAgIHJhdyA9IFsuLi5yYXcsIC4uLihwb3N0c1twb3N0XS50YWdzIHx8IFtdKV07XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHsgcmVzdWx0IH0gPSByZW1vdmVBcnJheUR1cChyYXcpO1xyXG5cclxuICByZXR1cm4gcmVzdWx0Lm1hcCgocikgPT4gKHsgc2x1ZzogciB9KSk7XHJcbn1cclxuXHJcbmNvbnN0IEhvbWUgPSAoeyBwYXJhbXM6IHsgc2x1ZyB9IH0pID0+IHtcclxuICBjb25zdCBwb3N0cyA9IExvYWRUYWdzKHNsdWcpO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPD5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJwb3N0c1wiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGlyZWN0b3J5XCI+XHJcbiAgICAgICAgICAjPHN0cm9uZyBzdHlsZT17eyB0ZXh0VHJhbnNmb3JtOiAnY2FwaXRhbGl6ZScgfX0+e3NsdWcgYXMgc3RyaW5nfTwvc3Ryb25nPlxyXG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6ICcjNWE3ZmU0JywgcGFkZGluZ0xlZnQ6ICc1cHgnIH19PlxyXG4gICAgICAgICAgICAoe3Bvc3RzLmxlbmd0aH1cdUFDMUNcdUM3NTggXHVBRTAwKVxyXG4gICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicG9zdC1saXN0XCI+XHJcbiAgICAgICAgICB7cG9zdHMubWFwKChwb3N0KSA9PiAoXHJcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC9qc3gta2V5XHJcbiAgICAgICAgICAgIDxQb3N0Q2FyZCBkYXRhPXtyYXdQb3N0c1twb3N0XX0ga2V5PXtwb3N0fT48L1Bvc3RDYXJkPlxyXG4gICAgICAgICAgKSl9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC8+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEhvbWU7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFFQSxTQUFTLFFBQUFBLGFBQVk7QUFFckIsU0FBUyxRQUFRLGdCQUFnQjs7O0FDSmpDO0FBQUEsRUFDRSx5REFBaUI7QUFBQSxJQUNmLE1BQVE7QUFBQSxJQUNSLE9BQVM7QUFBQSxJQUNULE1BQVE7QUFBQSxJQUNSLE1BQVEsQ0FBQyxjQUFjLE9BQU8sS0FBSztBQUFBLElBQ25DLE9BQVM7QUFBQSxJQUNULGFBQWU7QUFBQSxFQUNqQjtBQUFBLEVBQ0EscURBQWE7QUFBQSxJQUNYLE1BQVE7QUFBQSxJQUNSLE9BQVM7QUFBQSxJQUNULE1BQVE7QUFBQSxJQUNSLE1BQVEsQ0FBQyxjQUFjLFdBQVcsT0FBTyxTQUFTO0FBQUEsSUFDbEQsYUFBZTtBQUFBLElBQ2YsT0FBUztBQUFBLEVBQ1g7QUFBQSxFQUNBLHFGQUFvQjtBQUFBLElBQ2xCLE1BQVE7QUFBQSxJQUNSLE9BQVM7QUFBQSxJQUNULE1BQVE7QUFBQSxJQUNSLE1BQVEsQ0FBQyxjQUFjLFdBQVcsS0FBSztBQUFBLElBQ3ZDLGFBQWU7QUFBQSxJQUNmLE9BQVM7QUFBQSxJQUNULFVBQVk7QUFBQSxFQUNkO0FBQUEsRUFDQSxtQ0FBVTtBQUFBLElBQ1IsTUFBUTtBQUFBLElBQ1IsT0FBUztBQUFBLElBQ1QsTUFBUTtBQUFBLElBQ1IsTUFBUSxDQUFDLE1BQU0sTUFBTTtBQUFBLElBQ3JCLGFBQWU7QUFBQSxJQUNmLE9BQVM7QUFBQSxFQUNYO0FBQUEsRUFDQSxvRUFBaUM7QUFBQSxJQUMvQixNQUFRO0FBQUEsSUFDUixPQUFTO0FBQUEsSUFDVCxNQUFRO0FBQUEsSUFDUixNQUFRLENBQUMsY0FBYyxZQUFZO0FBQUEsSUFDbkMsYUFBZTtBQUFBLElBQ2YsT0FBUztBQUFBLEVBQ1g7QUFBQSxFQUNBLDJHQUEyQjtBQUFBLElBQ3pCLE1BQVE7QUFBQSxJQUNSLE9BQVM7QUFBQSxJQUNULE1BQVE7QUFBQSxJQUNSLE1BQVEsQ0FBQyxPQUFPLFlBQVksWUFBWTtBQUFBLElBQ3hDLGFBQWU7QUFBQSxJQUNmLE9BQVM7QUFBQSxFQUNYO0FBQUEsRUFDQSwyR0FBMkI7QUFBQSxJQUN6QixNQUFRO0FBQUEsSUFDUixPQUFTO0FBQUEsSUFDVCxNQUFRO0FBQUEsSUFDUixNQUFRLENBQUMsT0FBTyxZQUFZLFlBQVk7QUFBQSxJQUN4QyxhQUFlO0FBQUEsSUFDZixPQUFTO0FBQUEsRUFDWDtBQUFBLEVBQ0EsMEJBQVc7QUFBQSxJQUNULE1BQVE7QUFBQSxJQUNSLE9BQVM7QUFBQSxJQUNULE1BQVE7QUFBQSxJQUNSLE1BQVEsQ0FBQyxPQUFPLE9BQU8sUUFBUSxNQUFNO0FBQUEsSUFDckMsYUFBZTtBQUFBLElBQ2YsT0FBUztBQUFBLEVBQ1g7QUFBQSxFQUNBLCtDQUFZO0FBQUEsSUFDVixNQUFRO0FBQUEsSUFDUixPQUFTO0FBQUEsSUFDVCxNQUFRO0FBQUEsSUFDUixNQUFRLENBQUMsTUFBTTtBQUFBLElBQ2YsYUFBZTtBQUFBLElBQ2YsT0FBUztBQUFBLEVBQ1g7QUFBQSxFQUNBLDRDQUFtQjtBQUFBLElBQ2pCLE1BQVE7QUFBQSxJQUNSLE9BQVM7QUFBQSxJQUNULE1BQVE7QUFBQSxJQUNSLE1BQVEsQ0FBQyxZQUFZLE9BQU8sT0FBTztBQUFBLElBQ25DLGFBQWU7QUFBQSxJQUNmLE9BQVM7QUFBQSxFQUNYO0FBQ0Y7OztBQ2xGQSxTQUFTLGVBQWU7QUFDeEIsWUFBWSxhQUFhO0FBR2xCLElBQU0sU0FBUyxDQUFDLFNBQW1DO0FBQ3hELFFBQU0sTUFBTSxRQUFRLE1BQU0sT0FBTztBQUNqQyxRQUFNLEVBQUUsU0FBU0MsU0FBUSxJQUFJO0FBQzdCLFNBQU9BO0FBQ1Q7OztBQ0VTO0FBSEYsSUFBTSxVQUFVLENBQUMsVUFBOEI7QUFDcEQsUUFBTSxVQUFVLE1BQU07QUFDdEIsUUFBTSxNQUFXLE9BQU8sT0FBTztBQUMvQixTQUFPLElBQUMsT0FBSSxZQUF3QjtBQUN0Qzs7O0FDWEEsU0FBUyxlQUErQjtBQUN4QyxPQUFPLGVBQWU7QUFDdEIsT0FBTyxzQkFBc0I7QUFDN0IsT0FBTyxTQUFTOzs7QUNIaEIsT0FBTyxXQUFXO0FBR2xCLE9BQU8sY0FBYzs7O0FDRnJCLFNBQVMsTUFBTSxhQUFhO0FBSVAsMEJBQUFDLE1BZVQsWUFmUzs7O0FDTHJCLFNBQVMsUUFBQUMsYUFBWTtBQTZCYixTQUlFLFlBQUFDLFdBSkYsT0FBQUMsTUFTVSxRQUFBQyxhQVRWOzs7QUNBSixxQkFBQUMsV0FHTyxPQUFBQyxNQUNELFFBQUFDLGFBSk47QUF4QkcsSUFBTSxXQUFXLENBQUMsU0FBNEI7QUFDbkQsUUFBTSxRQUFRLE9BQU8sS0FBSyxhQUFRLEVBQUU7QUFBQSxJQUFPLENBQUMsU0FDMUMsY0FBUyxJQUFJLEVBQUUsTUFBTSxTQUFTLElBQWM7QUFBQSxFQUM5QztBQUVBLFNBQU87QUFDVDs7O0FSbUNXLFNBOEZMLFlBQUFDLFdBOUZLLE9BQUFDLE1BMEJHLFFBQUFDLGFBMUJIO0FBMUJYLElBQU0sYUFBYTtBQUFBLEVBQ2pCLElBQUk7QUFBQSxFQUNKLElBQUk7QUFBQSxFQUNKLEtBQUs7QUFBQSxFQUNMLEtBQUs7QUFBQSxFQUNMLE1BQU07QUFBQSxFQUNOLEtBQUs7QUFBQSxFQUNMLEtBQUs7QUFBQSxFQUNMLE1BQU07QUFBQSxFQUNOLElBQUk7QUFDTjtBQUNBLElBQU0sUUFBUTtBQUFBLEVBQ1osSUFBSTtBQUFBLEVBQ0osSUFBSTtBQUFBLEVBQ0osS0FBSztBQUFBLEVBQ0wsS0FBSztBQUFBLEVBQ0wsTUFBTTtBQUFBLEVBQ04sS0FBSztBQUFBLEVBQ0wsS0FBSztBQUFBLEVBQ0wsTUFBTTtBQUFBLEVBQ04sSUFBSTtBQUFBLEVBQ0osSUFBSTtBQUNOO0FBRU8sSUFBTSxhQUFhO0FBQUEsRUFDeEIsSUFBSSxDQUFDLFVBQWU7QUFDbEIsV0FBT0MsS0FBQyxRQUFJLEdBQUcsT0FBTztBQUFBLEVBQ3hCO0FBQUEsRUFDQSxJQUFJLENBQUMsVUFBZTtBQUNsQixXQUFPQSxLQUFDLFFBQUksR0FBRyxPQUFPO0FBQUEsRUFDeEI7QUFBQSxFQUNBLElBQUksQ0FBQyxVQUFlO0FBQ2xCLFdBQU9BLEtBQUMsUUFBSSxHQUFHLE9BQU87QUFBQSxFQUN4QjtBQUFBLEVBQ0EsSUFBSSxDQUFDLFVBQWU7QUFDbEIsV0FBT0EsS0FBQyxRQUFJLEdBQUcsT0FBTztBQUFBLEVBQ3hCO0FBQUEsRUFDQSxJQUFJLENBQUMsVUFBZTtBQUNsQixXQUFPQSxLQUFDLFFBQUksR0FBRyxPQUFPO0FBQUEsRUFDeEI7QUFBQSxFQUNBLElBQUksQ0FBQyxVQUFlO0FBQ2xCLFdBQU9BLEtBQUMsUUFBSSxHQUFHLE9BQU87QUFBQSxFQUN4QjtBQUFBLEVBQ0EsUUFBUSxDQUFDLFVBQWU7QUFDdEIsUUFBSSxNQUFNLGdDQUFnQyxNQUFNLElBQUk7QUFDbEQsVUFBSSxNQUFNLFNBQVMsQ0FBQyxHQUFHLE1BQU0sK0JBQStCLE1BQU0sSUFBSTtBQUNwRSxjQUFNLE9BQU8sTUFBTSxTQUFTLE1BQU0sZUFBZTtBQUNqRCxjQUFNLENBQUMsTUFBTSxPQUFPLElBQUksU0FBUyxNQUFNO0FBQ3ZDLGNBQU0sTUFBTSxPQUEwQjtBQUN0QyxlQUNFQyxNQUFDLFNBQUksb0NBQWlDLElBQ3BDO0FBQUEsVUFBQUQsS0FBQyxTQUFLLEdBQUcsTUFBTSxTQUFTLE9BQU8saUNBQThCLElBQzNELFVBQUFDLE1BQUMsU0FBSSxXQUFVLGFBQ2I7QUFBQSxZQUFBRCxLQUFDLE9BQUUsV0FBVyxNQUFNLFdBQVcsSUFBSSxLQUFLLFdBQVcsR0FBRyxJQUFJO0FBQUEsWUFDMURBLEtBQUMsVUFBTSxnQkFBTSxJQUFJLEtBQUssTUFBTSxLQUFJO0FBQUEsWUFDaENBO0FBQUEsY0FBQztBQUFBO0FBQUEsZ0JBQ0M7QUFBQSxnQkFDQSxXQUFVO0FBQUEsZ0JBQ1YsU0FBUyxNQUFNO0FBQ2Isd0JBQU0sT0FDSixJQUFJLFFBQVEsV0FBVyxXQUFXLFdBQVc7QUFBQSxvQkFDM0M7QUFBQSxrQkFDRixFQUFFO0FBRUoseUJBQU8sVUFBVSxVQUFVLFVBQVUsSUFBSSxFQUFFLEtBQUssTUFBTTtBQUNwRCw0QkFBUSxTQUFTO0FBQ2pCLCtCQUFXLE1BQU07QUFDZiw4QkFBUSxNQUFNO0FBQUEsb0JBQ2hCLEdBQUcsR0FBSTtBQUFBLGtCQUNULENBQUM7QUFBQSxnQkFDSDtBQUFBLGdCQUVDO0FBQUE7QUFBQSxZQUNIO0FBQUEsYUFDRixHQUNGO0FBQUEsVUFDQyxNQUFNO0FBQUEsV0FDVDtBQUFBLE1BRUo7QUFBQSxJQUNGO0FBRUEsUUFBSSxNQUFNLCtCQUErQixNQUFNLElBQUk7QUFDakQsWUFBTSxPQUFPLE1BQU0sZUFBZTtBQUNsQyxZQUFNLENBQUMsTUFBTSxPQUFPLElBQUksU0FBUyxNQUFNO0FBQ3ZDLFlBQU0sTUFBTSxPQUEwQjtBQUN0QyxZQUFNLFFBQVEsTUFBTTtBQUVwQixhQUNFQSxLQUFDLFNBQUssR0FBRyxPQUNQLFVBQUFDLE1BQUMsU0FBSSxXQUFVLGFBQ2I7QUFBQSxRQUFBRCxLQUFDLE9BQUUsV0FBVyxNQUFNLFdBQVcsSUFBSSxLQUFLLFdBQVcsR0FBRyxJQUFJO0FBQUEsUUFDMURBLEtBQUMsVUFBTSxpQkFBTTtBQUFBLFFBQ2JBO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFDQztBQUFBLFlBQ0EsV0FBVTtBQUFBLFlBQ1YsU0FBUyxNQUFNO0FBQ2Isb0JBQU0sT0FDSixJQUFJLFFBQVEsV0FBVyxXQUFXLFdBQVc7QUFBQSxnQkFDM0M7QUFBQSxjQUNGLEVBQUU7QUFFSixxQkFBTyxVQUFVLFVBQVUsVUFBVSxJQUFJLEVBQUUsS0FBSyxNQUFNO0FBQ3BELHdCQUFRLFNBQVM7QUFDakIsMkJBQVcsTUFBTTtBQUNmLDBCQUFRLE1BQU07QUFBQSxnQkFDaEIsR0FBRyxHQUFJO0FBQUEsY0FDVCxDQUFDO0FBQUEsWUFDSDtBQUFBLFlBRUM7QUFBQTtBQUFBLFFBQ0g7QUFBQSxTQUNGLEdBQ0Y7QUFBQSxJQUVKO0FBQ0EsV0FBT0EsS0FBQyxTQUFLLEdBQUcsT0FBTztBQUFBLEVBQ3pCO0FBQUEsRUFDQSxLQUFLLENBQUMsVUFBZTtBQUNuQixXQUNFQSxLQUFBRSxXQUFBLEVBQ0UsVUFBQUYsS0FBQyxTQUFJLFdBQVUsY0FBYSxPQUFPLE1BQU0sT0FDdkMsVUFBQUEsS0FBQyxTQUFLLEdBQUcsT0FBTyxHQUNsQixHQUNGO0FBQUEsRUFFSjtBQUNGO0FBcUVBLElBQU0sT0FBTyxDQUFDO0FBQUEsRUFDWjtBQUFBLEVBQ0E7QUFDRixNQVFNO0FBQ0osUUFBTSxFQUFFLE1BQU0sU0FBUyxJQUFJO0FBQzNCLE1BQUksRUFBRSxLQUFLLElBQUk7QUFFZixTQUFPLFVBQVUsSUFBSTtBQUVyQixRQUFNLGVBQTJCLFNBQVMsS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPO0FBQUEsSUFDbEUsR0FBRyxjQUFTLENBQUM7QUFBQSxJQUNiLFFBQVE7QUFBQSxFQUNWLEVBQUU7QUFFRixNQUFJLE1BQU0sYUFBYSxNQUFNO0FBQzNCLFdBQU9HLEtBQUFDLFdBQUEsRUFBRSxpQkFBRztBQUFBLEVBQ2Q7QUFFQSxTQUNFRCxLQUFBQyxXQUFBLEVBQ0UsVUFBQUMsTUFBQyxTQUFJLFdBQVUsa0JBQ2I7QUFBQSxJQUFBQSxNQUFDLFNBQUksV0FBVSxXQUNiO0FBQUEsTUFBQUYsS0FBQyxTQUFJLFdBQVUsU0FBUyxlQUFLLE9BQU07QUFBQSxNQUNuQ0UsTUFBQyxTQUFJLFdBQVUsY0FDYjtBQUFBLFFBQUFGLEtBQUMsU0FBSSxXQUFVLFFBQU8sbUJBQUs7QUFBQSxRQUMzQkEsS0FBQyxTQUFJLFdBQVUsVUFBUyxzQkFBRztBQUFBLFFBQzNCQSxLQUFDLFNBQUksV0FBVSxRQUFRLGVBQUssTUFBSztBQUFBLFNBQ25DO0FBQUEsTUFDQUEsS0FBQyxTQUFJLFdBQVUsUUFDWixlQUFLLE1BQU0sSUFBSSxDQUFDO0FBQUE7QUFBQSxRQUVmRSxNQUFDLE9BQUUsTUFBTSxRQUFRLEdBQUcsSUFBYyxXQUFVLFdBQVU7QUFBQTtBQUFBLFVBQ2xEO0FBQUEsYUFEeUIsR0FFN0I7QUFBQSxPQUNELEdBQ0g7QUFBQSxPQUNGO0FBQUEsSUFDQUYsS0FBQyxTQUFJLFdBQVUsY0FDYixVQUFBRSxNQUFDLFNBQUksV0FBVSxRQUNiO0FBQUEsTUFBQUYsS0FBQyxTQUFJLEtBQUssS0FBSyxPQUFPLEtBQUksSUFBRztBQUFBLE1BQzdCQTtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0MsV0FBVTtBQUFBLFVBQ1YseUJBQXlCLEVBQUUsUUFBUSxLQUFLLFlBQVksR0FBRztBQUFBO0FBQUEsTUFDeEQ7QUFBQSxNQUVEQSxLQUFDLFVBQ0MsVUFBQUEsS0FBQyxXQUFRLFNBQVMsVUFBVSxHQUM5QjtBQUFBLE1BRUFFLE1BQUMsU0FBSSxXQUFVLGVBQ2I7QUFBQSxRQUFBQSxNQUFDLFFBQUc7QUFBQTtBQUFBLFVBQUUsS0FBSyxLQUFLLENBQUM7QUFBQSxVQUFFO0FBQUEsV0FBTTtBQUFBLFFBQ3pCRixLQUFDLFNBQUksV0FBVSx5QkFDWix1QkFBYSxJQUFJLENBQUMsU0FDakJBLEtBQUFDLFdBQUEsRUFDRSxVQUFBRCxLQUFDLFNBQUksV0FBVSxjQUNiLFVBQUFBO0FBQUEsVUFBQ0c7QUFBQSxVQUFBO0FBQUEsWUFDQyxXQUNHLEtBQWEsT0FBTyxZQUFZLE1BQ2hDLEtBQWdCLFlBQVksSUFDekIsV0FDQTtBQUFBLFlBRU4sTUFBTSxTQUFVLEtBQWEsTUFBTTtBQUFBLFlBQ25DLFVBQVU7QUFBQSxZQUVULGVBQUs7QUFBQTtBQUFBLFFBQ1IsR0FDRixHQUNGLENBQ0QsR0FDSDtBQUFBLFNBQ0Y7QUFBQSxNQUNBRCxNQUFDLFNBQUksV0FBVSxVQUNiO0FBQUEsUUFBQUYsS0FBQyxTQUFJLFdBQVUsUUFDYixVQUFBRTtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQ0MsTUFBTSw0REFBNEQsS0FBSyxHQUFHO0FBQUEsWUFFMUU7QUFBQSxjQUFBRixLQUFDLE9BQUUsV0FBVSxrQkFBaUI7QUFBQSxjQUFJO0FBQUE7QUFBQTtBQUFBLFFBQ3BDLEdBQ0Y7QUFBQSxRQUNBQSxLQUFDLFNBQUksV0FBVSxRQUNiLFVBQUFBLEtBQUNHLE9BQUEsRUFBSyxNQUFLLEtBQUksMEJBQVksR0FDN0I7QUFBQSxTQUNGO0FBQUEsT0FDRixHQUNGO0FBQUEsS0FDRixHQUNGO0FBRUo7QUFFQSxJQUFPLGVBQVE7IiwKICAibmFtZXMiOiBbIkxpbmsiLCAiQ29udGVudCIsICJqc3giLCAiTGluayIsICJGcmFnbWVudCIsICJqc3giLCAianN4cyIsICJGcmFnbWVudCIsICJqc3giLCAianN4cyIsICJGcmFnbWVudCIsICJqc3giLCAianN4cyIsICJqc3giLCAianN4cyIsICJGcmFnbWVudCIsICJqc3giLCAiRnJhZ21lbnQiLCAianN4cyIsICJMaW5rIl0KfQo=
