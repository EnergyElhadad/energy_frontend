"use client";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { useLocale } from "next-intl";
import { OrderCardActions } from "./components/OrderCardActions";
import { OrderCardDesc } from "./components/OrderCardDesc/indext";

export const OrderTaps: React.FC = () => {
  const locale = useLocale();
  const orderd = true;

  return (
    <Tabs
      defaultValue="currentOrders"
      style={{ direction: locale === "ar" ? "rtl" : "ltr" }}
    >
      <TabsList
        variant="line"
        className="border-Stroke mb-4 flex w-full justify-start gap-0 rounded-none border-b bg-transparent px-0"
      >
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

      <TabsContent value="currentOrders">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-5 rounded-md bg-white p-4">
            <OrderCardDesc
              purchasedDate="12 Aug, 2023"
              deliveryDate="15 Aug, 2023"
              price="2,500 EGP"
              orderCode="121223-1212-22"
            />
            <OrderCardActions
              imageUrl="/images/products/product2.webp"
              title="Female Plug – 16A – 250V – With Locking Feature"
              price={2500}
              orderd={orderd}
            />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="pastOrders">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-5 rounded-md bg-white p-4">
            <OrderCardDesc
              purchasedDate="12 Aug, 2023"
              deliveryDate="15 Aug, 2023"
              price="2,500 EGP"
              orderCode="121223-1212-22"
            />

            <OrderCardActions
              imageUrl="/images/products/product2.webp"
              title="Female Plug – 16A – 250V – With Locking Feature"
              price={2500}
            />
          </div>
          <div className="flex flex-col gap-5 rounded-md bg-white p-4">
            <OrderCardDesc
              purchasedDate="12 Aug, 2023"
              deliveryDate="15 Aug, 2023"
              price="2,500 EGP"
              orderCode="121223-1212-22"
            />
            <OrderCardActions
              imageUrl="/images/products/product2.webp"
              title="Female Plug – 16A – 250V – With Locking Feature"
              price={2500}
            />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};
