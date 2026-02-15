import { CartIcon } from '@/shared/components/icons/Cart';
import { Button } from '@/shared/components/ui/Button';
import Link from 'next/link';
import React from 'react';

export const FooterOffer = ({ linkUrl }: { linkUrl: string }) => {
  return (
    <div className="mt-6 flex h-11 flex-wrap gap-2 sm:h-14">
      <Button className="bg-primary/90 hover:bg-primary flex h-full w-full flex-1 cursor-pointer items-center justify-center gap-2 rounded-sm py-2.5 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50">
        <CartIcon /> أضف للسلة
      </Button>
      <Link
        href={linkUrl}
        className="border-primary hover:bg-primary/80 text-primary flex h-full w-full flex-1 shrink-0 items-center justify-center rounded-sm border bg-transparent px-6 py-2 text-sm font-semibold hover:text-white"
      >
        تفاصيل المنتج
      </Link>
    </div>
  );
};
