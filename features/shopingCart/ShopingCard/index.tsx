import { useCart } from '@/shared/components/layout/Header/hooks';
import Counter from '@/shared/components/ui/Counter';
import Image from 'next/image';
import { ShopingCardDesc } from './components/ShopingCardDesc';
import { ShopingButtonCard } from './components/ShopingButtonCard';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from '@/shared/hooks/useDebounce';

interface ShopingCardProps {
  id: string | number;
  price?: string | number;
  itemTotal?: number;
  title: string;
  imageUrl: string;
  quantity: number;
}

export const ShopingCard: React.FC<ShopingCardProps> = ({ id, price, itemTotal, title, imageUrl, quantity }) => {
  const { updateQuantity, removeItem } = useCart();
  const [localQuantity, setLocalQuantity] = useState(quantity);
  const debouncedQuantity = useDebounce(localQuantity, 500);
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    if (debouncedQuantity !== quantity) {
      updateQuantity(id, debouncedQuantity);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuantity]);

  useEffect(() => {
    setLocalQuantity(quantity);
  }, [quantity]);

  return (
    <div className="border-gray100 relative flex w-full max-w-223.5 items-center gap-2 rounded-sm border bg-white p-4 md:gap-4">
      <div className="flex items-center gap-4">
        <div className="border-Stroke s relative aspect-square min-h-20 w-full min-w-29.25 shrink-0 overflow-hidden rounded-sm border md:aspect-auto md:h-20 md:w-29.25">
          <Image src={imageUrl} fill className="object-cover" alt="shoping-cart-image" />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 md:items-start md:gap-1">
        <ShopingCardDesc title={title} price={price} />
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2 md:gap-4 lg:gap-8">
        <Counter value={localQuantity} onChange={setLocalQuantity} variant="large" />
        <p className="shrink-0 text-sm font-bold text-black md:text-base">
          {itemTotal || Number(price) * quantity} {''} ج
        </p>
        <ShopingButtonCard onClick={() => removeItem(id)} />
      </div>
    </div>
  );
};
