'use client';
import { useTranslations } from 'next-intl';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { SummaryTitle } from './components/SummaryTitle';
import { Total } from './components/Total';
import { NetCode } from './components/NetCode';
import { OrderTotal } from './components/OrderTotal';
import { Tax } from './components/Tax';

import { useState } from 'react';
import { usePromoCode } from '../hooks/usePromoCode';
import { useCart } from '../hooks/useCart';
import { Discount } from './components/Discount';
import { Link } from '@/core/i18n';

interface SummaryOrderProps {
  total: number;
  itemsCount: number;
}

export const SummaryOrder = ({ total: initialTotal, itemsCount: initialCount }: SummaryOrderProps) => {
  const [code, setCode] = useState('');
  const { applyPromo, isPending } = usePromoCode();
  const { cartTotal, count, discountBreakdown } = useCart();
  const t = useTranslations('Cart');

  const isPromoApplied = !!discountBreakdown?.promo_code;

  const displayTotal = cartTotal || initialTotal;
  const displayCount = count || initialCount;

  return (
    <div className="border-gray100 mx-auto w-full max-w-sm rounded-sm border bg-white p-4">
      <SummaryTitle title={t('order_summary')} />
      <OrderTotal
        title={t('total_products', { count: displayCount })}
        price={discountBreakdown?.original_total ? parseFloat(discountBreakdown.original_total) : displayTotal}
      />

      <NetCode
        label={t('have_promo')}
        placeholder={t('enter_promo')}
        buttonTitle={isPending ? t('applying') : isPromoApplied ? t('applied') : t('apply')}
        value={isPromoApplied && discountBreakdown?.promo_code ? discountBreakdown.promo_code : code}
        onChange={e => !isPromoApplied && setCode(e.target.value)}
        onClick={() => !isPromoApplied && applyPromo({ code })}
        disabled={isPromoApplied}
      />

      {discountBreakdown?.promo_discount && parseFloat(discountBreakdown.promo_discount) > 0 && (
        <Discount title={t('discount')} price={parseFloat(discountBreakdown.promo_discount)} />
      )}

      <Separator className="bg-gray100 my-4 h-px" />
      <Total title={t('total')} price={discountBreakdown?.final_total ? parseFloat(discountBreakdown.final_total) : displayTotal} />
      <Tax title={t('tax_included')} />
      <Link href="/cart/checkout" className="bg-primary mt-4 flex h-15.5 w-full items-center justify-center rounded-sm text-white">
        {t('checkout')}
      </Link>
    </div>
  );
};
