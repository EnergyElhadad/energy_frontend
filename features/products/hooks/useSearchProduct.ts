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

  // Sync context → local state when filters.search is cleared externally (e.g. reset button)
  useEffect(() => {
    const contextSearch = filters.search ?? '';
    if (contextSearch !== search) {
      setSearchLocal(contextSearch);
    }
    // Only react to context changes, not local state changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.search]);

  const setSearch = useCallback((value: string) => {
    setSearchLocal(value);
  }, []);

  return {
    search,
    setSearch,
  };
};
