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
}; /* Restart trigger */

export default nextConfig;
