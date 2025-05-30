import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["nodemailer"],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't attempt to load these server-only packages on the client
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        tls: false,
        fs: false,
      };
    }
    return config;
  },
};

export default nextConfig;
