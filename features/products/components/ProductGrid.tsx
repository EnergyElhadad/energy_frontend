import React from 'react';
import { EmptyProducts } from './EmptyProducts';

interface ProductGridProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  emptyState?: React.ReactNode;
}

export const ProductGrid = <T,>({ items, renderItem, emptyState }: ProductGridProps<T>) => {
  if (items.length === 0) {
    if (emptyState) return <>{emptyState}</>;
    return <EmptyProducts />;
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <React.Fragment key={index}>{renderItem(item)}</React.Fragment>
      ))}
    </div>
  );
};
