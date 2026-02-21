'use client';

import { useState, useCallback, useEffect } from 'react';
import { useFiltersContext } from '../context/FiltersContext';
import { useDebounce } from '@/shared/hooks/useDebounce';

export const useSearchProduct = () => {
  const { filters, setFilter } = useFiltersContext();

  const [search, setSearchLocal] = useState(filters.search ?? '');
  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    setFilter('search', debouncedSearch || undefined);
  }, [debouncedSearch, setFilter]);

  const setSearch = useCallback((value: string) => {
    setSearchLocal(value);
  }, []);

  return {
    search,
    setSearch,
  };
};
