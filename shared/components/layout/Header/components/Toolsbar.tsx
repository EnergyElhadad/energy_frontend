'use client';

import { HeartIcon } from "@/shared/components/icons/Heart";
import { BagIcon } from "@/shared/components/icons/Bag";
import { LanguageSwitcher } from "@/shared/components/LanguageSwitcher";
import { useState } from "react";
import { CartItem } from "./CartItem";
import { HeaderDropdownButton } from "./HeaderDropdownButton";

export const Toolsbar = () => {
  const [quantities, setQuantities] = useState({ 1: 1, 2: 1 });

  const products = [
    {
      id: 1,
      title: "Joyroom JR-PBF19 22.5W Digital Display Fast Charging Power Bank with Dual...",
      category: "Accessories",
      image: "/images/products/01.webp"
    },
    {
      id: 2,
      title: "Joyroom JR-PBF19 22.5W Digital Display Fast Charging Power Bank with Dual...",
      category: "Accessories",
      image: "/images/products/01.webp"
    }
  ];

  const handleQuantityChange = (id: number, val: number) => {
    setQuantities(prev => ({ ...prev, [id]: val }));
  };

  return (
    <div className="flex items-center gap-[15px] sm:gap-[24px] shrink-0">
      <div className="hidden sm:block">
        <LanguageSwitcher />
      </div>

      {/* Wishlist Button - Hover Trigger */}
      <HeaderDropdownButton
        icon={<HeartIcon className="text-primary" />}
        badgeCount={2}
        aria-label="Wishlist"
        dropdownTitle="قائمة الامنيات"
        trigger="hover"
      >
        {products.map(product => (
          <CartItem
            key={product.id}
            product={product}
            quantity={quantities[product.id as keyof typeof quantities] || 1}
            onQuantityChange={(val) => handleQuantityChange(product.id as number, val)}
          />
        ))}
      </HeaderDropdownButton>

      {/* Cart Button - Click Trigger */}
      <HeaderDropdownButton
        icon={<BagIcon className="text-primary" />}
        badgeCount={2}
        aria-label="Cart"
        dropdownTitle="سلة التسوق"
        trigger="hover"
      >
        {products.map(product => (
          <CartItem
            key={product.id}
            product={product}
            quantity={quantities[product.id as keyof typeof quantities] || 1}
            onQuantityChange={(val) => handleQuantityChange(product.id as number, val)}
          />
        ))}
      </HeaderDropdownButton>
    </div>
  );
};
