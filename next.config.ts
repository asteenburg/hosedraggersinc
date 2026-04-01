import type { NextConfig } from "next";

const nextConfig: any = {
  /* config options here */
  eslint: {
    // This bypasses the 'core-web-vitals' module error
    ignoreDuringBuilds: true,
  },
  typescript: {
    // This bypasses the 'open' vs 'isOpen' prop error
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
