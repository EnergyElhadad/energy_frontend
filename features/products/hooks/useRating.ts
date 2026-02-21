'use client';

import { useFiltersContext } from '../context/FiltersContext';

export const useRating = () => {
  const { filters, setFilter } = useFiltersContext();

  const selectedRating = Number(filters.rating) || 0;

  const handleRatingChange = (rating: number | string) => {
    const value = Number(rating);
    setFilter('rating', value > 0 ? String(value) : undefined);
  };

  return {
    selectedRating,
    handleRatingChange,
  };
};
