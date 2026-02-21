import { OrderTaps } from '@/features/orders/OrderTaps';
import { OrderTitle } from '@/features/orders/OrderTitle';
import { HeaderPage } from '@/shared/components/ui/HeaderPage';
import { getOrders } from '@/features/orders/services/orders.server';

export const dynamic = 'force-dynamic';

export default async function OrdersPage() {
  const data = await getOrders({ page: 1 });

  return (
    <main className="bg-Background min-h-[70vh] pb-14">
      <div className="container">
        <HeaderPage pageTitle="الطلبات" />
        <OrderTitle title="الطلبات" />
        <OrderTaps orders={data.result} />
      </div>
    </main>
  );
}
