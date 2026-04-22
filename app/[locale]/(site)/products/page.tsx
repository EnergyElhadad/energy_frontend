import { ProductsContent } from '@/features/products/components/ProductsContent';
import { getProducts } from '@/features/products/services/getProducts.server';
import { getCategories, CategoriesResponse } from '@/shared/services/categories';
import { Metadata } from 'next';
import { toast } from 'sonner';
import { ProductsResponse } from '@/features/products/types/productsResponse';
import { getCategoryDetails } from '@/shared/services/categoryDetails';
import { Category } from '@/shared/types/category';

import { getTranslations } from 'next-intl/server';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { categoryName } = await searchParams;
  const t = await getTranslations({ locale, namespace: 'Products' });

  return {
    title: (categoryName as string) || t('meta_title'),
  };
}

export default async function ProductsPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { categoryId } = await searchParams;
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

  return (
    <main className="bg-Background">
      <div className="container">
        {/* Main Content */}
        <div className="mx-auto max-w-7xl px-4 pt-4 pb-33">
          <ProductsContent initialData={initialData} initialCategories={initialCategories!} categeoryDescription={categoryDetails?.name || t('all_products_desc')} />
        </div>
      </div>
    </main>
  );
}
