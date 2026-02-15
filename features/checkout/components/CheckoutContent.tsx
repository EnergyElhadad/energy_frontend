'use client';

import { useState } from 'react';
import { DelivaryOrder } from '../DelivaryOrder';
import { CheckoutSummaryOrder } from '../CheckoutSummayOrder';
import { useCheckout } from '../hooks/useCheckout';
import { toast } from 'sonner';

export const CheckoutContent = () => {
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [selectedPaymentId, setSelectedPaymentId] = useState<number | null>(null);

  const { mutate: checkout, isPending } = useCheckout();

  const handleSubmit = () => {
    if (!selectedAddressId) {
      toast.error('الرجاء اختيار عنوان التوصيل');
      return;
    }

    if (!selectedPaymentId) {
      toast.error('الرجاء اختيار طريقة الدفع');
      return;
    }

    checkout({
      address_id: selectedAddressId,
      payment_method_id: selectedPaymentId,
    });
  };

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <div className="flex h-fit flex-1 flex-col gap-3 rounded-md bg-white p-6 shadow-[0_4px_12px_0_rgba(0,0,0,0.04)] sm:gap-7.25">
        <DelivaryOrder selectedAddressId={selectedAddressId} onSelectAddress={setSelectedAddressId} />
      </div>
      <div className="border-gray100 flex-1 flex-col gap-7.25 rounded-sm border bg-white p-4">
        <CheckoutSummaryOrder selectedPaymentId={selectedPaymentId} onSelectPayment={setSelectedPaymentId} onSubmit={handleSubmit} isSubmitting={isPending} />
      </div>
    </div>
  );
};
