"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getCategories } from "@/shared/services/categories";
import { Category } from "@/shared/types/category";

interface CategoriesResponse {
  result: Category[];
  status: boolean;
  message: string;
  next: string | null;
  prev: string | null;
  current_page: number;
  num_pages: number;
  count: number;
}

export const useInfiniteCategories = (
  initialData: CategoriesResponse | null,
) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["categories"],
      queryFn: ({ pageParam }) => getCategories(pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage: CategoriesResponse) => {
        if (lastPage.current_page < lastPage.num_pages) {
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

  const categories = useMemo(() => {
    const allCategories: Category[] =
      data?.pages.flatMap((page) => page?.result || []) || [];

    return allCategories;
  }, [data]);

  return {
    categories,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
