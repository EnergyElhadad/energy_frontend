'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { ProductCard } from '@/shared/components/ProductCard';
import { Product } from '@/shared/types/product';
import { OfferModal } from '@/features/home/components/OfferModal';
import { useTranslations } from 'next-intl';

interface SimilarProductsProps {
  products: Product[];
}

export const SimilarProducts = ({ products }: SimilarProductsProps) => {
  const t = useTranslations('Products');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold text-black mb-6">
        {t('similar_products')}
      </h2>

      {products.length ? (
        <Swiper
          spaceBetween={16}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {products.map(product => (
            <SwiperSlide key={product.id}>
              <ProductCard
                id={product.id}
                title={product.name}
                image={product.images.find(img => img.is_primary)?.image || '/images/logo.png'}
                originalPrice={Number(product.offer_price)}
                category={product.category?.name}
                oldPrice={Number(product.price)}
                badge={product.discount_label}
                is_in_wishlist={product.is_in_wishlist}
                onClick={() => setSelectedProduct(product)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-gray-500 text-center">{t('no_similar_products')}</p>
      )}

      {selectedProduct && <OfferModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </section>
  );
};
