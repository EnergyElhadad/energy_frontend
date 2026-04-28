import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import bundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      // Staging API host — keep so staging build still works.
      {
        protocol: "http",
        hostname: "new-staging.energyelhadad.com",
      },
      {
        protocol: "https",
        hostname: "new-staging.energyelhadad.com",
      },
      // Production API host — same origin as the site, nginx proxies /api/v1
      // to the backend; product/banner/category image URLs come back from this
      // origin too, so next/image needs it whitelisted.
      {
        protocol: "https",
        hostname: "energyelhadad.com",
      },
      {
        protocol: "https",
        hostname: "www.energyelhadad.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

// Bundle analyzer is opt-in via the ANALYZE=true env var. Doesn't run in normal
// builds; emits an interactive HTML report to .next/analyze/ when enabled.
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const withNextIntl = createNextIntlPlugin("./core/i18n/request.ts");
export default withBundleAnalyzer(withNextIntl(nextConfig));
