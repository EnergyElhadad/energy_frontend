import React from 'react';
import { useTranslations } from 'next-intl';

export const EmptyProducts = () => {
  const t = useTranslations('Products');
  return (
    <div className="col-span-full flex items-center justify-center">
      <p className="text-lg text-gray-500">{t('no_products')}</p>
    </div>
  );
};
