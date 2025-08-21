/** @type {import("next").NextConfig} */
import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} from "next/dist/shared/lib/constants.js";

/** @type {(phase: string, defaultConfig: import("next").NextConfig) => Promise<import("next").NextConfig>} */
const getNextConfig = async (phase) => {
  /** @type {import("next").NextConfig} */

  const env = process.env.NEXT_PUBLIC_ENV;

  const nextConfig = {
    webpack: (config, { isServer, webpack }) => {
      if (!isServer) {
        config.resolve.fallback.fs = false;
        config.resolve.alias.canvas = false;
      }
      config.plugins.push(
        new webpack.DefinePlugin({
          "process.env.NEXT_PUBLIC_VECTOR_TILES_ENDPOINT": JSON.stringify(
            process.env.NEXT_PUBLIC_VECTOR_TILES_ENDPOINT,
          ),
          "process.env.NEXT_PUBLIC_SO_PDF_ENDPOINT": JSON.stringify(
            process.env.NEXT_PUBLIC_SO_PDF_ENDPOINT,
          ),
          "process.env.NEXT_PUBLIC_TREE_PDF_ENDPOINT": JSON.stringify(
            process.env.NEXT_PUBLIC_TREE_PDF_ENDPOINT,
          ),
        }),
      );
      config.module.rules.push({
        test: /\.svg$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192, // Set size limit for inlining, in bytes
              mimetype: "image/svg+xml",
            },
          },
        ],
      });
      console.log(process.env.NEXT_PUBLIC_ENV, phase);

      return config;
    },
    env: {
      NEXT_PUBLIC_TREE_PDF_ENDPOINT: process.env.NEXT_PUBLIC_TREE_PDF_ENDPOINT,
      NEXT_PUBLIC_VECTOR_TILES_ENDPOINT:
        process.env.NEXT_PUBLIC_VECTOR_TILES_ENDPOINT,
      NEXT_PUBLIC_SO_PDF_ENDPOINT: process.env.NEXT_PUBLIC_SO_PDF_ENDPOINT,
      NEXT_PUBLIC_MATOMO_SITE_ID: process.env.NEXT_PUBLIC_MATOMO_SITE_ID,
      NEXT_PUBLIC_MATOMO_URL_BASE: process.env.NEXT_PUBLIC_MATOMO_URL_BASE,
      NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV,
    },
    eslint: {
      ignoreDuringBuilds: phase === PHASE_PRODUCTION_BUILD,
    },
    typescript: {
      ignoreBuildErrors: phase === PHASE_PRODUCTION_BUILD,
    },
    transpilePackages: ["@geops/tree-lib"],
  };

  if (phase === PHASE_PRODUCTION_BUILD) {
    const withSerwist = (await import("@serwist/next")).default({
      swSrc: "sw.ts",
      swDest: "public/sw.js",
      reloadOnOnline: true,
    });
    return withSerwist(nextConfig);
  }

  return nextConfig;
};

export default getNextConfig;
