import React from 'react';
import { useTranslations } from 'next-intl';

export const Discount = ({ title, price }: { title: string; price: number }) => {
  const t = useTranslations('Products');
  return (
    <div className="mt-2 mb-4 flex items-center justify-between gap-1">
      <h4 className="text-base font-normal text-[#F45959]">{title}</h4>
      <p className="text-base font-normal text-[#F45959]">
        {price} {t('egp')}
      </p>
    </div>
  );
};
