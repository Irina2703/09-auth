import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ac.goit.global",
      },
      {
        protocol: "https",
        hostname: "09-auth-eight-kappa.vercel.app",
      },
    ],
  },
};

export default nextConfig;
