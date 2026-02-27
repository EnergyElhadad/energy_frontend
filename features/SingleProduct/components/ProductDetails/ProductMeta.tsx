import Rating from '@/features/home/components/CustomerReviews/components/Rating';
import { HeartIcon } from '@/shared/components/icons/Heart';
import { ShareProductIcon } from '@/shared/components/icons/ShareProduct';
import { useShare } from '@/shared/hooks/useShare';
import { useTranslations } from 'next-intl';
import { useWishlistToggle } from '@/shared/hooks/useWishlistToggle';
import { Loader2 } from 'lucide-react';
import { cn } from '@/shared/utils';

interface ProductMetaProps {
  name?: string;
  rate_count?: number;
  reviews_count?: number;
  id?: number;
  is_in_wishlist?: boolean;
}

export const ProductMeta = ({ name, rate_count, reviews_count, id, is_in_wishlist }: ProductMetaProps) => {
  const t = useTranslations('SingleProduct');
  const { handleShare } = useShare();
  const { isInWishlist, toggleWishlist, isLoading } = useWishlistToggle(id || 0, is_in_wishlist);

  return (
    <div className="mt-4 flex items-center gap-4">
      <div className="flex space-x-2">
        <Rating rating={rate_count || 0} />
        <p className="text-signalGray text-sm font-normal">
          <span>
            ({reviews_count}) {t('reviews')}
          </span>
        </p>
      </div>
      <button onClick={toggleWishlist} disabled={isLoading}>
        <div className="flex cursor-pointer items-center space-x-2 border-s ps-4">
          <div className={cn('text-signalGray hover:text-primary', isInWishlist && 'text-primary')}>
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <HeartIcon className={cn(isInWishlist && 'fill-current')} />}
          </div>
          <p className={cn('text-signalGray text-sm font-normal', isInWishlist && 'text-primary font-medium')}>
            {isInWishlist ? t('remove_from_wishlist') : t('add_to_wishlist')}
          </p>
        </div>
      </button>
      <div className="flex cursor-pointer space-x-2 border-s ps-4" onClick={() => handleShare({ title: name })}>
        <div className="text-signalGray hover:text-primary">
          <ShareProductIcon />
        </div>
        <p className="text-signalGray text-sm font-normal">{t('share_product')}</p>
      </div>
    </div>
  );
};
