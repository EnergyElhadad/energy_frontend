import { Metadata } from 'next';
import { Breadcrumb } from '@/shared/components/layout/Breadcrumb';
import ProductSlider from '@/features/SingleProduct/components/ProductSlider';
import { ProductDetails } from '@/features/SingleProduct/components/ProductDetails';
import { getProductById } from '@/features/SingleProduct/services/product-service';
import { ProductTabs } from '@/features/SingleProduct/components/ProductTabs';
import { getIdFromSlug } from '@/shared/utils/slug';

interface SingleProductPageProps {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({ params }: SingleProductPageProps): Promise<Metadata> => {
  const { id } = await params;
  const productId = getIdFromSlug(id);
  const product = await getProductById(productId);

  return {
    title: product?.name || 'Single Product',
    description: product?.short_description || 'Single Product',
  };
};

const SingleProductPage: React.FC<SingleProductPageProps> = async ({ params }) => {
  const { id } = await params;
  const productId = getIdFromSlug(id);
  const data = await getProductById(productId);
  const { name, category, images, description, ratings_count } = data || {};

  const imagesData = images.map(image => image.image);

  const breadcrumbItems = [{ label: 'الرئيسية', href: '/' }, { label: category.name, href: `/products?category=${category.id}` }, { label: name }];

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
          <ProductTabs generalDescription={description} technicalSpecifications={description} reviewsCount={ratings_count || 0} />
        </div>
      </div>
    </main>
  );
};

export default SingleProductPage;
