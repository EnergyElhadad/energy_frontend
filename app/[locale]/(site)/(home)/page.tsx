import { Metadata } from 'next';
import { CustomerReviews } from '@/features/home/components/CustomerReviews';
import { MainBanner } from '@/features/home/components/MainBanner';
import { ShopByCategory } from '@/features/home/components/ShopByCategory';
import { WhyChooseUs } from '@/features/home/components/WhyChooseUs';
import { Hero } from '@/features/home/components/hero';
import { ProductBanners } from '@/features/home/components/productBanners';
import { getCategories } from '@/shared/services/categories.server';

import { getHomeFeatures } from '@/features/home/services/home.server';
import { getBanners } from '@/features/home/services/banners.server';
import { Display } from '@/shared/components/layout/Display';
import { HomeFeaturesList } from '@/features/home/components/HomeFeaturesList';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'الرئيسية',
  description: ' منصة إينيرجي الحداد للوصول إلى حلول الطاقة المتكاملة والخدمات المتميزة.',
};

export default async function Home() {
  const heroData = await getBanners('header');
  const categoriesData = await getCategories();
  const homeFeaturesData = await getHomeFeatures();
  const bannersData = await getBanners('footer');

  return (
    <main className="space-y-8">
      <Hero data={heroData.result} />
      <ShopByCategory categories={categoriesData.result} />
      <Display when={homeFeaturesData.result.length > 0}>
        <HomeFeaturesList initialData={homeFeaturesData} />
      </Display>
      <ProductBanners banners={bannersData.result} />
      <WhyChooseUs />
      <CustomerReviews />
      <MainBanner />
    </main>
  );
}
