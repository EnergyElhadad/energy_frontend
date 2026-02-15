import { HeaderSection } from '@/shared/components/ui/HeaderSection';
import { ProductCard } from '@/shared/components/ProductCard';
import { OffersSwipper } from './components/OffersSwipper';
import { Product } from '@/shared/types/product';

interface HomeProductsSectionProps {
  title: string;
  products: Product[];
}

export const HomeProductsSection = ({ title, products }: HomeProductsSectionProps) => {
  return (
    <section className="bg-Background py-16">
      <div className="container">
        <HeaderSection title={title} textlink="عرض الكل" urlLink="#" />
        <div className="hidden gap-x-2 gap-y-4 lg:grid lg:grid-cols-4">
          {products.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.name}
              image={product.images.find(img => img.is_primary)?.image || '/images/logo.png'}
              originalPrice={Number(product.price)}
              oldPrice={product.offer_price}
              badge={product.discount_percentage > 0 ? `${product.discount_percentage}%` : undefined}
            />
          ))}
        </div>
        <OffersSwipper
          products={products.map(product => ({
            id: product.id,
            title: product.name,
            image: product.images.find(img => img.is_primary)?.image || '/images/logo.png',
            originalPrice: Number(product.price),
            oldPrice: product.offer_price,
            badge: product.discount_percentage > 0 ? `${product.discount_percentage}%` : undefined,
          }))}
        />
      </div>
    </section>
  );
};
