export default {  "/about.tsx": () => import("./client/about.js"),

  "/index.tsx": () => import("./client/index.js"),

  "/post/posts.json": () => import("./client/post/posts.js"),

  "/post/[slug].tsx": () => import("./client/post/[slug].js"),

  "/project/index.tsx": () => import("./client/project/index.js"),

  "/tag/[slug].tsx": () => import("./client/tag/[slug].js"),

  "/tags.tsx": () => import("./client/tags.js"),

  "[layout]": () => import("./client/_layout.js"),
}