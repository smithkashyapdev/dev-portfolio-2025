import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Keep the native Swiss Ephemeris addon out of the bundler; load it at runtime.
  serverExternalPackages: ['swisseph'],
};

export default nextConfig;
