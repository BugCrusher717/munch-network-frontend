/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },

  /**
   * If you have `experimental: { appDir: true }` set, then you must comment the below `i18n` config
   * out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "testnet.cleverord.com",
        port: "",
        pathname: "/content/**",
      },
      {
        protocol: "https",
        hostname: "ordinals.com",
        port: "",
        pathname: "/content/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/images/collection/**",
      },
      {
        protocol: "https",
        hostname: "algonrich-s3-bucket.s3.us-east-2.amazonaws.com",
        port: "",
        pathname: "/collection-img/**",
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  output: "standalone",
};

export default config;
