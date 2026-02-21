'use client';

import Link from 'next/link';
import { HeartIcon } from '../../icons/Heart';
import { toSlug } from '@/shared/utils/slug';
import { useWishlistToggle } from '@/shared/hooks/useWishlistToggle';
import { cn } from '@/shared/utils';

export const Actions = ({ id, title, is_in_wishlist }: { id: number | string; title: string; is_in_wishlist?: boolean }) => {
  const { isInWishlist, toggleWishlist, isLoading } = useWishlistToggle(id, is_in_wishlist);

  return (
    <div className="flex h-10.5 items-center justify-between gap-2">
      <Link
        href={`/products/${id}-${toSlug(title)}`}
        className="hover:bg-primary/90 border-primary text-primary flex min-h-full w-full items-center justify-center rounded border bg-transparent p-2 px-3 py-1.5 text-sm font-semibold transition hover:text-white"
      >
        أضف للسلة
      </Link>

      <button
        onClick={e => {
          e.stopPropagation();
          toggleWishlist();
        }}
        disabled={isLoading}
        aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        className={cn(
          'cursor-pointer rounded border bg-transparent p-2.75 transition',
          isInWishlist ? 'border-primary text-primary' : 'border-SmokyWhite hover:border-primary text-Stroke'
        )}
      >
        <HeartIcon className={cn(isInWishlist && 'fill-current')} />
      </button>
    </div>
  );
};
