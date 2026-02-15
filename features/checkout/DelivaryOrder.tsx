'use client';
import { AddressLocationIcon } from '@/shared/components/icons/AddressLocation';
import { NewAddressIcon } from '@/shared/components/icons/NewAddress';
import { cn } from '@/shared/utils';

import { useAddresses } from '@/features/addresses/hooks/useAddresses';
import { Address } from '@/features/addresses/services/address';
import { Link } from '@/core/i18n';

interface DelivaryOrderProps {
  selectedAddressId: number | null;
  onSelectAddress: (id: number) => void;
}

export const DelivaryOrder = ({ selectedAddressId, onSelectAddress }: DelivaryOrderProps) => {
  const { addresses, isLoading } = useAddresses();

  // Set default address when data loads
  if (addresses.length > 0 && selectedAddressId === null) {
    onSelectAddress(addresses[0].id);
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
        <div className="h-20 w-full animate-pulse rounded bg-gray-100" />
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-black"> عنوان التوصيل </h2>
      </div>

      {addresses.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-8">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-50">
            <AddressLocationIcon className="h-10 w-10 text-gray-400" />
          </div>
          <p className="font-medium text-gray-500">لا يوجد عناوين مسجلة</p>
        </div>
      ) : (
        addresses.map((address: Address) => (
          <label
            key={address.id}
            className={cn(
              'group hover:border-primary flex cursor-pointer gap-2 rounded-sm border p-2 transition-colors',
              selectedAddressId === address.id ? 'border-primary' : 'border-Stroke'
            )}
          >
            <input
              type="radio"
              name="address"
              value={address.id}
              checked={selectedAddressId === address.id}
              onChange={() => onSelectAddress(address.id)}
              className="sr-only"
            />

            <span className="group-has-[input:checked]:border-primary border-Stroke bg-Background relative flex h-5 w-5 items-center justify-center rounded-full border">
              <span className="bg-primary hidden h-3 w-3 rounded-full group-has-[input:checked]:block" />
            </span>

            <div className="flex flex-1 gap-1">
              <span className="group-has-[input:checked]:text-primary text-signalGray">
                <AddressLocationIcon />
              </span>
              <div className="flex flex-col gap-1 text-sm">
                <span className="text-WetGray text-base leading-relaxed font-bold">{address.city.name}</span>
                <span className="text-WetGray text-sm leading-relaxed font-medium">
                  {address.area}, {address.street}, {address.building}, {address.apartment}
                </span>
                {address.notes && <span className="text-xs text-gray-400">{address.notes}</span>}
              </div>
            </div>
          </label>
        ))
      )}

      <Link
        href="/profile/addresses"
        className="bg-primary hover:bg-primary/80 flex h-11.75 w-fit items-center justify-center gap-4 rounded-sm px-3 text-sm font-medium text-white"
      >
        <NewAddressIcon />
        إضافة عنوان جديد
      </Link>
    </>
  );
};
