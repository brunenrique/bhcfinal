
import type { NextConfig } from 'next';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },

  allowedDevOrigins: [
    'https://9003-firebase-studio-1749490048431.cluster-duylic2g3fbzerqpzxxbw6helm.cloudworkstations.dev',
    'https://3000-firebase-studio-1749490048431.cluster-duylic2g3fbzerqpzxxbw6helm.cloudworkstations.dev',
  ],
};

export default nextConfig;
