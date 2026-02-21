'use client';

import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/components/ui/accordion';

import { CategoryFilter } from './components/CategoryFilter';
import { PriceFilter } from './components/PriceFilter';
import { RatingFilter } from './components/RatingFilter';
import { SearchFilter } from './components/SearchFilter';

import { CategoriesResponse } from '@/shared/services/categories';
import { useSearchProduct } from '../../hooks/useSearchProduct';
import { usePriceRange } from '../../hooks/usePriceRange';
import { ResetButton } from './components/ResetButton';
import { useCategoryFilter } from '../../hooks/useCategoryFilter';
import { useFiltersContext } from '../../context/FiltersContext';
import { useQuery } from '@tanstack/react-query';
import { getRatingDistribution } from '../../services/getRatingDistribution';

interface ProductFiltersProps {
  initialCategories: CategoriesResponse;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({ initialCategories }) => {
  const { search, setSearch } = useSearchProduct();
  const { priceRange, handlePriceRangeChange, handlePriceInputChange, resetPriceRange } = usePriceRange();
  const { handleCategoryToggle } = useCategoryFilter();
  const { setFilters } = useFiltersContext();

  const { data: ratingData } = useQuery({
    queryKey: ['ratingDistribution'],
    queryFn: getRatingDistribution,
    staleTime: 5 * 60 * 1000,
  });

  const ratingOptions = React.useMemo(() => {
    const dist = ratingData?.result || {};
    const total = Object.values(dist).reduce((sum, count) => sum + count, 0);
    return [
      { label: 'الكل', stars: 0, count: total },
      { label: '5 نجوم', stars: 5, count: dist['5'] ?? 0 },
      { label: '4 نجوم', stars: 4, count: dist['4'] ?? 0 },
      { label: '3 نجوم', stars: 3, count: dist['3'] ?? 0 },
      { label: 'نجمتين', stars: 2, count: dist['2'] ?? 0 },
      { label: 'نجمة', stars: 1, count: dist['1'] ?? 0 },
    ];
  }, [ratingData]);

  const reset = () => {
    setFilters({
      categoryId: undefined,
      categoryName: undefined,
      ordering: 'id',
      min_price: undefined,
      max_price: undefined,
      search: undefined,
      rating: undefined,
    });
    resetPriceRange();
  };

  return (
    <aside className="border-Stroke w-full space-y-5 rounded-sm border bg-white p-4">
      <SearchFilter value={search} handleSearchChange={setSearch} />
      <Accordion type="multiple" className="w-full" defaultValue={['price', 'category', 'reviews']}>
        <AccordionItem value="price">
          <AccordionTrigger className="text-gray600 text-base font-medium">السعر</AccordionTrigger>
          <AccordionContent>
            <PriceFilter priceRange={priceRange} onPriceChange={handlePriceRangeChange} onPriceInputChange={handlePriceInputChange} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="category">
          <AccordionTrigger className="text-gray600 text-base font-medium">الفئة</AccordionTrigger>
          <AccordionContent>
            <CategoryFilter initialCategories={initialCategories} handleCategoryToggle={handleCategoryToggle} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="reviews">
          <AccordionTrigger className="text-gray600 text-base font-medium">التقييم</AccordionTrigger>
          <AccordionContent>
            <RatingFilter ratingOptions={ratingOptions} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <ResetButton reset={reset} />
    </aside>
  );
};
