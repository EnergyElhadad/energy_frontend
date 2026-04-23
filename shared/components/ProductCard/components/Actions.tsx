'use client';

import { Link } from '@/core/i18n';
import { HeartIcon } from '../../icons/Heart';
import { toSlug } from '@/shared/utils/slug';
import { useWishlistToggle } from '@/shared/hooks/useWishlistToggle';
import { cn } from '@/shared/utils';
import { useTranslations } from 'next-intl';

export const Actions = ({ id, title, is_in_wishlist }: { id: number | string; title: string; is_in_wishlist?: boolean }) => {
  const { isInWishlist, toggleWishlist, isLoading } = useWishlistToggle(id, is_in_wishlist);
  const t = useTranslations('Products');

  return (
    <div className="relative z-10 flex h-10.5 items-center justify-between gap-2 pointer-events-auto">
      <Link
        href={`/products/${id}-${toSlug(title)}`}
        onClick={e => e.stopPropagation()}
        className="hover:bg-primary/90 border-primary text-primary flex min-h-full w-full items-center justify-center rounded border bg-transparent p-2 px-3 py-1.5 text-sm font-semibold transition hover:text-white"
      >
        {t('add_to_cart')}
      </Link>

      <button
        onClick={e => {
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
