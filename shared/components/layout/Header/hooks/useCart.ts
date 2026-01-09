"use client";

import { useState } from "react";
import type { CartItem, Product, UseCartReturn } from "../types";

// Mock data for initial development
const MOCK_CART_ITEMS: CartItem[] = [
  {
    id: 1,
    title:
      "Joyroom JR-PBF19 22.5W Digital Display Fast Charging Power Bank with Dual...",
    category: "Accessories",
    image: "/images/products/01.webp",
    quantity: 1,
    price: 299,
  },
  {
    id: 2,
    title:
      "Joyroom JR-PBF19 22.5W Digital Display Fast Charging Power Bank with Dual...",
    category: "Accessories",
    image: "/images/products/01.webp",
    quantity: 1,
    price: 299,
  },
];

export const useCart = (): UseCartReturn => {
  const [items, setItems] = useState<CartItem[]>(MOCK_CART_ITEMS);

  const count = items.reduce((total, item) => total + item.quantity, 0);

  const addItem = (product: Product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        // Increase quantity if item already exists
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        // Add new item
        return [...prevItems, { ...product, quantity: 1 }];
      }
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

  const clearCart = () => {
    setItems([]);
  };

  return {
    items,
    count,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };
};
