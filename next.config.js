/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Remotion uses some native-ish deps via @remotion/player that are browser-only;
  // keep them out of the server bundle so Vercel build stays clean.
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    return config;
  },
};

module.exports = nextConfig;
