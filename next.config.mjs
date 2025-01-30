/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    if (config.cache && !dev) {
      config.cache = Object.freeze({
        type: "memory",
      });
    }

    return config;
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  experimental: {
    optimizePackageImports: ["icon-library"],
  },
  images: {
    domains: [
      "i.ytimg.com",
      "p16-sign-sg.tiktokcdn.com",
      "p16-sign-va.tiktokcdn.com",
      "p16-tiktokcdn-com.akamaized.net",
      "p16-sign.tiktokcdn.com",
      "p19-sign.tiktokcdn.com",
      "p16-sign-va.tiktokcdn.com",
      "p77-sign-sg.tiktokcdn.com",
      "p77-sign-va.tiktokcdn.com",
      "lf16-tiktok-web.ttwstatic.com",
      "lf16-tiktok-web.tiktokcdn.com",
    ],
  },
};

export default nextConfig;
