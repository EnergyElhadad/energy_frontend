import React from 'react';
import { OrderCardDescItem } from './components/OrderCardDescItem';

type OrderCardDescProps = {
  purchasedDate: string;
  deliveryDate: string;
  price: string | number;
  orderCode: string;
  status: string;
};

export const OrderCardDesc: React.FC<OrderCardDescProps> = ({ purchasedDate, deliveryDate, price, orderCode, status }) => {
  return (
    <div className="bg-Background xs:flex-row flex flex-col gap-3 rounded-md p-2 sm:gap-9">
      <OrderCardDescItem title="تم الشراء" desc={purchasedDate} />
      <OrderCardDescItem title="تم التوصيل في" desc={deliveryDate} />
      <OrderCardDescItem title="القيمة الاجمالية" desc={String(price)} />
      <OrderCardDescItem title="كود الطلب" desc={orderCode} />
      <OrderCardDescItem title="الحالة" desc={status} />
    </div>
  );
};
