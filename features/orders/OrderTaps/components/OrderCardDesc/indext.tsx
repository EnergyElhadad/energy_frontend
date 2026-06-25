'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { OrderCardDescItem } from './components/OrderCardDescItem';

type OrderCardDescProps = {
  purchasedDate: string;
  deliveryDate: string;
  price: string | number;
  orderCode: string;
  status: string;
};

export const OrderCardDesc: React.FC<OrderCardDescProps> = ({ purchasedDate, deliveryDate, price, orderCode, status }) => {
  const t = useTranslations('OrdersPage');
  return (
    <div className="bg-Background xs:flex-row flex flex-col gap-3 rounded-md p-2 sm:gap-9">
      <OrderCardDescItem title={t('purchased')} desc={purchasedDate} />
      <OrderCardDescItem title={t('delivered_on')} desc={deliveryDate} />
      <OrderCardDescItem title={t('total_value')} desc={String(price)} />
      <OrderCardDescItem title={t('order_code')} desc={orderCode} />
      <OrderCardDescItem title={t('status')} desc={status} />
    </div>
  );
};
