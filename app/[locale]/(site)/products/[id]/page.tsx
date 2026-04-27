import { Metadata } from 'next';
import { Breadcrumb } from '@/shared/components/layout/Breadcrumb';
import ProductSlider from '@/features/SingleProduct/components/ProductSlider';
import { ProductDetails } from '@/features/SingleProduct/components/ProductDetails';
import { getProductById } from '@/features/SingleProduct/services/product-service';
import { ProductTabs } from '@/features/SingleProduct/components/ProductTabs';
import { getIdFromSlug } from '@/shared/utils/slug';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ProductJsonLd } from '@/shared/components/seo/ProductJsonLd';
import { BreadcrumbJsonLd } from '@/shared/components/seo/BreadcrumbJsonLd';
import { SITE_URL } from '@/shared/utils/site-url';
import { locales } from '@/core/i18n/i18n.config';

// HOT FIX: see (home)/page.tsx note. The build container can't reach the API,
// so prerender produced empty pages. Falling back to dynamic until build-time
// API access is sorted, then we can re-enable ISR + generateStaticParams.
export const dynamic = 'force-dynamic';

interface SingleProductPageProps {
  params: Promise<{ id: string; locale: string }>;
}

export const generateMetadata = async ({ params }: SingleProductPageProps): Promise<Metadata> => {
  const { id, locale } = await params;
  const productId = getIdFromSlug(id);
  const product = await getProductById(productId);

  const t = await getTranslations({ locale, namespace: 'SingleProduct' });

  const title = product?.name || t('meta_title');
  const description = product?.short_description || t('meta_description');
  const primaryImage = product?.images?.find(img => img.is_primary)?.image || product?.images?.[0]?.image;
  const canonical = `${SITE_URL}/${locale}/products/${id}`;
  const languageAlternates = Object.fromEntries(locales.map(l => [l, `${SITE_URL}/${l}/products/${id}`]));

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: languageAlternates,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      siteName: 'Energy Elhadad',
      locale: locale === 'ar' ? 'ar_EG' : 'en_US',
      images: primaryImage ? [{ url: primaryImage, alt: product?.name }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: primaryImage ? [primaryImage] : undefined,
    },
  };
};

const SingleProductPage: React.FC<SingleProductPageProps> = async ({ params }) => {
  const { id, locale } = await params;
  setRequestLocale(locale);
  const productId = getIdFromSlug(id);
  const data = await getProductById(productId);
  const { name, category, images, description, ratings_count, specifications } = data || {};
  const commonT = await getTranslations({ locale, namespace: 'Header' });

  const imagesData = images.map(image => image.image);

  const breadcrumbItems = [
    { label: commonT('home'), href: '/' },
    { label: category.name, href: `/products?categoryId=${category.id}&categoryName=${category.name}` },
    { label: name },
  ];

  const jsonLdCrumbs = [
    { name: commonT('home'), path: '' },
    { name: category.name, path: `/products?categoryId=${category.id}&categoryName=${encodeURIComponent(category.name)}` },
    { name },
  ];

  return (
    <main className="bg-Background min-h-[45dvh] pt-4 pb-20">
      <ProductJsonLd product={data} locale={locale} slug={id} />
      <BreadcrumbJsonLd items={jsonLdCrumbs} locale={locale} />
      <div className="container">
        <Breadcrumb items={breadcrumbItems} className="mb-6 md:mb-10" />

        <div className="flex flex-col gap-6 md:flex-row">
          <div className="w-full md:max-w-[590px]">
            <ProductSlider images={imagesData} name={name} />
          </div>
          <div className="flex w-full flex-col md:min-h-[444px]">
            <ProductDetails product={data} />
          </div>
        </div>

        <div className="mt-10">
          <ProductTabs generalDescription={description} specifications={specifications || []} reviewsCount={ratings_count || 0} productId={Number(productId)} />
        </div>
      </div>
    </main>
  );
};

export default SingleProductPage;
