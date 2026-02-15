"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getProducts } from "../services/getProducts";
import { ProductsResponse } from "../types/productsResponse";
import { useMemo } from "react";
import { Product } from "@/shared/types/product";
import { ProductsQueryParams } from "../types/productsQueryParams";

export const useInfiniteProducts = (filters: ProductsQueryParams,initialData: ProductsResponse | null) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage,
  isFetching, } =
    useInfiniteQuery({

      queryKey: ["products",filters],
      queryFn: ({ pageParam }) => getProducts({...filters, page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage: ProductsResponse) => {
        if (lastPage.next && lastPage.current_page < lastPage.num_pages) {
          return lastPage.current_page + 1;
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
    const allProducts: Product[] =
      data?.pages.flatMap((page) => page?.result || []) || [];

    return allProducts;
  }, [data]);


  

  return {
    products,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    totalCount: initialData?.count || 0,
  };
};
