'use client';

import { HeaderSection } from '@/shared/components/ui/HeaderSection';
import { ProductCard } from '@/shared/components/ProductCard';
import { OffersSwipper } from './components/OffersSwipper';
import { Product } from '@/shared/types/product';
import { useState } from 'react';
import { OfferModal } from '../OfferModal';
import { useTranslations } from 'next-intl';

interface HomeProductsSectionProps {
  title: string;
  products: Product[];
  urlLink?: string;
}

export const HomeProductsSection = ({ title, products, urlLink }: HomeProductsSectionProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const t = useTranslations('HomePage');

  return (
    <section className="bg-Background py-16">
      <div className="container">
        <HeaderSection title={title} textlink={t('view_all')} urlLink={urlLink || '#'} />
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
              is_in_wishlist={product.is_in_wishlist}
              onClick={() => setSelectedProduct(product)}
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
            is_in_wishlist: product.is_in_wishlist,
            onClick: () => setSelectedProduct(product),
          }))}
        />
        {selectedProduct && <OfferModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      </div>
    </section>
  );
};
