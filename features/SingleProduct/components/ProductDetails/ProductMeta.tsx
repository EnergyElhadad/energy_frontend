import Rating from '@/features/home/components/CustomerReviews/components/Rating';
import { HeartIcon } from '@/shared/components/icons/Heart';
import { ShareProductIcon } from '@/shared/components/icons/ShareProduct';
import { useShare } from '@/shared/hooks/useShare';
import { useTranslations } from 'next-intl';

interface ProductMetaProps {
  name?: string;
  rate_count?: number;
  reviews_count?: number;
  id?: number;
}

export const ProductMeta = ({ name, rate_count , reviews_count , id  }: ProductMetaProps) => {
  const t = useTranslations('SingleProduct');
  const { handleShare } = useShare();

  return (
    <div className="mt-4 flex items-center gap-4">
      <div className="flex space-x-2">
        <Rating rating={rate_count || 0} />
        <p className="text-signalGray text-sm font-normal">
          <span>({reviews_count}) {t('reviews')}</span>
        </p>
      </div>
      <div className="flex cursor-pointer space-x-2 border-s ps-4">
        <div className="text-signalGray hover:text-primary">
          <HeartIcon />
        </div>
        <p className="text-signalGray text-sm font-normal">{t('add_to_wishlist')}</p>
      </div>
      <div className="flex cursor-pointer space-x-2 border-s ps-4" onClick={() => handleShare({ title: name })}>
        <div className="text-signalGray hover:text-primary">
          <ShareProductIcon />
        </div>
        <p className="text-signalGray text-sm font-normal">{t('share_product')}</p>
      </div>
    </div>
  );
};
