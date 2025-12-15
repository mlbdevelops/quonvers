/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'media.giphy.com' },
    ],
    formats: ['image/webp', 'image/avif'],
    unoptimized: true
  },
};

export default nextConfig;
