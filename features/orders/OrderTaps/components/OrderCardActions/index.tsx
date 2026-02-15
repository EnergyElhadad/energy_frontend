import Image from "next/image";
import { OrderCardDesc } from "./components/OrderCardDesc";
import { Button } from "@/shared/components/ui/Button";

interface ShopingCardProps {
  price?: string | number;
  title: string;
  imageUrl: string;
  orderd?: boolean;
}

export const OrderCardActions: React.FC<ShopingCardProps> = ({
  price,
  title,
  imageUrl,
  orderd,
}) => {
  return (
    <div className="border-gray100 xs:flex-row relative flex w-full flex-col items-center justify-between gap-2 rounded-sm border bg-white p-4 md:gap-4">
      <div className="xs:flex-row flex flex-col items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="border-Stroke s relative aspect-square min-h-20 w-full min-w-29.25 shrink-0 overflow-hidden rounded-sm border md:aspect-auto md:h-20 md:w-29.25">
            <Image
              src={imageUrl}
              fill
              className="object-cover"
              alt="shoping-cart-image"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-8">
          <OrderCardDesc title={title} price={price} />
        </div>
      </div>

      {orderd ? (
        <Button
          variant="outline"
          className="text-Alert border-Alert hover:bg-Alert h-8.5 rounded-sm px-4 text-sm font-medium hover:text-white"
        >
          الغاء الطلب
        </Button>
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            variant="outline"
            className="text-primary border-primary hover:bg-primary h-8.5 rounded-sm px-4 text-sm font-medium hover:text-white"
          >
            شراء مرة اخري
          </Button>
          <Button
            variant="outline"
            className="text-signalGray border-signalGray hover:bg-signalGray h-8.5 rounded-sm px-4 text-sm font-medium hover:text-white"
          >
            عرض المنتج
          </Button>
        </div>
      )}
    </div>
  );
};
