import React from 'react';
import { useTranslations } from 'next-intl';

interface Props {
  status: string;
}

export const OrderStatusBadge = ({ status }: Props) => {
  const t = useTranslations('OrderDetail');

  let config = { bg: 'bg-gray-100', text: 'text-gray-800', label: status };

  switch (status) {
    case 'PENDING':
      config = { bg: 'bg-orange-100', text: 'text-orange-800', label: t('status_pending') };
      break;
    case 'CONFIRMED':
      config = { bg: 'bg-blue-100', text: 'text-blue-800', label: t('status_confirmed') };
      break;
    case 'SHIPPED':
      config = { bg: 'bg-purple-100', text: 'text-purple-800', label: t('status_shipped') };
      break;
    case 'DELIVERED':
      config = { bg: 'bg-green-100', text: 'text-green-800', label: t('status_delivered') };
      break;
    case 'CANCELLED':
      config = { bg: 'bg-red-100', text: 'text-red-800', label: t('status_cancelled') };
      break;
  }

  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${config.bg} ${config.text}`}>{config.label}</span>;
};
