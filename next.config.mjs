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
};

export default nextConfig;
