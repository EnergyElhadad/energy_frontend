import { CartIcon } from '@/shared/components/icons/Cart';
import { Button } from '@/shared/components/ui/Button';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';

type FooterOfferProps = {
  linkUrl: string;
  onAddToCart?: () => void;
  isLoading?: boolean;
};

export const FooterOffer = ({ linkUrl, onAddToCart, isLoading }: FooterOfferProps) => {
  const t = useTranslations('SingleProduct');
  return (
    <div className="mt-6 flex h-11 flex-wrap gap-2 sm:h-14">
      <Button
        onClick={onAddToCart}
        disabled={isLoading}
        className="bg-primary/90 hover:bg-primary flex h-full w-full flex-1 cursor-pointer items-center justify-center gap-2 rounded-sm py-2.5 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? <Loader2 className="animate-spin" /> : <CartIcon />} {t('add_to_cart')}
      </Button>
      <Link
        href={linkUrl}
        className="border-primary hover:bg-primary/80 text-primary flex h-full w-full flex-1 shrink-0 items-center justify-center rounded-sm border bg-transparent px-6 py-2 text-sm font-semibold hover:text-white"
      >
        {t('product_details')}
      </Link>
    </div>
  );
};
