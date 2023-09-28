const { join } = require('path');

/**
 * @type {import("next").NextConfig}
 */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [join(__dirname, 'styles')],
    prependData: `@import "styles/_variables.scss";`,
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  experimental: {},
  webpack(config, options) {
    config.plugins.push(
      new (require('copy-webpack-plugin'))({
        patterns: [{ from: 'node_modules/shiki', to: 'shiki' }],
      })
    );
    return config;
  },
};
