/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mixomate-cocktails.s3.ap-southeast-2.amazonaws.com",
      },
    ],
  },
  redirects: async () => {
    return [
      {
        source: "/auth",
        destination: "/authenticate",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
