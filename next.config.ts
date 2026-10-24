import type { NextConfig } from 'next';

const config: NextConfig = {
  // Admin uploads go through a server action; photos are shrunk in the browser first, so 4 MB is plenty.
  experimental: { serverActions: { bodySizeLimit: '4mb' } },
};

export default config;
