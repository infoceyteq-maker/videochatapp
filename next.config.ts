import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*.e2b.app", "e2b.app"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "imagedelivery.net" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "api.dicebear.com" },
    ],
  },
};

export default nextConfig;
