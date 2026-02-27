'use client';

import Counter from '@/shared/components/ui/Counter';
import { CounterProps } from '@/shared/components/ui/Counter/Counter';
import { useTranslations } from 'next-intl';
import React from 'react';
import { toast } from 'sonner';

interface ProductCounterProps extends CounterProps {
  price: number;
}

export const ProductCounter: React.FC<ProductCounterProps> = ({ value, price, onChange, ...props }) => {
  const t = useTranslations('SingleProduct');

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h4 className="text-base font-bold">{t('select_quantity')}</h4>
        <Counter {...props} value={value} onChange={onChange} onLimitReached={() => toast.error(t('stock_limit_reached'))} />
      </div>

      <span className="text-2xl font-semibold text-black">
        {(price * (value || 0)).toFixed(2)}
        <span className="ms-2">{t('currency')}</span>
      </span>
    </div>
  );
};
