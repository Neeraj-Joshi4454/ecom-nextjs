/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["demoesho01.s3.ap-south-1.amazonaws.com","https://eshop-custom-backend.vercel.app"],
  },
};

export default nextConfig;
