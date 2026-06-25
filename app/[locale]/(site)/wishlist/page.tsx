import { Breadcrumb } from '@/shared/components/layout/Breadcrumb';
import { WishlistContent } from '@/features/wishlist/components/WishlistContent';
import { getWishlistProducts } from '@/features/wishlist/services/getWishlistProducts.server';
import { WishlistProductsResponse } from '@/shared/services/wishlist';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Wishlist' });
  return {
    title: t('title'),
    description: t('meta_description'),
  };
}

export default async function WishlistPage() {
  const t = await getTranslations('Wishlist');
  const c = await getTranslations('Common');

  let initialData: WishlistProductsResponse | null = null;

  try {
    initialData = await getWishlistProducts({ page: 1, page_size: 12 });
  } catch (error) {
    console.error('Failed to fetch wishlist products:', error);
  }

  const breadcrumbItems = [{ label: c('home'), href: '/' }, { label: t('title') }];

  return (
    <main className="bg-Background">
      <div className="container pb-33">
        <Breadcrumb className="py-5" items={breadcrumbItems} />
        <WishlistContent initialData={initialData} />
      </div>
    </main>
  );
}
