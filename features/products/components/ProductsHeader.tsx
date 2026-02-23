'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/shared/components/ui/dropdown-menu';
import { ArrowDownIcon } from '@/shared/components/icons/ArrowDown';
import { useLocale } from 'next-intl';
import { useOrderingFilter } from '../hooks/useOrderingFilter';
import { SlidersHorizontal } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ProductsHeaderProps {
  productsLength: number;
  title: string | null;
  onOpenFilters?: () => void;
}

export const ProductsHeader = ({ productsLength, title, onOpenFilters }: ProductsHeaderProps) => {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const t = useTranslations('Products');

  const { currentOrdering, updateOrdering } = useOrderingFilter();

  return (
    <div className="flex items-center justify-between">
      {/* Title */}
      <div className="mb-8 space-x-2">
        <h2 className="text-2xl font-semibold text-black">{title}</h2>
        <p className="text-primary mt-2 text-sm font-normal">
          <span>{productsLength} </span> {t('product_singular')}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Filter Button — mobile/tablet only */}
        {onOpenFilters && (
          <button
            onClick={onOpenFilters}
            className="text-WetGray border-Stroke hover:bg-primary flex h-10.5 items-center justify-center gap-1 rounded-sm border bg-white px-2 text-sm font-medium hover:border-none hover:text-white min-[769px]:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" />
            {t('filters')}
          </button>
        )}

        {/* Ordering Dropdown */}
        <DropdownMenu dir={isRTL ? 'rtl' : 'ltr'}>
          <DropdownMenuTrigger>
            <div className="text-WetGray border-Stroke hover:bg-primary flex h-10.5 w-fit items-center justify-center gap-1 rounded-sm border bg-white px-2 text-sm font-medium hover:border-none hover:text-white">
              {t('sort_by')} <ArrowDownIcon />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => updateOrdering('id')}
              className={`hover:bg-primary! h-11.5 px-3 hover:text-white! ${currentOrdering === 'id' ? 'bg-primary text-white' : ''}`}
            >
              {t('ascending')}
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => updateOrdering('-id')}
              className={`hover:bg-primary! h-11.5 px-3 hover:text-white! ${currentOrdering === '-id' ? 'bg-primary text-white' : ''}`}
            >
              {t('descending')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
