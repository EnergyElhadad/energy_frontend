'use client';

import React, { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import { getWishlistProducts, WishlistProduct, WishlistProductsResponse } from '@/shared/services/wishlist';
import { ProductCard } from '@/shared/components/ProductCard';
import { ProductCardSkeleton } from '@/shared/components/skeletons/ProductCardSkeleton';
import { useDebounce } from '@/shared/hooks/useDebounce';

const FALLBACK_IMAGE = '/images/products/01.webp';

const getPrimaryImage = (images: WishlistProduct['images']) => {
  const primary = images?.find(img => img.is_primary);
  return primary?.image || images?.[0]?.image || FALLBACK_IMAGE;
};

interface WishlistContentProps {
  initialData: WishlistProductsResponse | null;
}

export const WishlistContent = ({ initialData }: WishlistContentProps) => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 400);

  const shouldUseInitialData = !debouncedSearch;

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['wishlistPage', debouncedSearch],
    queryFn: ({ pageParam = 1 }) =>
      getWishlistProducts({
        page: pageParam,
        page_size: 12,
        ...(debouncedSearch ? { search: debouncedSearch } : {}),
      }),
    getNextPageParam: lastPage => {
      if (lastPage.current_page < lastPage.num_pages) {
        return lastPage.current_page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    initialData: shouldUseInitialData && initialData ? { pages: [initialData], pageParams: [1] } : undefined,
  });

  const products = data?.pages.flatMap(page => page.result) || [];
  const totalCount = data?.pages?.[0]?.count ?? initialData?.count ?? 0;

  return (
    <div>
      {/* Header with count and search */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-gray600 text-xl font-bold">
          المفضلة <span className="text-signalGray text-base font-normal">({totalCount} منتج)</span>
        </h1>

        <div className="group border-signalGray hover:border-primary focus-within:border-primary flex h-10 w-full items-center rounded-lg border bg-white px-3 py-2 transition-colors sm:max-w-xs">
          <Search className="text-signalGray group-focus-within:text-primary me-3 h-5 w-5 shrink-0 transition-colors" />
          <input
            type="text"
            placeholder="ابحث في المفضلة"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="caret-primary text-signalGray placeholder-signalGray flex-1 bg-transparent text-right text-sm outline-none"
          />
        </div>
      </div>

      {/* Products Grid */}
      {isLoading && !initialData ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : products.length === 0 && !isFetching ? (
        <div className="py-20 text-center">
          <p className="text-signalGray text-lg">لا توجد منتجات في المفضلة</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {products.map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.name}
                image={getPrimaryImage(product.images)}
                originalPrice={product.offer_price ?? Number(product.price)}
                oldPrice={product.discount_percentage > 0 ? Number(product.price) : undefined}
                badge={product.discount_label || undefined}
                category={product.category?.name}
                is_in_wishlist={true}
              />
            ))}
          </div>

          {hasNextPage && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="border-primary text-primary hover:bg-primary rounded-lg border px-8 py-2.5 text-sm font-semibold transition hover:text-white disabled:opacity-50"
              >
                {isFetchingNextPage ? 'جاري التحميل...' : 'عرض المزيد'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
