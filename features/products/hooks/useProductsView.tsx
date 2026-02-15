import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export const useProductsView = () => {
  const searchParams = useSearchParams();
  const orderingParam = searchParams.get('ordering');
  const categoryId = searchParams.get('categoryId');
  const minPrice = searchParams.get('min_price');
  const maxPrice = searchParams.get('max_price');
  const search = searchParams.get('search');

  const filters = useMemo(
    () => ({
      category: categoryId ? Number(categoryId) : undefined,
      ordering: (orderingParam as 'id' | '-id') || 'id',
      min_price: minPrice ? Number(minPrice) : undefined,
      max_price: maxPrice ? Number(maxPrice) : undefined,
      search: search || undefined,
    }),
    [categoryId, minPrice, maxPrice, search, orderingParam]
  );

  const shouldUseInitialData = !categoryId && !minPrice && !maxPrice && !orderingParam && !search;
  return {
    filters,
    shouldUseInitialData,
  };
};
