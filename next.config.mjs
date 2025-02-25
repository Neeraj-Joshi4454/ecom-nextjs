/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["demoesho01.s3.ap-south-1.amazonaws.com"],
  },
};

export default nextConfig;
