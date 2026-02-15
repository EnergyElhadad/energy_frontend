import React from 'react';

import { useInfiniteCategories } from '@/shared/hooks/useInfiniteCategories';
import { CategoriesResponse } from '@/shared/services/categories';
import { useSearchParams } from 'next/navigation';
import { RadioGroup } from '@/shared/components/ui/radio-group';
import { RadioGroupItem } from '@/shared/components/ui/radio-group';
import { Label } from '@/shared/components/ui/label';

interface CategoryFilterProps {
  handleCategoryToggle?: (id: string, name: string) => void;
  initialCategories: CategoriesResponse;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ handleCategoryToggle, initialCategories }) => {
  const { categories, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteCategories(initialCategories);

  const searchParams = useSearchParams();
  const selectedCategoryId = searchParams.get('categoryId') || 'all';

  return (
    <div className="space-y-2">
      <RadioGroup
        value={selectedCategoryId}
        onValueChange={value => {
          if (value === 'all') {
            handleCategoryToggle?.('', '');
          } else {
            const category = categories.find(c => c.id.toString() === value);
            if (category) {
              handleCategoryToggle?.(category.id.toString(), category.name);
            }
          }
        }}
        className="w-full"
      >
        <div className="flex items-center gap-2">
          <RadioGroupItem value="all" id="rall" className="peer size-4.5" />
          <Label htmlFor="rall" className="peer-data-[state=checked]:text-gray600 text-gray400 cursor-pointer text-sm">
            الكل
          </Label>
        </div>

        {categories.map(category => (
          <div key={category.id} className="flex items-center gap-2">
            <RadioGroupItem value={category.id.toString()} id={`r${category.id}`} className="peer size-4.5" />
            <Label htmlFor={`r${category.id}`} className="peer-data-[state=checked]:text-gray600 text-gray400 cursor-pointer text-sm">
              {category.name}
            </Label>
          </div>
        ))}
      </RadioGroup>

      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage} className="text-primary mt-2 text-sm hover:text-green-700 disabled:opacity-50">
          {isFetchingNextPage ? 'جاري التحميل...' : 'عرض المزيد'}
        </button>
      )}
    </div>
  );
};
