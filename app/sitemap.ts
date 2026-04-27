import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/shared/utils/site-url';
import { locales } from '@/core/i18n/i18n.config';
import { getCategories } from '@/shared/services/categories.server';
import { getProducts } from '@/features/products/services/getProducts.server';
import { toSlug } from '@/shared/utils/slug';

// Refresh the sitemap once an hour. Tune as needed.
export const revalidate = 3600;

const STATIC_PATHS = ['', '/products', '/categories', '/about', '/contact-us', '/terms-and-conditions'] as const;

const buildAlternates = (path: string) => ({
  languages: Object.fromEntries(locales.map(loc => [loc, `${SITE_URL}/${loc}${path}`])),
});

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Static pages — emitted per-locale with hreflang alternates so Google can
  // serve the right language to the right user.
  const staticEntries: MetadataRoute.Sitemap = locales.flatMap(locale =>
    STATIC_PATHS.map(path => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: now,
      changeFrequency: path === '' ? 'daily' : 'weekly',
      priority: path === '' ? 1 : 0.7,
      alternates: buildAlternates(path),
    }))
  );

  // Categories
  let categoryEntries: MetadataRoute.Sitemap = [];
  try {
    const cats = await getCategories(1);
    categoryEntries = (cats.result || []).flatMap(cat =>
      locales.map(locale => {
        const path = `/products?categoryId=${cat.id}&categoryName=${encodeURIComponent(cat.name)}`;
        return {
          url: `${SITE_URL}/${locale}${path}`,
          lastModified: now,
          changeFrequency: 'weekly' as const,
          priority: 0.6,
        };
      })
    );
  } catch (err) {
    console.error('sitemap: failed to fetch categories', err);
  }

  // Products — paginate through all pages. Bounded to avoid runaway loops.
  const productEntries: MetadataRoute.Sitemap = [];
  try {
    const PAGE_SIZE = 100;
    const MAX_PAGES = 50; // hard cap = 5000 products
    const first = await getProducts({ page: 1, page_size: PAGE_SIZE });
    const totalPages = Math.min(first.num_pages || 1, MAX_PAGES);

    const allProducts = [...(first.result || [])];
    for (let p = 2; p <= totalPages; p++) {
      const page = await getProducts({ page: p, page_size: PAGE_SIZE });
      allProducts.push(...(page.result || []));
    }

    for (const product of allProducts) {
      const path = `/products/${product.id}-${toSlug(product.name)}`;
      const lastMod = product.updated_at ? new Date(product.updated_at) : now;

      // Image sitemap extension: list product images so Google Images can
      // discover and crawl them. Cap to a reasonable number per entry —
      // the spec allows up to 1000 but most real galleries are <10.
      const images = (product.images || [])
        .map(img => img.image)
        .filter((src): src is string => Boolean(src))
        .slice(0, 10);

      for (const locale of locales) {
        productEntries.push({
          url: `${SITE_URL}/${locale}${path}`,
          lastModified: lastMod,
          changeFrequency: 'weekly',
          priority: 0.8,
          alternates: buildAlternates(path),
          ...(images.length > 0 ? { images } : {}),
        });
      }
    }
  } catch (err) {
    console.error('sitemap: failed to fetch products', err);
  }

  return [...staticEntries, ...categoryEntries, ...productEntries];
}
