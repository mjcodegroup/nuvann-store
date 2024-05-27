/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  react: {
    useSuspense: false,
    wait: false
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
};

export default nextConfig;
