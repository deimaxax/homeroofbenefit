/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Suppress verbose build logging to stay under 4MB Vercel limit
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
  
  // Reduce build output verbosity
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  
  // Additional optimizations for large-scale ISR
  experimental: {
    // Optimize build performance
    optimizePackageImports: ['lucide-react', '@radix-ui/react-slot'],
  },
  
  // Compress output
  compress: true,
  
  // Production source maps (off to reduce build size)
  productionBrowserSourceMaps: false,
};

export default nextConfig;
