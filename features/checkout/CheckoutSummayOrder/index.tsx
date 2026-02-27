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
import { useOrderSummary } from '../hooks/useOrderSummary';

interface CheckoutSummaryOrderProps {
  selectedPaymentId: number | null;
  onSelectPayment: (id: number) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  selectedAddressId?: number | null;
  selectedCityId?: number | null;
}

export const CheckoutSummaryOrder = ({ selectedPaymentId, onSelectPayment, onSubmit, isSubmitting, selectedAddressId, selectedCityId }: CheckoutSummaryOrderProps) => {
  const { items, discountBreakdown: cartDiscountBreakdown, cartTotal } = useCart();
  const { summary, isLoading: isSummaryLoading } = useOrderSummary({
    addressId: selectedAddressId,
    cityId: selectedCityId,
  });
  const { applyPromo, isPending } = usePromoCode();
  const [promoCode, setPromoCode] = useState('');

  const isPromoApplied = summary ? !!summary.discount_breakdown.promo_code : !!cartDiscountBreakdown?.promo_code;

  const appliedPromoCode = summary ? summary.discount_breakdown.promo_code || '' : cartDiscountBreakdown?.promo_code || '';

  const handleApplyPromo = () => {
    if (!promoCode) return;
    applyPromo({ code: promoCode });
  };

  const shippingCost = summary ? parseFloat(summary.shipping_cost) : 0;
  const discountAmount = summary ? parseFloat(summary.discount_total) : cartDiscountBreakdown ? parseFloat(cartDiscountBreakdown.total_savings) : 0;
  const totalAmount = summary ? parseFloat(summary.total_amount) : cartDiscountBreakdown?.final_total ? parseFloat(cartDiscountBreakdown.final_total) : cartTotal || 0;

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
          {isSummaryLoading ? <div className="h-5 w-16 animate-pulse rounded bg-gray-200" /> : <p className="text-gray400 text-base font-normal">{shippingCost} ج</p>}
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
          {isSummaryLoading ? <div className="mb-3 h-6 w-full animate-pulse rounded bg-gray-200 md:mb-6" /> : <Total title="الإجمالي" price={totalAmount} />}
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
