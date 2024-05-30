/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        pathname: '**',
      },
    ],
    unoptimized: true,
  },
  staticPageGenerationTimeout: 1000,
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js', 'js', 'ts'],
  // output: "export",
};

export default nextConfig;
