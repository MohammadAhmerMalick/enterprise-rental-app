import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'placehold.co',
        pathname: '/**',
        port: '',
        protocol: 'https',
      },
    ],
  },
}

export default nextConfig
