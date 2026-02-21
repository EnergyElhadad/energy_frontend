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
import { ProductCardSkeleton } from '@/shared/components/skeletons/ProductCardSkeleton';
import { useFiltersContext } from '../context/FiltersContext';

interface ProductsViewProps {
  initialData: ProductsResponse | null;
  categeoryDescription: string | null;
  onOpenFilters?: () => void;
}

export const ProductsView = ({ initialData, categeoryDescription, onOpenFilters }: ProductsViewProps) => {
  const { filters, shouldUseInitialData } = useProductsView();
  const { products, fetchNextPage, hasNextPage, isFetchingNextPage, totalCount, isLoading } = useInfiniteProducts(filters, shouldUseInitialData ? initialData : null);
  const { filters: contextFilters } = useFiltersContext();

  const activeTitle = contextFilters.categoryName || categeoryDescription;
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  if (isLoading) {
    return (
      <div className="min-[769px]:col-span-3">
        <ProductsHeader productsLength={totalCount} title={activeTitle} onOpenFilters={onOpenFilters} />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-[769px]:col-span-3">
      <ProductsHeader productsLength={totalCount} title={activeTitle} onOpenFilters={onOpenFilters} />

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
            is_in_wishlist={product.is_in_wishlist}
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
