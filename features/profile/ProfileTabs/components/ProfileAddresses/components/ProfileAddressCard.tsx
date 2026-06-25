'use client';

import { Button } from '@/shared/components/ui/Button';
import React from 'react';
import { useTranslations } from 'next-intl';

type ProfileAddressCardProps = {
  name?: string;
  address: string;
  phone: number | string;
  onClick?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
  isMainAddress: boolean;
  isEditing?: boolean;
};

export const ProfileAddressCard: React.FC<ProfileAddressCardProps> = ({ name, address, phone, onClick, onDelete, onEdit, isMainAddress, isEditing }) => {
  const t = useTranslations('Profile');
  return (
    <div className="border-signalGray flex flex-col justify-between gap-x-1 gap-y-3 rounded-md border px-6 py-4 md:flex-row">
      <div>
        {isMainAddress && <h3 className="text-primary mb-2 text-sm font-semibold">{t('main_address')}</h3>}
        {name && <h4 className="text-WetGray mb-2 text-base font-bold">{name}</h4>}
        <p className="text-WetGray mb-2 text-base font-bold">{address}</p>
        <p className="text-WetGray text-base font-bold">{phone}</p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        {!isMainAddress && (
          <Button
            disabled={isEditing}
            onClick={onClick}
            variant="outline"
            className="text-primary border-primary hover:bg-primary/10 hover:text-primary rounded-sm text-sm font-medium"
          >
            {isEditing ? t('loading') : t('make_main_address')}
          </Button>
        )}

        <Button onClick={onEdit} variant="outline" className="text-signalGray border-signalGray rounded-sm text-sm font-medium">
          {t('edit')}
        </Button>
        <Button onClick={onDelete} variant="outline" className="text-Alert border-Alert hover:bg-Alert/10 hover:text-Alert rounded-sm text-sm font-medium">
          {t('delete')}
        </Button>
      </div>
    </div>
  );
};
