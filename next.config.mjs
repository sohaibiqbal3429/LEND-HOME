/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "assets.vercel.com"],
    formats: ["image/avif", "image/webp"]
  }
};

export default nextConfig;
