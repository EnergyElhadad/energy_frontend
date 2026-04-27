/**
 * Public site URL used in metadata, OpenGraph, sitemap, robots, and JSON-LD.
 * Falls back to the production domain so SEO output is never empty.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://energyelhadad.com').replace(/\/$/, '');
