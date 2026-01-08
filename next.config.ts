import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options for Image elements */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dev-adv-video-content.s3.us-east-1.amazonaws.com',
        // allow any bucket (/thumbnails, miscPhotos, etc.)
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
