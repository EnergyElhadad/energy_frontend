import { Metadata } from 'next';
import { CustomerReviews } from '@/features/home/components/CustomerReviews';
import { MainBanner } from '@/features/home/components/MainBanner';
import { ShopByCategory } from '@/features/home/components/ShopByCategory';
import { WhyChooseUs } from '@/features/home/components/WhyChooseUs';
import { Hero } from '@/features/home/components/hero';
import { ProductBanners } from '@/features/home/components/productBanners';
import { getCategories } from '@/shared/services/categories.server';
import { getTranslations } from 'next-intl/server';

import { getHomeFeatures } from '@/features/home/services/home.server';
import { getBanners } from '@/features/home/services/banners.server';
import { Display } from '@/shared/components/layout/Display';
import { HomeFeaturesList } from '@/features/home/components/HomeFeaturesList';
import { getServerHomepageRatings } from '@/features/home/services/ratings.server';

export const dynamic = 'force-dynamic';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'HomePage' });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function Home() {
  const heroData = await getBanners('header');
  const categoriesData = await getCategories();
  const homeFeaturesData = await getHomeFeatures();
  const bannersData = await getBanners('footer');
  const reviewsData = await getServerHomepageRatings();

  return (
    <main className="space-y-8">
      <Display when={heroData.result.length > 0}>
        <Hero data={heroData.result} />
      </Display>
      <Display when={categoriesData.result.length > 0}>
        <ShopByCategory categories={categoriesData.result} />
      </Display>
      <Display when={homeFeaturesData.result.length > 0}>
        <HomeFeaturesList initialData={homeFeaturesData} />
      </Display>
      <ProductBanners banners={bannersData.result} />
      <WhyChooseUs />
      <Display when={reviewsData.result.length > 0}>
        <CustomerReviews reviews={reviewsData.result} />
      </Display>
      <MainBanner />
    </main>
  );
}
