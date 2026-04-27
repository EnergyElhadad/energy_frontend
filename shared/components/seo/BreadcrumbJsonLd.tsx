import { SITE_URL } from '@/shared/utils/site-url';

export interface BreadcrumbEntry {
  name: string;
  /** Path relative to the locale root, e.g. "/products". Omit for the final crumb. */
  path?: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbEntry[];
  locale: string;
}

/**
 * Schema.org BreadcrumbList. Causes Google to show the breadcrumb trail
 * in place of the raw URL in search results — more readable, higher CTR.
 */
export const BreadcrumbJsonLd = ({ items, locale }: BreadcrumbJsonLdProps) => {
  const origin = SITE_URL;

  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: `${origin}/${locale}${item.path}` } : {}),
    })),
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};
