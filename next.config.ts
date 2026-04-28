import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "new-staging.energyelhadad.com",
      },
      {
        protocol: "https",
        hostname: "new-staging.energyelhadad.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};


const withNextIntl = createNextIntlPlugin("./core/i18n/request.ts");
export default withNextIntl(nextConfig);
