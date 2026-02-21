'use client';

import { useRef, useState } from 'react';
import { DelivaryOrder } from '../DelivaryOrder';
import { CheckoutSummaryOrder } from '../CheckoutSummayOrder';
import { useCheckout } from '../hooks/useCheckout';
import { toast } from 'sonner';
import { Display } from '@/shared/components/layout/Display';
import { useSession } from 'next-auth/react';
import { GuestCheckoutForm, GuestCheckoutFormRef } from './GuestCheckoutForm';

export const CheckoutContent = () => {
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [selectedPaymentId, setSelectedPaymentId] = useState<number | null>(null);
  const [selectedCityId, setSelectedCityId] = useState<number | null>(null);
  const guestFormRef = useRef<GuestCheckoutFormRef>(null);

  const { status: authStatus } = useSession();

  const { mutate: checkout, isPending } = useCheckout();

  const handleSubmit = async () => {
    if (!selectedPaymentId) {
      toast.error('الرجاء اختيار طريقة الدفع');
      return;
    }

    if (authStatus === 'authenticated') {
      if (!selectedAddressId) {
        toast.error('الرجاء اختيار عنوان التوصيل');
        return;
      }

      checkout({
        address_id: selectedAddressId,
        payment_method_id: selectedPaymentId,
      });
    } else {
      const guestData = await guestFormRef.current?.validate();
      if (!guestData) return;

      checkout({
        payment_method_id: selectedPaymentId,
        guest_info: {
          first_name: guestData.first_name,
          last_name: guestData.last_name,
          email: guestData.email,
          phone_number: guestData.phone_number,
        },
        guest_address: {
          city_id: Number(guestData.city_id),
          area: guestData.area,
          street: guestData.street,
          building: guestData.building,
          apartment: guestData.apartment,
          notes: guestData.notes || '',
        },
      });
    }
  };

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <div className="flex h-fit flex-1 flex-col gap-3 rounded-md bg-white p-6 shadow-[0_4px_12px_0_rgba(0,0,0,0.04)] sm:gap-7.25">
        <Display when={authStatus === 'authenticated'}>
          <DelivaryOrder selectedAddressId={selectedAddressId} onSelectAddress={setSelectedAddressId} />
        </Display>

        <Display when={authStatus === 'unauthenticated'}>
          <GuestCheckoutForm ref={guestFormRef} onCityChange={setSelectedCityId} />
        </Display>
      </div>
      <div className="border-gray100 flex-1 flex-col gap-7.25 rounded-sm border bg-white p-4">
        <CheckoutSummaryOrder
          selectedPaymentId={selectedPaymentId}
          onSelectPayment={setSelectedPaymentId}
          onSubmit={handleSubmit}
          isSubmitting={isPending}
          selectedAddressId={selectedAddressId}
          selectedCityId={selectedCityId}
        />
      </div>
    </div>
  );
};
