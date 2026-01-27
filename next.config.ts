import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';


const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone', // Required for Docker deployments
};

const withNextIntl = createNextIntlPlugin('./core/i18n/request.ts');
export default withNextIntl(nextConfig);

