'use client';

import { useCart } from '@/features/shopingCart/hooks/useCart';
import { usePromoCode } from '@/features/shopingCart/hooks/usePromoCode';
import React, { useState } from 'react';
import { CheckoutSummaryOrderCard } from './components/CheckoutSummaryOrderCard';
import { NetCode } from './components/NetCode';
import { Total } from './components/Total';
import { Tax } from './components/Tax';
import { PayMethod } from './components/PayMethod';
import { Button } from '@/shared/components/ui/Button';

interface CheckoutSummaryOrderProps {
  selectedPaymentId: number | null;
  onSelectPayment: (id: number) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export const CheckoutSummaryOrder = ({ selectedPaymentId, onSelectPayment, onSubmit, isSubmitting }: CheckoutSummaryOrderProps) => {
  const { items, cartTotal, discountBreakdown } = useCart();
  const { applyPromo, isPending } = usePromoCode();
  const [promoCode, setPromoCode] = useState('');

  const isPromoApplied = !!discountBreakdown?.promo_code;
  const appliedPromoCode = discountBreakdown?.promo_code || '';

  const handleApplyPromo = () => {
    if (!promoCode) return;
    applyPromo({ code: promoCode });
  };

  const finalPrice = discountBreakdown ? parseFloat(discountBreakdown.final_total) : cartTotal;
  const discountAmount = discountBreakdown ? parseFloat(discountBreakdown.total_savings) : 0;

  return (
    <>
      <h3 className="mb-6 text-base font-bold text-black">ملخص الطلب</h3>
      <div className="flex flex-col gap-2">
        <div className="bg-Background flex flex-col gap-4 rounded-md p-4">
          <h4 className="text-[#000000]">المنتجات</h4>

          {items.map(product => (
            <CheckoutSummaryOrderCard key={product.id} title={product.title} imageUrl={product.image} price={product.itemTotal || product.price} />
          ))}
        </div>
        <div className="bg-Background flex items-center justify-between gap-4 rounded-md p-4">
          <h5 className="text-gray400 text-base font-normal">التوصيل</h5>
          <p className="text-gray400 text-base font-normal">{0} ج</p>
        </div>
        <div className="bg-Background rounded-md p-4">
          <NetCode
            label="هل لديك كود خصم"
            placeholder="أدخل كود الخصم "
            buttonTitle={isPending ? 'جاري...' : isPromoApplied ? 'تم الخصم' : 'إضافة'}
            value={isPromoApplied ? appliedPromoCode : promoCode}
            onChange={e => !isPromoApplied && setPromoCode(e.target.value)}
            onClick={handleApplyPromo}
            isLoading={isPending}
            disabled={isPromoApplied}
          />
          {discountAmount > 0 && (
            <div className="mt-4 flex items-center justify-between gap-1">
              <h5 className="text-Alert text-base font-bold">الخصم</h5>
              <p className="text-Alert text-base font-bold">{discountAmount} ج</p>
            </div>
          )}
        </div>

        <div className="bg-Background rounded-md p-4">
          <Total title="الإجمالي" price={finalPrice} />
          <Tax title="الأسعار شاملة الضريبة" />
        </div>
        <PayMethod selectedPaymentId={selectedPaymentId} onSelectPayment={onSelectPayment} />
        <Button onClick={onSubmit} disabled={isSubmitting} className="h-12 rounded-sm text-base font-semibold text-white sm:h-15.5">
          {isSubmitting ? 'جاري الطلب...' : 'تأكيد الطلب'}
        </Button>
      </div>
    </>
  );
};
