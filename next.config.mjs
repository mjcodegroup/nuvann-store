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
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  output: "export",
};

export default nextConfig;
