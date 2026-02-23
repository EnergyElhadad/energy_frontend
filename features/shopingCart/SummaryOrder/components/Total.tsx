import React from 'react';
import { useTranslations } from 'next-intl';

export const Total = ({ title, price }: { title: string; price: number }) => {
  const t = useTranslations('Products');
  return (
    <div className="mt-2.5 mb-1 flex items-center justify-between gap-1">
      <h5 className="text-WetGray text-base font-bold">{title}</h5>
      <p className="text-WetGray text-base font-bold">
        {' '}
        {price} {t('egp')}
      </p>
    </div>
  );
};
