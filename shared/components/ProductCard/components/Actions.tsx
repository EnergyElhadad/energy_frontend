'use client';

import { useEffect, useRef, useState } from 'react';
import { HeartIcon } from '../../icons/Heart';
import { useWishlistToggle } from '@/shared/hooks/useWishlistToggle';
import { useCart } from '@/features/shopingCart/hooks/useCart';
import { cn } from '@/shared/utils';
import { useTranslations } from 'next-intl';
import { Spinner } from '@/shared/components/ui/spinner';
import { Counter } from '@/shared/components/ui/Counter/Counter';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { Link } from '@/core/i18n';
import { Ban, ArrowLeft } from 'lucide-react';

export const Actions = ({
  id,
  title,
  image,
  price,
  category,
  is_in_wishlist,
  is_in_stock,
  categoryId,
}: {
  id: number | string;
  title: string;
  image?: string; 
  price?: number;
  category?: string;
  is_in_wishlist?: boolean;
  is_in_stock?: boolean;
  categoryId?: number;
}) => {
  const { isInWishlist, toggleWishlist, isLoading } = useWishlistToggle(id, is_in_wishlist);
  const { items, addItem, updateQuantity, removeItem, isAddingToCart } = useCart();
  const t = useTranslations('Products');

  const cartItem = items.find(item => String(item.id) === String(id));
  const inCart = Boolean(cartItem);
  const serverQuantity = cartItem?.quantity ?? 0;

  // Local quantity for optimistic UI; debounced to avoid hammering the server.
  const [localQuantity, setLocalQuantity] = useState(serverQuantity);
  const debouncedQuantity = useDebounce(localQuantity, 400);
  const isMounted = useRef(false);

  // Keep local in sync when the cart updates externally (e.g. another tab, server refetch).
  useEffect(() => {
    setLocalQuantity(serverQuantity);
  }, [serverQuantity]);

  // Push debounced changes back to the cart.
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    if (!inCart) return;
    if (debouncedQuantity !== serverQuantity && debouncedQuantity > 0) {
      updateQuantity(id, debouncedQuantity);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuantity]);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id: Number(id), title, category: category ?? '', image: image ?? '', price });
  };
  const outOfStock = is_in_stock === false;

    return (
    <div className="relative z-10 flex min-h-23 flex-col justify-end gap-2 pointer-events-auto">
      <div className="flex h-10.5 items-center justify-between gap-2">
        {outOfStock ? (
          <button
            type="button"
            disabled
            className="bg-SmokyWhite text-signalGray flex min-h-full w-full cursor-not-allowed items-center justify-center gap-1 rounded-xl px-2 py-1.5 text-xs font-semibold whitespace-nowrap sm:gap-2 sm:px-3 sm:text-sm"
          >
            <Ban className="hidden size-4 sm:inline-block" />
            {t('currently_unavailable')}
          </button>
        ) : inCart ? (
          <div
            className="flex min-h-full w-full items-center"
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Counter value={localQuantity} onChange={setLocalQuantity} min={1} fullWidth onDelete={() => removeItem(id)} />
          </div>
        ) : (
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="hover:bg-primary/90 border-primary text-primary flex min-h-full w-full cursor-pointer items-center justify-center gap-1 rounded-xl border bg-transparent px-2 py-1.5 text-xs font-semibold whitespace-nowrap transition hover:text-white disabled:cursor-not-allowed disabled:opacity-70 sm:gap-2 sm:px-3 sm:text-sm"
          >
            {isAddingToCart && <Spinner />}
            {t('add_to_cart')}
          </button>
        )}

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
            'cursor-pointer rounded-xl border bg-transparent p-2 transition md:p-2.75',
            isInWishlist ? 'border-primary text-primary' : 'border-SmokyWhite hover:border-primary text-Stroke'
          )}
        >
          <HeartIcon className={cn(isInWishlist && 'fill-current')} />
        </button>
      </div>

      {outOfStock && (
        <Link
          href={{ pathname: '/products', query: categoryId ? { categoryId, categoryName: category ?? '' } : {} }}
          onClick={e => e.stopPropagation()}
          className="border-primary text-primary bg-primary-10 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed py-2 text-sm font-semibold"
        >
          {t('show_alternatives')}
          <ArrowLeft className="size-4 ltr:rotate-180" />
        </Link>
      )}
    </div>
  );
};
