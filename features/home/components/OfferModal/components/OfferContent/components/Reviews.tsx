'use client';

import Rating from '@/features/home/components/CustomerReviews/components/Rating';
import { HeartIcon } from '@/shared/components/icons/Heart';
import { ShareProductIcon } from '@/shared/components/icons/ShareProduct';
import { useShare } from '@/shared/hooks/useShare';
import { useWishlistToggle } from '@/shared/hooks/useWishlistToggle';
import { Product } from '@/shared/types/product';
import { cn } from '@/shared/utils';
import { toSlug } from '@/shared/utils/slug';
import { useTranslations } from 'next-intl';
import React from 'react';

export const Reviews = ({ product }: { product: Product }) => {
  const t = useTranslations('SingleProduct');
  const { handleShare } = useShare();
  const { isInWishlist, toggleWishlist, isLoading } = useWishlistToggle(product.id, product.is_in_wishlist);

  // Fallbacks since these properties aren't strongly typed in Product yet
  const productData = product as unknown as Record<string, unknown>;
  const rating = (productData?.rating as number) || 4;
  const reviewsCount = (productData?.reviews_count as number) || 10;

  return (
    <div className="mb-4 flex flex-wrap space-x-8 gap-y-2">
      <div className="flex space-x-2">
        <Rating rating={rating} />
        <p className="text-signalGray text-sm font-normal">
          <span>
            ({reviewsCount}) {t('reviews')}
          </span>
        </p>
      </div>
      <button
        className="flex cursor-pointer space-x-2 border-s ps-4"
        onClick={e => {
          e.stopPropagation();
          toggleWishlist();
        }}
        disabled={isLoading}
      >
        <div className={cn('text-signalGray hover:text-primary', isInWishlist && 'text-primary')}>
          <HeartIcon className={cn(isInWishlist && 'fill-current')} />
        </div>
        <p className="text-signalGray text-sm font-normal">{isInWishlist ? t('remove_from_wishlist') : t('add_to_wishlist')}</p>
      </button>
      <button
        className="flex cursor-pointer space-x-2 border-s ps-4"
        onClick={() =>
          handleShare({
            title: product.name,
            url: window.location.href + '/' + product.id + '-' + toSlug(product.name),
          })
        }
      >
        <div className="text-signalGray hover:text-primary">
          <ShareProductIcon />
        </div>
        <p className="text-signalGray text-sm font-normal">{t('share_product')}</p>
      </button>
    </div>
  );
};
