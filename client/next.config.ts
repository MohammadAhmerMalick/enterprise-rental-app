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
      {
        hostname: 'sheltos-react-sooty.vercel.app',
        pathname: '/**',
        port: '',
        protocol: 'https',
      },
    ],
  },
}

export default nextConfig
