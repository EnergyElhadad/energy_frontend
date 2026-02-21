import { ProductsContent } from '@/features/products/components/ProductsContent';
import { getProducts } from '@/features/products/services/getProducts.server';
import { getCategories, CategoriesResponse } from '@/shared/services/categories';
import { Metadata } from 'next';
import { toast } from 'sonner';
import { ProductsResponse } from '@/features/products/types/productsResponse';
import { Breadcrumb } from '@/shared/components/layout/Breadcrumb';
import { getCategoryDetails } from '@/shared/services/categoryDetails';
import { Category } from '@/shared/types/category';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }): Promise<Metadata> {
  const { categoryName } = await searchParams;
  return {
    title: (categoryName as string) || 'المنتجات',
  };
}

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const { categoryId, categoryName } = await searchParams;
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
    { label: 'الرئيسية', href: '/' },
    ...(categoryId && categoryName
      ? [
          {
            label: categoryName as string,
            href: `/products?category=${categoryId}`,
          },
        ]
      : [{ label: 'كل المنتجات', href: '/products' }]),
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
          <ProductsContent initialData={initialData} initialCategories={initialCategories!} categeoryDescription={categoryDetails?.name || 'الكل'} />
        </div>
      </div>
    </main>
  );
}
