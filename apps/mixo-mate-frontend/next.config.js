/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mixomate-cocktails.s3.ap-southeast-2.amazonaws.com',
      },
    ],
  },
}

module.exports = nextConfig
