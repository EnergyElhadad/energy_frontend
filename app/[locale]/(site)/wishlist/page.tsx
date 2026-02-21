import { Breadcrumb } from '@/shared/components/layout/Breadcrumb';
import { WishlistContent } from '@/features/wishlist/components/WishlistContent';
import { getWishlistProducts } from '@/features/wishlist/services/getWishlistProducts.server';
import { WishlistProductsResponse } from '@/shared/services/wishlist';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'المفضلة',
  description: 'قائمة المنتجات المفضلة',
};

export default async function WishlistPage() {
  let initialData: WishlistProductsResponse | null = null;

  try {
    initialData = await getWishlistProducts({ page: 1, page_size: 12 });
  } catch (error) {
    console.error('Failed to fetch wishlist products:', error);
  }

  const breadcrumbItems = [{ label: 'الرئيسية', href: '/' }, { label: 'المفضلة' }];

  return (
    <main className="bg-Background">
      <div className="container">
        <Breadcrumb className="py-5" items={breadcrumbItems} />

        <div className="mx-auto max-w-7xl px-4 pt-4 pb-33">
          <WishlistContent initialData={initialData} />
        </div>
      </div>
    </main>
  );
}
