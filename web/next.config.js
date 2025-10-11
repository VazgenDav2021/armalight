const path = require("path");
const withNextIntl = require("next-intl/plugin")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "src/theme")],
  },
  trailingSlash: true,
  experimental: {
    scrollRestoration: true, // ✅ правильно
  },
};

module.exports = withNextIntl(nextConfig);
