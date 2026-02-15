'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Counter } from '@/shared/components/ui/Counter';
import { useDebounce } from '@/shared/hooks/useDebounce';

interface Product {
  id: string | number;
  title: string;
  category: string;
  image: string;
  price?: number;
}

interface CartItemProps {
  product: Product;
  quantity: number;
  onQuantityChange: (val: number) => void;
}

export const CartItem = ({ product, quantity, onQuantityChange }: CartItemProps) => {
  const [localQuantity, setLocalQuantity] = useState(quantity);
  const debouncedQuantity = useDebounce(localQuantity, 500);
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    if (debouncedQuantity !== quantity) {
      onQuantityChange(debouncedQuantity);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuantity]);

  useEffect(() => {
    setLocalQuantity(quantity);
  }, [quantity]);

  return (
    <div className="border-Stroke flex gap-2 rounded-[8px] border p-2 sm:gap-[10px] sm:p-[8px]">
      <div className="relative h-20 w-20 shrink-0 sm:h-[106px] sm:w-[112px]">
        <Image src={product.image} alt={product.title} fill className="rounded-[4px] object-cover" />
      </div>
      <div className="flex min-w-0 grow flex-col justify-between">
        <div>
          <h4 className="mb-1 line-clamp-2 text-[11px] leading-[1.4] font-semibold sm:text-[12px]">{product.title}</h4>
          <p className="text-signalGray mb-1 text-[9px] sm:mb-2 sm:text-[10px]">{product.category}</p>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="w-full max-w-[110px] sm:max-w-[120px]">
            <Counter value={localQuantity} onChange={setLocalQuantity} />
          </div>
        </div>
      </div>
    </div>
  );
};
