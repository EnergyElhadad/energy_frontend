'use client';

import { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';

export type FiltersState = {
  categoryId: string | undefined;
  categoryName: string | undefined;
  ordering: 'id' | '-id';
  min_price: string | undefined;
  max_price: string | undefined;
  search: string | undefined;
  rating: string | undefined;
  home_sections: string | undefined;
};

type FiltersContextType = {
  filters: FiltersState;
  setFilter: (key: keyof FiltersState, value: string | undefined) => void;
  setFilters: (updates: Partial<FiltersState>) => void;
};

const FiltersContext = createContext<FiltersContextType | null>(null);

export const useFiltersContext = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error('useFiltersContext must be used within a FiltersProvider');
  }
  return context;
};

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
  const searchParams = useSearchParams();

  // Initialize from URL on mount
  const [filters, setFiltersState] = useState<FiltersState>(() => ({
    categoryId: searchParams.get('categoryId') || undefined,
    categoryName: searchParams.get('categoryName') || undefined,
    ordering: (searchParams.get('ordering') as 'id' | '-id') || 'id',
    min_price: searchParams.get('min_price') || undefined,
    max_price: searchParams.get('max_price') || undefined,
    search: searchParams.get('search') || undefined,
    rating: searchParams.get('rating') || undefined,
    home_sections: searchParams.get('home_sections') || undefined,
  }));

  // Sync state → URL via replaceState (no server navigation)
  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.categoryId) {
      params.set('categoryId', filters.categoryId);
    }
    if (filters.categoryName) {
      params.set('categoryName', filters.categoryName);
    }
    if (filters.ordering && filters.ordering !== 'id') {
      params.set('ordering', filters.ordering);
    }
    if (filters.min_price) {
      params.set('min_price', filters.min_price);
    }
    if (filters.max_price) {
      params.set('max_price', filters.max_price);
    }
    if (filters.search) {
      params.set('search', filters.search);
    }
    if (filters.rating) {
      params.set('rating', filters.rating);
    }
    if (filters.home_sections) {
      params.set('home_sections', filters.home_sections);
    }

    const queryString = params.toString();
    const newUrl = queryString ? `?${queryString}` : window.location.pathname;
    window.history.replaceState(null, '', newUrl);
  }, [filters]);

  const setFilter = useCallback((key: keyof FiltersState, value: string | undefined) => {
    setFiltersState(prev => ({ ...prev, [key]: value }));
  }, []);

  const setFilters = useCallback((updates: Partial<FiltersState>) => {
    setFiltersState(prev => ({ ...prev, ...updates }));
  }, []);

  const value = useMemo(() => ({ filters, setFilter, setFilters }), [filters, setFilter, setFilters]);

  return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>;
};
