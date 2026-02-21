'use client';

import { useFiltersContext } from '../context/FiltersContext';

export const useOrderingFilter = () => {
  const { filters, setFilter } = useFiltersContext();

  const currentOrdering = filters.ordering || 'id';

  const updateOrdering = (ordering: 'id' | '-id') => {
    setFilter('ordering', ordering);
  };

  return { currentOrdering, updateOrdering };
};
