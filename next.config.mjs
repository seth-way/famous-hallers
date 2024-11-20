/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "www.pro-football-reference.com",
      "upload.wikimedia.org",
      "raw.githubusercontent.com",
    ],
  },
};

export default nextConfig;
