'use client';

import { StarIcon } from '@/shared/components/icons/Star';
import { StarFilledIcon } from '@/shared/components/icons/StarFilled';
import { useQuery } from '@tanstack/react-query';
import { getProductRatings } from '@/features/SingleProduct/services/ratings';
import { useTranslations } from 'next-intl';
import { Skeleton } from '@/shared/components/ui/skeleton';

type Props = {
  productId: number;
};

export const ReviewList = ({ productId }: Props) => {
  const t = useTranslations('SingleProduct');
  const { data: ratings, isLoading } = useQuery({
    queryKey: ['product-ratings', productId],
    queryFn: () => getProductRatings(productId),
  });

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex flex-col gap-2 rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-24" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  if (!ratings || ratings.length === 0) {
    return (
      <div className="flex h-[545px] flex-col items-center justify-center py-12 text-center">
        <div className="relative mb-4 h-32 w-32 opacity-50">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-100">
            <StarIcon className="text-signalGray h-16 w-16" />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{t('no_ratings_yet')}</h3>
        <p className="text-signalGray mt-1 text-sm">{t('be_the_first_to_rate')}</p>
      </div>
    );
  }

  return (
    <div className="scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100 h-[545px] overflow-y-auto">
      <div className="me-1 flex flex-col gap-4">
        {ratings.map(rating => (
          <div key={rating.id} className="border-Stroke rounded-lg border p-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map(star => (
                    <span key={star}>
                      {star <= rating.rating ? <StarFilledIcon className="h-4 w-4 text-yellow-400" /> : <StarIcon className="text-Stroke h-4 w-4" />}
                    </span>
                  ))}
                </div>
                <span className="font-semibold text-gray-900">{rating.user_name || t('anonymous_user')}</span>
              </div>
              <span className="text-signalGray text-sm">{new Date(rating.created_at).toLocaleDateString()}</span>
            </div>
            {rating.comment && <p className="text-gray-700">{rating.comment}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};
