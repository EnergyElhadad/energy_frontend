'use client';

import { CashIcon } from '@/shared/components/icons/Cash';
import { cn } from '@/shared/utils';
import { CreditCardIcon } from 'lucide-react';
import React from 'react';
import { usePaymentMethods } from '@/features/checkout/hooks/usePaymentMethods';
import { PaymentMethod } from '@/features/checkout/services/payment';

interface PayMethodProps {
  selectedPaymentId: number | null;
  onSelectPayment: (id: number) => void;
}

export const PayMethod = ({ selectedPaymentId, onSelectPayment }: PayMethodProps) => {
  const { paymentMethods, isLoading } = usePaymentMethods();

  // Set default payment method when data loads
  React.useEffect(() => {
    if (paymentMethods.length > 0 && selectedPaymentId === null) {
      onSelectPayment(paymentMethods[0].id);
    }
  }, [paymentMethods, selectedPaymentId, onSelectPayment]);

  if (isLoading) {
    return <div className="mb-2 h-20 animate-pulse rounded-sm bg-gray-100 sm:mb-6"></div>;
  }

  return (
    <div className="mb-2 sm:mb-6">
      <h5 className="text-WetGray mt-4 mb-4 text-base font-bold">اختر طريقة الدفع</h5>

      <div className="xs:flex-row flex flex-col gap-2">
        {paymentMethods.map((method: PaymentMethod) => (
          <label
            key={method.id}
            className={cn(
              'group hover:border-primary flex flex-1 cursor-pointer gap-2 rounded-sm border px-2 py-2.75 transition-colors',
              selectedPaymentId === method.id ? 'border-primary' : 'border-Stroke'
            )}
          >
            <input
              type="radio"
              name="payMethod"
              value={method.id}
              checked={selectedPaymentId === method.id}
              onChange={() => onSelectPayment(method.id)}
              className="sr-only"
            />

            <span className="group-has-[input:checked]:border-primary border-Stroke bg-Background relative flex h-5 w-5 items-center justify-center rounded-full border">
              <span className="bg-primary hidden h-3 w-3 rounded-full group-has-[input:checked]:block" />
            </span>

            <div className="flex flex-1 items-center gap-1">
              <span className="group-has-[input:checked]:text-primary text-signalGray">{method.id === 1 ? <CashIcon /> : <CreditCardIcon />}</span>
              <span className="text-WetGray shrink-0 text-sm font-medium">{method.name}</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};
