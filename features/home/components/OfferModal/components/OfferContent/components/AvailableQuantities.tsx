'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { AvailableQuantitiIcon } from '@/shared/components/icons/AvailableQuantities';

export const AvailableQuantities = () => {
  const t = useTranslations('HomePage');
  return (
    <div className="mb-4 flex space-x-2 text-sm">
      <div className="text-primary">
        <AvailableQuantitiIcon />
      </div>
      <p className="font-semibold text-black">
        {t.rich('remaining_units', {
          count: 16,
          b: chunks => <span className="text-primary">{chunks}</span>,
        })}
      </p>
    </div>
  );
};
