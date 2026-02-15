'use client';

import { useCart } from '../hooks/useCart';
import { EmptyCart } from './EmptyCart';
import { GridCart } from '../GridCart';
import { SummaryOrder } from '../SummaryOrder';

export const CartContent = () => {
  const { items, count, cartTotal } = useCart();

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-8">
      <div className="md:col-span-6">
        <GridCart />
      </div>
      <div className="md:col-span-2">
        <SummaryOrder total={cartTotal} itemsCount={count} />
      </div>
    </div>
  );
};
