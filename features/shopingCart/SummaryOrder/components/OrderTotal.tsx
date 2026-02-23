import React from 'react';
import { useTranslations } from 'next-intl';

export const OrderTotal = ({ title, price }: { title: string; price: number }) => {
  const t = useTranslations('Products');
  return (
    <div className="mb-4 flex items-center justify-between gap-1">
      <h4 className="text-gray400 text-base font-normal">{title}</h4>
      <p className="text-gray400 text-base font-normal">
        {price} {t('egp')}
      </p>
    </div>
  );
};
