'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { getProducts } from '../services/getProducts';
import { ProductsResponse } from '../types/productsResponse';
import { useMemo } from 'react';
import { Product } from '@/shared/types/product';
import { ProductsQueryParams } from '../types/productsQueryParams';

export const useInfiniteProducts = (filters: ProductsQueryParams, initialData: ProductsResponse | null) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching, isLoading } = useInfiniteQuery({
    queryKey: ['products', filters],
    queryFn: async ({ pageParam }) => {
      return getProducts({ ...filters, page: pageParam });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: ProductsResponse, _allPages, lastPageParam) => {
      const currentPage = lastPageParam as number;
      if (currentPage < lastPage.num_pages) {
        return currentPage + 1;
      }
      return undefined;
    },
    initialData: initialData
      ? {
          pages: [initialData],
          pageParams: [1],
        }
      : undefined,
    staleTime: 60 * 1000,
  });

  const products = useMemo(() => {
    const allProducts: Product[] = data?.pages.flatMap(page => page?.result || []) || [];

    return allProducts;
  }, [data]);

  return {
    products,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isLoading,
    totalCount: data?.pages?.[0]?.count ?? 0,
  };
};
