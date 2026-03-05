/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { OrderStatusBadge } from './OrderStatusBadge';
import { OrderItemCard } from './OrderItemCard';
import { useOrderActions } from '../hooks/useOrderActions';
import { Button } from '@/shared/components/ui/Button';
import { Loader2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shared/components/ui/alert-dialog';

interface Props {
  order: any;
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const OrderDetailContent = ({ order }: Props) => {
  const t = useTranslations('OrderDetail');
  const d = useTranslations('Cart');
  const { cancel, isCanceling, rebuy, isRebuying } = useOrderActions();

  const handleCancel = () => {
    cancel(order.order_number);
  };

  const handleRebuy = () => {
    const items = order.items.map((item: { product: { id: any }; quantity: any }) => ({
      product_id: item.product.id,
      quantity: item.quantity,
    }));
    rebuy(items);
  };

  const showCancel = order.status === 'PENDING' || order.status === 'CONFIRMED';
  const showRebuy = order.status === 'DELIVERED';

  const shippingCost = order.shipping_cost ? parseFloat(order.shipping_cost) : 0;
  const subtotal = order.items.reduce((acc: number, item: { total_price: string }) => acc + parseFloat(item.total_price), 0);
  const total = parseFloat(order.total_amount);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-8">
      {/* Left Column: Details & Items (6-cols) */}
      <div className="flex flex-col gap-6 md:col-span-6">
        {/* Order Info Card */}
        <div className="rounded-sm border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex flex-col justify-between gap-4 border-b border-gray-100 pb-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {t('order_number')} #{order.order_number}
              </h2>
              <p className="mt-1 text-sm whitespace-nowrap text-gray-500">
                {t('order_date')}: {formatDate(order.created_at)}
              </p>
            </div>
            <div>
              <OrderStatusBadge status={order.status} />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Address */}
            {order.address && (
              <div>
                <h3 className="mb-2 text-sm font-semibold text-gray-900">{t('address')}</h3>
                <div className="text-sm leading-relaxed text-gray-600">
                  <p>
                    {order.address.area}, {order.address.street}
                  </p>
                  <p>
                    {t('building')}: {order.address.building}, {t('apartment')}: {order.address.apartment}
                  </p>
                  <p>
                    {order.address.city.name}, {order.address.country.name}
                  </p>
                  {order.address.notes && <p className="mt-1 text-gray-500 italic">{order.address.notes}</p>}
                </div>
              </div>
            )}

            {/* Payment Method */}
            {order.payment_method && (
              <div>
                <h3 className="mb-2 text-sm font-semibold text-gray-900">{t('payment_method')}</h3>
                <p className="text-sm text-gray-600">{order.payment_method.name}</p>
                {order.delivered_at && (
                  <>
                    <h3 className="mt-4 mb-2 text-sm font-semibold text-gray-900">{t('delivered_at')}</h3>
                    <p className="text-sm text-gray-600">{formatDate(order.delivered_at)}</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Items Grid (Matching GridCart) */}
        <div className="flex flex-col">
          <h3 className="mb-4 text-lg font-bold text-gray-900">
            {t('items')} ({order.items_count})
          </h3>
          <div className="flex flex-col overflow-hidden rounded-sm border border-gray-200 bg-white shadow-sm">
            {order.items.map((item: { id: any }) => (
              <OrderItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Summary & Actions (2-cols) */}
      <div className="md:col-span-2">
        <div className="mx-auto w-full max-w-sm rounded-sm border border-gray-200 bg-white p-4 shadow-sm">
          <div className="border-Stroke mb-4 border-b pb-2">
            <h3 className="text-darkGray text-xl font-bold">{d('order_summary')}</h3>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-signalGray text-sm">{d('total_products', { count: order.items_count })}</span>
            <span className="text-base font-semibold">
              {subtotal} {t('currency')}
            </span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-signalGray text-sm">{t('shipping')}</span>
            <span className="text-base font-semibold">
              {shippingCost > 0 ? `${shippingCost} ${t('currency')}` : <span className="text-green-600">{t('free_shipping')}</span>}
            </span>
          </div>

          <div className="my-4 h-px w-full bg-gray-200" />

          <div className="mb-2 flex items-center justify-between py-2">
            <span className="text-darkGray text-base font-bold">{d('total')}</span>
            <span className="text-primary text-xl font-bold">
              {total} {t('currency')}
            </span>
          </div>
          <div className="text-signalGray mb-6 text-center text-xs">{d('tax_included')}</div>

          {/* Action Buttons */}
          {showCancel && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="h-12 w-full border-red-600 text-red-600 hover:bg-red-50 hover:text-red-600" disabled={isCanceling}>
                  {isCanceling && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {t('cancel_order')}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{t('cancel_confirm_title')}</AlertDialogTitle>
                  <AlertDialogDescription>{t('cancel_confirm_desc')}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t('cancel_confirm_no')}</AlertDialogCancel>
                  <AlertDialogAction onClick={handleCancel} className="bg-red-600 text-white hover:bg-red-700">
                    {t('cancel_confirm_yes')}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          {showRebuy && (
            <Button className="bg-primary h-12 w-full text-white" onClick={handleRebuy} disabled={isRebuying}>
              {isRebuying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t('rebuy')}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
