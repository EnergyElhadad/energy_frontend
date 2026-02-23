import { OrderTaps } from '@/features/orders/OrderTaps';
import { OrderTitle } from '@/features/orders/OrderTitle';
import { HeaderPage } from '@/shared/components/ui/HeaderPage';
import { getOrders } from '@/features/orders/services/orders.server';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'OrdersPage' });
  return {
    title: t('title'),
  };
}

export default async function OrdersPage() {
  const data = await getOrders({ page: 1 });
  const t = await getTranslations('OrdersPage');

  return (
    <main className="bg-Background min-h-[70vh] pb-14">
      <div className="container">
        <HeaderPage pageTitle={t('title')} />
        <OrderTitle title={t('title')} />
        <OrderTaps orders={data.result} />
      </div>
    </main>
  );
}
