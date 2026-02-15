import Image from "next/image";

interface CheckoutCardProps {
  price?: string | number;
  title: string;
  imageUrl: string;
}

export const CheckoutSummaryOrderCard: React.FC<CheckoutCardProps> = ({
  imageUrl,
  title,
  price,
}) => {
  return (
    <div className="relative flex w-full items-center justify-between gap-2 bg-transparent md:gap-4">
      <div className="flex items-center gap-4">
        <div className="border-Stroke md:h-9md:w-17.5 relative h-12 w-17.5 shrink-0 overflow-hidden rounded-[2px] border bg-white">
          <Image
            src={imageUrl}
            fill
            className="object-contain"
            alt="shoping-cart-image"
          />
        </div>
        <h3 className="text-WetGray text-sm font-normal">{title}</h3>
      </div>
      <p className="text-gray400 shrink-0 text-sm font-normal md:text-base">
        {price} ج
      </p>
    </div>
  );
};
