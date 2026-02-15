import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "staging.energyelhadad.com",
      },
      {
        protocol: "https",
        hostname: "staging.energyelhadad.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};


const withNextIntl = createNextIntlPlugin("./core/i18n/request.ts");
export default withNextIntl(nextConfig);
