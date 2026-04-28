import { SITE_URL } from '@/shared/utils/site-url';
import type { ProductData } from '@/features/SingleProduct/types';

interface ProductJsonLdProps {
  product: ProductData;
  locale: string;
  slug: string; // full slug e.g. "12-air-purifier"
}

/**
 * Schema.org Product structured data for Google rich results.
 * Renders as <script type="application/ld+json"> in the page <head>.
 */
export const ProductJsonLd = ({ product, locale, slug }: ProductJsonLdProps) => {
  const url = `${SITE_URL}/${locale}/products/${slug}`;
  const primaryImage = product.images?.find(img => img.is_primary)?.image || product.images?.[0]?.image;
  const offerPrice = product.offer_price || Number(product.price) || 0;

  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.short_description || product.description,
    image: primaryImage ? [primaryImage] : undefined,
    sku: String(product.id),
    category: product.category?.name,
    brand: {
      '@type': 'Brand',
      name: 'Energy Elhadad',
    },
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'EGP',
      price: offerPrice,
      availability: product.is_in_stock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
    ...(product.ratings_count > 0
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '5',
            reviewCount: product.ratings_count,
          },
        }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};
