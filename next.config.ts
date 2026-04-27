import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import bundleAnalyzer from "@next/bundle-analyzer";

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

// Bundle analyzer is opt-in via the ANALYZE=true env var. Doesn't run in normal
// builds; emits an interactive HTML report to .next/analyze/ when enabled.
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const withNextIntl = createNextIntlPlugin("./core/i18n/request.ts");
export default withBundleAnalyzer(withNextIntl(nextConfig));
