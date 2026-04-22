'use client';

import { useTranslations } from 'next-intl';
import { useFiltersContext } from '../context/FiltersContext';
import { Breadcrumb } from '@/shared/components/layout/Breadcrumb';

export const ProductsBreadcrumb = () => {
  const { filters } = useFiltersContext();
  const commonT = useTranslations('Header');

  const breadcrumbItems = [
    { label: commonT('home'), href: '/' },
    ...(filters.categoryId && filters.categoryName
      ? [
          {
            label: filters.categoryName,
            href: `/products?categoryId=${filters.categoryId}&categoryName=${filters.categoryName}`,
          },
        ]
      : [{ label: commonT('all_products'), href: '/products' }]),
  ];

  return <Breadcrumb className="py-5" items={breadcrumbItems} />;
};
