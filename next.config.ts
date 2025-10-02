import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Skip TypeScript errors during build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Skip ESLint errors during build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
