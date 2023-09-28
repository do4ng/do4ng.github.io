const { join } = require('path');

/**
 * @type {import("next").NextConfig}
 */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  experimental: {
    serverComponentsExternalPackages: ['shiki', 'vscode-oniguruma'],
  },
  sassOptions: {
    fiber: false,
    includePaths: [join(__dirname, 'styles')],
  },
  webpack(config, options) {
    config.resolve.fallback = { fs: false };
    config.plugins.push(
      new (require('copy-webpack-plugin'))({
        patterns: [
          {
            from: 'node_modules/shiki/themes/material-theme-palenight.json',
            to: '../shiki/theme.json',
          },
        ],
      })
    );
    return config;
  },
};
