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
import { getContentImages } from '@/features/home/services/contentImages.server copy';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'HomePage' });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function Home() {
  const [heroData, categoriesData, homeFeaturesData, bannersData, reviewsData, contentImagesData] = await Promise.all([
    getBanners('header'),
    getCategories(),
    getHomeFeatures(),
    getBanners('footer'),
    getServerHomepageRatings(),
    getContentImages(),
  ]);

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
      <ProductBanners banners={contentImagesData.result} />
      <WhyChooseUs />
      <Display when={reviewsData.result.length > 0}>
        <CustomerReviews reviews={reviewsData.result} />
      </Display>
      <MainBanner data={bannersData.result} />
    </main>
  );
}
