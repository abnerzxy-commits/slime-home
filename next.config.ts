import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  headers: async () => [
    {
      source: "/screenshots/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=2592000, immutable", // 30 days
        },
      ],
    },
  ],
};

export default nextConfig;
