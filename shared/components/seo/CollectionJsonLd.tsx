import { SITE_URL } from '@/shared/utils/site-url';

export interface CollectionItem {
  /** Display name for the item (product or category). */
  name: string;
  /** Path relative to the locale root, e.g. `/products/12-air-purifier`. */
  path: string;
  /** Optional primary image URL (already absolute or fully resolvable). */
  image?: string;
}

interface CollectionJsonLdProps {
  /** Page title — name of the collection. */
  name: string;
  /** Short description for the collection page. */
  description?: string;
  /** Path of the page itself relative to locale root, e.g. `/products`. */
  path: string;
  /** Items in the collection. Order is preserved as listed (1-indexed positions). */
  items: CollectionItem[];
  locale: string;
  /** Override the inner ListItem `@type`. Defaults to `Product`. */
  itemType?: 'Product' | 'Thing';
}

/**
 * Schema.org CollectionPage with an embedded ItemList. Tells Google that the
 * page is a list of products/categories so it can render list-style snippets
 * in search results.
 *
 * Render once per listing page. The ItemList is intentionally compact — Google
 * just needs `position` + `url`, the per-item ProductJsonLd lives on each
 * detail page.
 */
export const CollectionJsonLd = ({ name, description, path, items, locale, itemType = 'Product' }: CollectionJsonLdProps) => {
  const origin = SITE_URL;
  const pageUrl = `${origin}/${locale}${path}`;

  const data = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    ...(description ? { description } : {}),
    url: pageUrl,
    inLanguage: locale === 'ar' ? 'ar-EG' : 'en-US',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${origin}/${locale}${item.path}`,
        item: {
          '@type': itemType,
          name: item.name,
          url: `${origin}/${locale}${item.path}`,
          ...(item.image ? { image: item.image } : {}),
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};
