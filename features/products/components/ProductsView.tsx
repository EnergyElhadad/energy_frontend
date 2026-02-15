'use client';
import { Display } from '@/shared/components/layout/Display';
import { ProductCard } from '@/shared/components/ProductCard';
import { Button } from '@/shared/components/ui/Button';
import { Spinner } from '@/shared/components/ui/spinner';
import { Product } from '@/shared/types/product';
import { useInfiniteProducts } from '../hooks/useInfiniteProducts';
import { useProductsView } from '../hooks/useProductsView';
import { ProductsResponse } from '../types/productsResponse';
import { ProductGrid } from './ProductGrid';
import { ProductsHeader } from './ProductsHeader';
import { OfferModal } from '@/features/home/components/OfferModal';
import { useState } from 'react';

interface ProductsViewProps {
  initialData: ProductsResponse | null;
  categeoryDescription: string | null;
}

export const ProductsView = ({ initialData, categeoryDescription }: ProductsViewProps) => {
  const { filters, shouldUseInitialData } = useProductsView();
  const { products, fetchNextPage, hasNextPage, isFetchingNextPage, totalCount, isFetching } = useInfiniteProducts(filters, shouldUseInitialData ? initialData : null);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  if (isFetching) {
    return (
      <div className="flex w-full items-center justify-center md:col-span-3">
        <Spinner className="text-primary h-12 w-12" />
      </div>
    );
  }

  return (
    <div className="md:col-span-3">
      <ProductsHeader productsLength={totalCount} title={categeoryDescription} />

      <ProductGrid<Product>
        items={products}
        renderItem={product => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.name}
            image={product.images?.[0]?.image || ''}
            originalPrice={Number(product.price)}
            category={product.category?.name}
            oldPrice={product.discount_percentage ? Number(product.price) - (Number(product.price) * Number(product.discount_percentage)) / 100 : undefined}
            badge={product.discount_label}
            onClick={() => setSelectedProduct(product)}
          />
        )}
      />

      {selectedProduct && <OfferModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      <Display when={hasNextPage}>
        <Button variant="outline" onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage && <Spinner />}
          <span>عرض المزيد</span>
        </Button>
      </Display>
    </div>
  );
};
