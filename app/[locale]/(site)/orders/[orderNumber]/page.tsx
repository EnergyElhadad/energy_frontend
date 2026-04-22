import { Breadcrumb } from '@/shared/components/layout/Breadcrumb';
import { OrderDetailContent } from '@/features/orders/components/OrderDetailContent';
import { getOrderDetail } from '@/features/orders/services/orderDetail.server';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface OrderDetailPageProps {
  params: { id: string; locale: string; orderNumber: string };
}

export async function generateMetadata({ params: { locale, orderNumber } }: OrderDetailPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'OrderDetail' });
  return {
    title: t('title') + ` #${orderNumber}`,
  };
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { orderNumber } = await params;
  const t = await getTranslations('OrderDetail');
  const d = await getTranslations('Common');
  const o = await getTranslations('OrdersPage');

  const response = await getOrderDetail(orderNumber);

  if (!response || !response.status || !response.result) {
    notFound();
  }

  const order = response.result;

  const breadcrumbs = [{ label: d('home'), href: '/' }, { label: o('title'), href: '/orders' }, { label: t('title') + ` #${order.order_number}` }];

  return (
    <main className="bg-Background overflow-hidden pb-20">
      <div className="container">
        <Breadcrumb items={breadcrumbs} className="pt-4 pb-10" />
        <OrderDetailContent order={order} />
      </div>
    </main>
  );
}
