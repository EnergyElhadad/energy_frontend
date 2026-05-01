'use client';

import { useFiltersContext } from '../context/FiltersContext';

export const useOrderingFilter = () => {
  const { filters, setFilter } = useFiltersContext();

  const currentOrdering = filters.ordering || 'price';

  const updateOrdering = (ordering: 'price' | '-price') => {
    setFilter('ordering', ordering);
  };

  return { currentOrdering, updateOrdering };
};
