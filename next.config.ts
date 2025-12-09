/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    allowedDevOrigins: ['http://localhost:3000', 'http://192.168.33.11:3000'],
  },
};

module.exports = nextConfig;
