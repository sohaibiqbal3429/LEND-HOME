/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  async headers() {
    return [
      {
        // Immutable caching for static imagery and fonts served by Next.
        source: "/:all*(svg|jpg|jpeg|png|gif|webp|avif|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable"
          }
        ]
      }
    ];
  },
  images: {
    domains: ["images.unsplash.com", "assets.vercel.com"],
    formats: ["image/avif", "image/webp"]
  }
};

export default nextConfig;
