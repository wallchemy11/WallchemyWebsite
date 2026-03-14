/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev }) => {
    // Workaround for intermittent filesystem cache ENOENT issues that can break dev
    // (missing .pack.gz / missing chunks leading to /_next/static 404s).
    if (dev) config.cache = { type: "memory" };
    return config;
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 7,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "images.pexels.com"
      },
      {
        protocol: "https",
        hostname: "**.blob.vercel-storage.com"
      }
    ]
  }
};

module.exports = nextConfig;
