'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { useLocale } from 'next-intl';
import { OrderCardDesc } from './components/OrderCardDesc/indext';
import { Order } from '../types/order';

interface OrderTapsProps {
  orders: Order[];
}

const STATUS_LABELS: Record<Order['status'], string> = {
  PENDING: 'قيد الانتظار',
  CONFIRMED: 'تم التأكيد',
  SHIPPED: 'تم الشحن',
  DELIVERED: 'تم التوصيل',
  CANCELLED: 'ملغي',
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const OrderTaps: React.FC<OrderTapsProps> = ({ orders }) => {
  const locale = useLocale();

  const currentOrders = orders.filter(o => o.status === 'PENDING' || o.status === 'CONFIRMED' || o.status === 'SHIPPED');
  const pastOrders = orders.filter(o => o.status === 'DELIVERED' || o.status === 'CANCELLED');

  const renderOrders = (list: Order[]) => {
    if (list.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center gap-2 py-12">
          <p className="text-signalGray text-base font-medium">لا توجد طلبات</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-6">
        {list.map(order => (
          <div key={order.order_number} className="flex flex-col gap-5 rounded-md bg-white p-4">
            <OrderCardDesc
              purchasedDate={formatDate(order.created_at)}
              deliveryDate={order.delivered_at ? formatDate(order.delivered_at) : '—'}
              price={`${order.total_amount} ج`}
              orderCode={order.order_number}
              status={STATUS_LABELS[order.status]}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <Tabs defaultValue="currentOrders" style={{ direction: locale === 'ar' ? 'rtl' : 'ltr' }}>
      <TabsList variant="line" className="border-Stroke mb-4 flex w-full justify-start gap-0 rounded-none border-b bg-transparent px-0">
        <TabsTrigger
          className="text-signalGray data-[state=active]:text-primary after:bg-primary xs:max-w-38 w-15 rounded-none px-6 py-2 text-base font-bold after:h-px data-[state=active]:bg-transparent"
          value="currentOrders"
        >
          الطلبات الحالية
        </TabsTrigger>
        <TabsTrigger
          className="text-signalGray data-[state=active]:text-primary after:bg-primary xs:max-w-38 w-15 rounded-none px-6 py-2 text-base font-bold after:h-px data-[state=active]:bg-transparent"
          value="pastOrders"
        >
          الطلبات السابقة
        </TabsTrigger>
      </TabsList>

      <TabsContent value="currentOrders">{renderOrders(currentOrders)}</TabsContent>
      <TabsContent value="pastOrders">{renderOrders(pastOrders)}</TabsContent>
    </Tabs>
  );
};
