"use client";

import { useState } from "react";
import type { WishlistItem, Product, UseWishlistReturn } from "../types";

const MOCK_WISHLIST_ITEMS: WishlistItem[] = [
  {
    id: 1,
    title:
      "Joyroom JR-PBF19 22.5W Digital Display Fast Charging Power Bank with Dual...",
    category: "Accessories",
    image: "/images/products/01.webp",
    price: 299,
    quantity: 1,
    addedAt: new Date(),
  },
  {
    id: 2,
    title:
      "Joyroom JR-PBF19 22.5W Digital Display Fast Charging Power Bank with Dual...",
    category: "Accessories",
    image: "/images/products/01.webp",
    price: 299,
    quantity: 1,
    addedAt: new Date(),
  },
];

export const useWishlist = (): UseWishlistReturn => {
  const [items, setItems] = useState<WishlistItem[]>(MOCK_WISHLIST_ITEMS);

  const count = items.length;

  const addItem = (product: Product) => {
    setItems((prevItems) => {
      const exists = prevItems.find((item) => item.id === product.id);

      if (!exists) {
        return [...prevItems, { ...product, quantity: 1, addedAt: new Date() }];
      }

      return prevItems;
    });
  };

  const removeItem = (id: string | number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string | number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const isInWishlist = (id: string | number): boolean => {
    return items.some((item) => item.id === id);
  };

  const clearWishlist = () => {
    setItems([]);
  };

  return {
    items,
    count,
    addItem,
    removeItem,
    updateQuantity,
    isInWishlist,
    clearWishlist,
  };
};
