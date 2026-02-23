import { ProductsContent } from '@/features/products/components/ProductsContent';
import { getProducts } from '@/features/products/services/getProducts.server';
import { getCategories, CategoriesResponse } from '@/shared/services/categories';
import { Metadata } from 'next';
import { toast } from 'sonner';
import { ProductsResponse } from '@/features/products/types/productsResponse';
import { Breadcrumb } from '@/shared/components/layout/Breadcrumb';
import { getCategoryDetails } from '@/shared/services/categoryDetails';
import { Category } from '@/shared/types/category';

import { getTranslations } from 'next-intl/server';

export const dynamic = 'force-dynamic';

type Props = {
  params: { locale: string };
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params: { locale }, searchParams }: Props): Promise<Metadata> {
  const { categoryName } = await searchParams;
  const t = await getTranslations({ locale, namespace: 'Products' });

  return {
    title: (categoryName as string) || t('meta_title'),
  };
}

export default async function ProductsPage({ params: { locale }, searchParams }: Props) {
  const { categoryId, categoryName } = await searchParams;
  const t = await getTranslations({ locale, namespace: 'Products' });
  const commonT = await getTranslations({ locale, namespace: 'Header' });
  let initialData: ProductsResponse | null = null;

  try {
    initialData = await getProducts({ page: 1 });
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

  const breadcrumbItems = [
    { label: commonT('home'), href: '/' },
    ...(categoryId && categoryName
      ? [
          {
            label: categoryName as string,
            href: `/products?categoryId=${categoryId}&categoryName=${categoryName}`,
          },
        ]
      : [{ label: commonT('all_products'), href: '/products' }]),
  ];
  let categoryDetails: Category | null = null;

  if (categoryId) {
    categoryDetails = await getCategoryDetails(Number(categoryId));
  }

  return (
    <main className="bg-Background">
      <div className="container">
        <Breadcrumb className="py-5" items={breadcrumbItems} />

        {/* Main Content */}
        <div className="mx-auto max-w-7xl px-4 pt-4 pb-33">
          <ProductsContent initialData={initialData} initialCategories={initialCategories!} categeoryDescription={categoryDetails?.name || t('all_products_desc')} />
        </div>
      </div>
    </main>
  );
}
