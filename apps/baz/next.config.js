const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin');

function extraWebpackPlugins(isServer) {
  if (isServer) {
    return [new PrismaPlugin()];
  }
  return [];
}

/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    remotePatterns: [
      {
        hostname: '*',
        pathname: '/**',
        protocol: 'https'
      }
    ]
  },
  webpack: (config, { isServer }) => ({
    ...config,
    plugins: [...config.plugins, ...extraWebpackPlugins(isServer)],
    resolve: {
      ...config.resolve,
      fallback: {
        async_hooks: false,
        child_process: false,
        debug: false,
        fs: false,
        net: false,
        'original-fs': false,
        perf_hooks: false,
        tls: false
      }
    }
  })
};
