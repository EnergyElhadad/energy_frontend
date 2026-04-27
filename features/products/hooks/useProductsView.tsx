'use client';

import { useMemo } from 'react';
import { useFiltersContext } from '../context/FiltersContext';

export const useProductsView = () => {
  const { filters: contextFilters } = useFiltersContext();

  const filters = useMemo(
    () => ({
      category: contextFilters.categoryId ? Number(contextFilters.categoryId) : undefined,
      ordering: contextFilters.ordering || ('id' as 'id' | '-id'),
      min_price: contextFilters.min_price ? Number(contextFilters.min_price) : undefined,
      max_price: contextFilters.max_price ? Number(contextFilters.max_price) : undefined,
      search: contextFilters.search || undefined,
      rating: contextFilters.rating ? Number(contextFilters.rating) : undefined,
      home_sections: contextFilters.home_sections ? Number(contextFilters.home_sections) : undefined,
    }),
    [contextFilters]
  );

  const shouldUseInitialData =
    !contextFilters.categoryId &&
    !contextFilters.min_price &&
    !contextFilters.max_price &&
    !contextFilters.ordering?.replace('id', '') &&
    !contextFilters.search &&
    !contextFilters.rating &&
    !contextFilters.home_sections;

  return {
    filters,
    shouldUseInitialData,
  };
};
