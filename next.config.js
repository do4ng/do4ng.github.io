const { join } = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [join(__dirname, 'styles')],
    prependData: `@import "styles/_variables.scss";`,
  },
};

module.exports = nextConfig;
