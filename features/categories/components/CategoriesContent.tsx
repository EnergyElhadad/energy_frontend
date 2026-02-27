'use client';

import { CategoryCard } from './CategoryCard';
import { Button } from '@/shared/components/ui/Button';
import { Spinner } from '@/shared/components/ui/spinner';
import { Display } from '@/shared/components/layout/Display';
import { useInfiniteCategories } from '@/shared/hooks/useInfiniteCategories';
import { CategoriesResponse } from '@/shared/services/categories';

interface CategoriesContentProps {
  initialCategories: CategoriesResponse | null;
}

export const CategoriesContent = ({ initialCategories }: CategoriesContentProps) => {
  const { categories, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteCategories(initialCategories);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 gap-4 min-[1250px]:grid-cols-5 md:grid-cols-4 lg:grid-cols-6">
        {categories.map(category => (
          <CategoryCard key={category.id} id={category.id} name={category.name} image={category.image || ''} />
        ))}
      </div>

      <Display when={Boolean(hasNextPage)}>
        <div className="mt-4 flex justify-center">
          <Button variant="outline" onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage && <Spinner />}
            <span>عرض المزيد</span>
          </Button>
        </div>
      </Display>
    </div>
  );
};
