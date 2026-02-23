import { Metadata } from 'next';
import { Breadcrumb } from '@/shared/components/layout/Breadcrumb';
import ProductSlider from '@/features/SingleProduct/components/ProductSlider';
import { ProductDetails } from '@/features/SingleProduct/components/ProductDetails';
import { getProductById } from '@/features/SingleProduct/services/product-service';
import { ProductTabs } from '@/features/SingleProduct/components/ProductTabs';
import { getIdFromSlug } from '@/shared/utils/slug';
import { getTranslations } from 'next-intl/server';

export const dynamic = 'force-dynamic';

interface SingleProductPageProps {
  params: Promise<{ id: string; locale: string }>;
}

export const generateMetadata = async ({ params }: SingleProductPageProps): Promise<Metadata> => {
  const { id } = await params;
  const productId = getIdFromSlug(id);
  const product = await getProductById(productId);

  const t = await getTranslations({ locale: (await params).locale, namespace: 'SingleProduct' });

  return {
    title: product?.name || t('meta_title'),
    description: product?.short_description || t('meta_description'),
  };
};

const SingleProductPage: React.FC<SingleProductPageProps> = async ({ params }) => {
  const { id, locale } = await params;
  const productId = getIdFromSlug(id);
  const data = await getProductById(productId);
  const { name, category, images, description, ratings_count } = data || {};
  const commonT = await getTranslations({ locale, namespace: 'Header' });

  const imagesData = images.map(image => image.image);

  const breadcrumbItems = [
    { label: commonT('home'), href: '/' },
    { label: category.name, href: `/products?categoryId=${category.id}&categoryName=${category.name}` },
    { label: name },
  ];

  return (
    <main className="bg-Background min-h-[45dvh] pt-4 pb-20">
      <div className="container">
        <Breadcrumb items={breadcrumbItems} className="mb-10" />

        <div className="flex gap-6">
          <div className="w-full max-w-[590px]">
            <ProductSlider images={imagesData} name={name} />
          </div>
          <div className="flex min-h-[444px] w-full flex-col">
            <ProductDetails product={data} />
          </div>
        </div>

        <div className="mt-10">
          <ProductTabs generalDescription={description} technicalSpecifications={description} reviewsCount={ratings_count || 0} productId={Number(productId)} />
        </div>
      </div>
    </main>
  );
};

export default SingleProductPage;
