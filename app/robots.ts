import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/shared/utils/site-url';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/cart',
          '/cart/checkout',
          '/profile',
          '/profile/*',
          '/orders',
          '/orders/*',
          '/wishlist',
          '/signin',
          '/signup',
          '/forgot-password',
          '/new-password',
          '/verify-otp',
          '/verify-forgot-password',
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
