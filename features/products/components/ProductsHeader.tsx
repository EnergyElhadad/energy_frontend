'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/shared/components/ui/dropdown-menu';
import { ArrowDownIcon } from '@/shared/components/icons/ArrowDown';
import { useLocale } from 'next-intl';
import { useOrderingFilter } from '../hooks/useOrderingFilter';

export const ProductsHeader = ({ productsLength, title }: { productsLength: number; title: string | null }) => {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const { currentOrdering, updateOrdering } = useOrderingFilter();

  return (
    <div className="flex items-center justify-between">
      {/* Title */}
      <div className="mb-8 space-x-2">
        <h2 className="text-2xl font-semibold text-black">{title}</h2>
        <p className="text-primary mt-2 text-sm font-normal">
          <span>{productsLength} </span> منتج
        </p>
      </div>

      {/* Ordering Dropdown */}
      <DropdownMenu dir={isRTL ? 'rtl' : 'ltr'}>
        <DropdownMenuTrigger>
          <div className="text-WetGray border-Stroke hover:bg-primary flex h-10.5 w-fit items-center justify-center gap-1 rounded-sm border bg-white px-2 text-sm font-medium hover:border-none hover:text-white">
            ترتيب حسب <ArrowDownIcon />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => updateOrdering('id')}
            className={`hover:bg-primary! h-11.5 px-3 hover:text-white! ${currentOrdering === 'id' ? 'bg-primary text-white' : ''}`}
          >
            تصاعدي
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => updateOrdering('-id')}
            className={`hover:bg-primary! h-11.5 px-3 hover:text-white! ${currentOrdering === '-id' ? 'bg-primary text-white' : ''}`}
          >
            تنازلي
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
