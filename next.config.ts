import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  productionBrowserSourceMaps: false,
  
  // Add these for static export compatibility:
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true, // Helps with static file routing
};

export default nextConfig;