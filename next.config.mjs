/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "www.baseball-reference.com",
      "www.hockey-reference.com",
      "www.basketball-reference.com",
      "www.pro-football-reference.com",
      "upload.wikimedia.org",
      "raw.githubusercontent.com",
    ],
  },
};

export default nextConfig;
