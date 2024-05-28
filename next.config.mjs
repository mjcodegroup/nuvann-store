/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  react: {
    useSuspense: false,
    wait: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        pathname: '**',
      },
    ],
  },
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js']
};

export default nextConfig;
