import { ProductsContent } from '@/features/products/components/ProductsContent';
import { getProducts } from '@/features/products/services/getProducts.server';
import { getCategories, CategoriesResponse } from '@/shared/services/categories';
import { Metadata } from 'next';
import { toast } from 'sonner';
import { ProductsResponse } from '@/features/products/types/productsResponse';
import { getCategoryDetails } from '@/shared/services/categoryDetails';
import { Category } from '@/shared/types/category';

import { getTranslations, setRequestLocale } from 'next-intl/server';
import { CollectionJsonLd, type CollectionItem } from '@/shared/components/seo/CollectionJsonLd';
import { toSlug } from '@/shared/utils/slug';

// Listing page reads searchParams (filters, category, page) so it's effectively
// dynamic per query, but allowing ISR lets the bare /products URL be cached.
export const revalidate = 600;

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// A "filtered" URL is anything beyond the bare /products with a single category
// filter — search queries, pagination, sort, etc. We let category-only URLs be
// indexed (they're real, useful landing pages) but tell Google to skip query
// permutations to avoid duplicate-content dilution.
const isFilteredListingUrl = (searchParams: Record<string, string | string[] | undefined>) => {
  const indexableKeys = new Set(['categoryId', 'categoryName']);
  return Object.keys(searchParams).some(key => !indexableKeys.has(key) && searchParams[key] !== undefined && searchParams[key] !== '');
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { locale } = await params;
  const sp = await searchParams;
  const { categoryName } = sp;
  const t = await getTranslations({ locale, namespace: 'Products' });

  const filtered = isFilteredListingUrl(sp);

  return {
    title: (categoryName as string) || t('meta_title'),
    // Filtered/searched/paginated permutations are noindex,follow — keep
    // crawl paths open but don't dilute the canonical /products and the
    // single-category landing pages with thousands of duplicate variants.
    ...(filtered
      ? {
          robots: {
            index: false,
            follow: true,
            googleBot: { index: false, follow: true },
          },
        }
      : {}),
  };
}

export default async function ProductsPage({ params, searchParams }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const sp = await searchParams;
  const { categoryId } = sp;
  const t = await getTranslations({ locale, namespace: 'Products' });
  let initialData: ProductsResponse | null = null;

  try {
    initialData = await getProducts({
      page: 1,
      category: categoryId ? Number(categoryId) : undefined,
    });
  } catch (error) {
    toast.error('Failed to fetch initial products');
    console.error('Failed to fetch initial products:', error);
  }

  let initialCategories: CategoriesResponse | null = null;
  try {
    initialCategories = await getCategories(1);
  } catch (error) {
    console.error('Failed to fetch initial categories:', error);
  }

  let categoryDetails: Category | null = null;

  if (categoryId) {
    categoryDetails = await getCategoryDetails(Number(categoryId));
  }

  // Only emit the CollectionPage JSON-LD on indexable variants — the bare
  // /products listing or a single-category landing page. Filtered/paginated
  // permutations are noindex (see generateMetadata) and don't need it.
  const indexable = !isFilteredListingUrl(sp);
  const collectionItems: CollectionItem[] = indexable
    ? (initialData?.result || []).slice(0, 30).map(p => ({
        name: p.name,
        path: `/products/${p.id}-${toSlug(p.name)}`,
        image: p.images?.find(img => img.is_primary)?.image || p.images?.[0]?.image,
      }))
    : [];

  return (
    <main className="bg-Background">
      {indexable && collectionItems.length > 0 && (
        <CollectionJsonLd
          locale={locale}
          path={categoryId ? `/products?categoryId=${categoryId}` : '/products'}
          name={categoryDetails?.name || t('meta_title')}
          description={categoryDetails?.name || t('all_products_desc')}
          items={collectionItems}
        />
      )}
      <div className="container">
        {/* Main Content */}
        <div className="mx-auto max-w-7xl px-4 pt-4 pb-33">
          <ProductsContent initialData={initialData} initialCategories={initialCategories!} categeoryDescription={categoryDetails?.name || t('all_products_desc')} />
        </div>
      </div>
    </main>
  );
}
