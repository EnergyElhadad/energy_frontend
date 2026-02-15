'use client';
import React from 'react';
import { ShopingCard } from './ShopingCard';
import { useCart } from './hooks/useCart';

export const GridCart = () => {
  const { items } = useCart();
  return (
    <div className="flex flex-col gap-4">
      {items.map(item => (
        <ShopingCard key={item.id} id={item.id} title={item.title} price={item.price} itemTotal={item.itemTotal} imageUrl={item.image} quantity={item.quantity} />
      ))}
    </div>
  );
};
