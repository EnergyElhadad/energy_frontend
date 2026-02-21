'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getWishlistProducts, WishlistProduct } from '@/shared/services/wishlist';
import { useSession } from 'next-auth/react';

export interface WishlistItemMapped {
  id: number;
  title: string;
  category: string;
  image: string;
  price: number;
}

const mapProduct = (p: WishlistProduct): WishlistItemMapped => ({
  id: p.id,
  title: p.name,
  category: p.category?.name || '',
  image: p.images?.find(img => img.is_primary)?.image || p.images?.[0]?.image || '/images/products/product-placeholder.webp',
  price: p.offer_price ?? Number(p.price),
});

export const useWishlist = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['wishlistProducts'],
    queryFn: () => getWishlistProducts({ page_size: 10 }),
    enabled: !!session?.user,
    staleTime: 30 * 1000,
  });

  const items: WishlistItemMapped[] = (data?.result || []).map(mapProduct);
  const count = data?.count ?? 0;

  const removeItem = (id: string | number) => {
    // Optimistically remove from the cached query data
    queryClient.setQueryData(['wishlistProducts'], (old: typeof data) => {
      if (!old) return old;
      return {
        ...old,
        count: old.count - 1,
        result: old.result.filter(p => p.id !== Number(id)),
      };
    });
  };

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['wishlistProducts'] });
  };

  return {
    items,
    count,
    isLoading,
    removeItem,
    invalidate,
  };
};
