'use client';

import Image from "next/image";
import { Counter } from "@/shared/components/ui/Counter";

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
  return (
    <div className="flex gap-2 sm:gap-[10px] border border-Stroke rounded-[8px] p-2 sm:p-[8px]">
      <div className="relative w-20 h-20 sm:w-[112px] sm:h-[106px] shrink-0">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover rounded-[4px]"
        />
      </div>
      <div className="flex flex-col grow justify-between min-w-0">
        <div>
          <h4 className="text-[11px] sm:text-[12px] font-semibold mb-1 line-clamp-2 leading-[1.4]">
            {product.title}
          </h4>
          <p className="text-[9px] sm:text-[10px] text-signalGray mb-1 sm:mb-2">{product.category}</p>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="w-full max-w-[110px] sm:max-w-[120px]">
            <Counter
              value={quantity}
              onChange={onQuantityChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};