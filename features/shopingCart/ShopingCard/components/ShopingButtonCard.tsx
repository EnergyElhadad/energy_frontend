import { CloseIcon } from '@/shared/components/icons/Close';
import React from 'react';

export const ShopingButtonCard = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      role="button"
      aria-label="delete shoping cart"
      className="bg-gray50 hover:bg-Alert ms-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-black transition hover:text-white"
    >
      <CloseIcon onClick={onClick} />
    </div>
  );
};
