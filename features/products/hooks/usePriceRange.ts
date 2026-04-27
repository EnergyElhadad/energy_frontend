'use client';

import { useFiltersContext } from '../context/FiltersContext';
import { useState, useEffect } from 'react';
import { useDebounce } from '@/shared/hooks/useDebounce';

export const usePriceRange = () => {
  const { filters, setFilters } = useFiltersContext();

  const minFromContext = Number(filters.min_price) || 0;
  const maxFromContext = Number(filters.max_price) || 1000000;

  const [priceRange, setPriceRange] = useState<[number, number]>([minFromContext, maxFromContext]);

  const debouncedMin = useDebounce(priceRange[0], 400);
  const debouncedMax = useDebounce(priceRange[1], 400);

  useEffect(() => {
    setFilters({
      min_price: debouncedMin > 0 ? String(debouncedMin) : undefined,
      max_price: debouncedMax < 1000000 ? String(debouncedMax) : undefined,
    });
  }, [debouncedMin, debouncedMax, setFilters]);

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  const handlePriceInputChange = (type: 'min' | 'max', value: number) => {
    setPriceRange(prev => {
      const range: [number, number] = [...prev];
      if (type === 'min') {
        range[0] = Math.min(value, range[1]);
      } else {
        range[1] = Math.max(value, range[0]);
      }
      return range;
    });
  };

  const resetPriceRange = () => {
    setPriceRange([0, 1000000]);
    setFilters({ min_price: undefined, max_price: undefined });
  };

  return {
    priceRange,
    resetPriceRange,
    handlePriceRangeChange,
    handlePriceInputChange,
  };
};
