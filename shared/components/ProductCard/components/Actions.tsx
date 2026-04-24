'use client';

import { HeartIcon } from '../../icons/Heart';
import { useWishlistToggle } from '@/shared/hooks/useWishlistToggle';
import { useCart } from '@/features/shopingCart/hooks/useCart';
import { cn } from '@/shared/utils';
import { useTranslations } from 'next-intl';
import { Spinner } from '@/shared/components/ui/spinner';

export const Actions = ({
  id,
  title,
  image,
  price,
  category,
  is_in_wishlist,
}: {
  id: number | string;
  title: string;
  image?: string;
  price?: number;
  category?: string;
  is_in_wishlist?: boolean;
}) => {
  const { isInWishlist, toggleWishlist, isLoading } = useWishlistToggle(id, is_in_wishlist);
  const { addItem, isAddingToCart } = useCart();
  const t = useTranslations('Products');

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id: Number(id), title, category: category ?? '', image: image ?? '', price });
  };

  return (
    <div className="relative z-10 flex h-10.5 items-center justify-between gap-2 pointer-events-auto">
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={isAddingToCart}
        className="hover:bg-primary/90 border-primary text-primary flex min-h-full w-full cursor-pointer items-center justify-center gap-2 rounded border bg-transparent p-2 px-3 py-1.5 text-sm font-semibold transition hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isAddingToCart && <Spinner />}
        {t('add_to_cart')}
      </button>

      <button
        type="button"
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          toggleWishlist();
        }}
        disabled={isLoading}
        aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        className={cn(
          'cursor-pointer rounded border bg-transparent p-2 transition md:p-2.75',
          isInWishlist ? 'border-primary text-primary' : 'border-SmokyWhite hover:border-primary text-Stroke'
        )}
      >
        <HeartIcon className={cn(isInWishlist && 'fill-current')} />
      </button>
    </div>
  );
};
