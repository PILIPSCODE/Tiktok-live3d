/** @type {import('next').NextConfig} */
import nextra from "nextra";

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
      "p16-common-sign-useastred.tiktokcdn-eu.com",
      "p19-sign.tiktokcdn.com",
      "p16-sign-va.tiktokcdn.com",
      "p77-sign-sg.tiktokcdn.com",
      "storage.streamdps.com",
      "p77-sign-va.tiktokcdn.com",
      "lf16-tiktok-web.ttwstatic.com",
      "lf16-tiktok-web.tiktokcdn.com",
      "p16-common-sign-va.tiktokcdn-us.com",
    ],
  },
};

const withNextra = nextra({
  // ... Add Nextra-specific options here
});

export default withNextra(nextConfig);
