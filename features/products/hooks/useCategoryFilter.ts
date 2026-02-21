'use client';

import { useFiltersContext } from '../context/FiltersContext';

export const useCategoryFilter = () => {
  const { filters, setFilters } = useFiltersContext();

  const handleCategoryToggle = (id: string, name: string) => {
    if (!id || id === 'all') {
      setFilters({ categoryId: undefined, categoryName: undefined });
    } else {
      setFilters({ categoryId: id, categoryName: name });
    }
  };

  return { handleCategoryToggle, selectedCategoryId: filters.categoryId || 'all' };
};
