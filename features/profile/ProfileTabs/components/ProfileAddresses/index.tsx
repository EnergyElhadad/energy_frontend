'use client';

import React from 'react';
import { ProfileAddressCard } from './components/ProfileAddressCard';
import { ProfileTilte } from '../ProfileTilte';
import { useAddresses } from '@/features/addresses/hooks/useAddresses';
import { Address } from '@/features/addresses/services/address';
import { AddAddressModal } from '@/features/addresses/components/AddAddressModal';
import { EditAddressModal } from '@/features/addresses/components/EditAddressModal';
import { useDeleteAddress } from '@/features/addresses/hooks/useDeleteAddress';

import { useState } from 'react';
import { DeleteAddressDialog } from '@/features/addresses/components/DeleteAddressDialog';

export const ProfileAddresses = () => {
  const { addresses, isLoading } = useAddresses();
  const { mutate: deleteAddress, isPending: isDeleting } = useDeleteAddress();
  const [addressToDelete, setAddressToDelete] = useState<number | null>(null);
  const [addressToEdit, setAddressToEdit] = useState<number | null>(null);

  const [mainAddressId, setMainAddressId] = React.useState<number | null>(null);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleDeleteConfirm = () => {
    if (addressToDelete) {
      deleteAddress(addressToDelete, {
        onSuccess: () => {
          setAddressToDelete(null);
        },
      });
    }
  };

  return (
    <>
      <ProfileTilte title="العناوين" />
      <div className="flex flex-col gap-2">
        {addresses.map((address: Address) => (
          <ProfileAddressCard
            key={address.id}
            address={`${address.city.name}, ${address.area}, ${address.street}, ${address.building}, ${address.apartment}`}
            phone={'01000000000'} // Placeholder
            onClick={() => setMainAddressId(address.id)}
            onDelete={() => setAddressToDelete(address.id)}
            onEdit={() => setAddressToEdit(address.id)}
            isMainAddress={mainAddressId === address.id}
          />
        ))}
        {addresses.length === 0 && <div className="py-4 text-center">لا توجد عناوين محفوظة</div>}
      </div>
      <AddAddressModal />
      {!!addressToEdit && <EditAddressModal open={!!addressToEdit} addressId={addressToEdit} onOpenChange={open => !open && setAddressToEdit(null)} />}
      <DeleteAddressDialog open={!!addressToDelete} onOpenChange={open => !open && setAddressToDelete(null)} onConfirm={handleDeleteConfirm} isPending={isDeleting} />
    </>
  );
};
