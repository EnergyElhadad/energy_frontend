import { OrderTaps } from "@/features/orders/OrderTaps";
import { OrderTitle } from "@/features/orders/OrderTitle";
import { HeaderPage } from "@/shared/components/ui/HeaderPage";

export default function OrdersPage() {
  return (
    <main className="bg-Background pb-14">
      <div className="container">
        <HeaderPage pageTitle="الطلبات" />
        <OrderTitle title="الطلبات" />
        <OrderTaps />
      </div>
    </main>
  );
}
