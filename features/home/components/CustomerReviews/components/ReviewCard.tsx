'use client';

import Rating from './Rating';
import { HomepageReview } from '@/features/home/services/ratings';
import { useLocale } from 'next-intl';

type Props = {
  review: HomepageReview;
};

export const ReviewCard: React.FC<Props> = ({ review }) => {
  const locale = useLocale();
  const productName = locale === 'ar' && review.product_name_ar ? review.product_name_ar : review.product_name_en;

  const formatDate = (dateString: string) => {
    try {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="border-Stroke mx-auto flex h-full min-h-[160px] max-w-[384px] flex-col gap-4 rounded-lg border bg-white p-6">
      {/* Header */}
      <div className="flex w-full items-start gap-3">
        <div className="flex-1">
          <div className="mb-1 flex items-start justify-between">
            <div className="flex flex-col">
              <p className="text-sm font-medium text-black">{review.user_name}</p>
              <Rating rating={review.rating} />
            </div>
            {/* date */}
            <p className="text-text-gray400 pt-1 text-xs font-normal whitespace-nowrap">{formatDate(review.created_at)}</p>
          </div>
        </div>
      </div>

      {/* Text */}
      <p className="text-WetGray mt-2 flex-1 text-sm leading-relaxed font-normal">{review.comment}</p>
    </div>
  );
};
