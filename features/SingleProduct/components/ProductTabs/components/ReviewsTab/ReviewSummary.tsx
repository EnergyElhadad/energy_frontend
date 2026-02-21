'use client';

import { StarIcon } from '@/shared/components/icons/Star';
import { Button } from '@/shared/components/ui/Button';
import { Textarea } from '@/shared/components/ui/textarea';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createRating, getProductRatings } from '@/features/SingleProduct/services/ratings';
import { toast } from 'sonner';
import { StarFilledIcon } from '@/shared/components/icons/StarFilled';

type Props = {
  productId: number;
};

export const ReviewSummary = ({ productId }: Props) => {
  const t = useTranslations('SingleProduct');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const queryClient = useQueryClient();

  const { data: ratings } = useQuery({
    queryKey: ['product-ratings', productId],
    queryFn: () => getProductRatings(productId),
  });

  const averageRating = ratings && ratings.length > 0 ? (ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length).toFixed(1) : '0.0';

  const totalRatings = ratings?.length || 0;

  const { mutate: submitRating, isPending } = useMutation({
    mutationFn: () => createRating(productId, rating, comment),
    onSuccess: () => {
      toast.success(t('rating_submitted_successfully'));
      setRating(0);
      setComment('');
      queryClient.invalidateQueries({ queryKey: ['product-ratings', productId] });
    },
    onError: () => {
      toast.error(t('failed_to_submit_rating'));
    },
  });

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error(t('please_select_rating'));
      return;
    }
    submitRating();
  };

  return (
    <div className="border-Stroke flex flex-col gap-6 rounded-lg border bg-white p-6">
      <div className="flex flex-col items-center gap-2 rounded-lg bg-blue-50/50 p-6">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-gray-900">{averageRating}</span>
          <span className="text-sm text-gray-500">{t('out_of')} 5</span>
        </div>
        <div className="flex gap-1">
          {Array.from({ length: 5 }, (_, i) => i + 1).map(star => (
            <span key={star}>
              {star <= Number(averageRating) ? <StarFilledIcon className="h-5 w-5 text-yellow-400" /> : <StarIcon className="h-5 w-5 text-gray-200" />}
            </span>
          ))}
        </div>
        <span className="text-sm text-gray-500">
          {totalRatings} {t('evaluators')}
        </span>
      </div>

      <div className="border-t border-gray-100 pt-6">
        <h4 className="mb-4 text-sm font-semibold text-gray-900">{t('add_your_review')}</h4>

        <div className="mb-4 flex gap-2">
          {Array.from({ length: 5 }, (_, i) => i + 1).map(star => (
            <button
              key={star}
              type="button"
              className="focus:outline-none"
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
              disabled={isPending}
            >
              {star <= (hoverRating || rating) ? (
                <StarFilledIcon className="h-6 w-6 text-yellow-400 transition-colors" />
              ) : (
                <StarIcon className="h-6 w-6 text-gray-200 transition-colors" />
              )}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <label className="text-sm font-medium text-gray-900">{t('add_your_comment')}</label>
          <Textarea
            placeholder={t('comment_placeholder')}
            className="min-h-[120px] resize-none"
            value={comment}
            onChange={e => setComment(e.target.value)}
            disabled={isPending}
          />
          <Button className="bg-primary hover:bg-primary/90 h-14.5 w-full rounded-sm" onClick={handleSubmit} disabled={isPending || rating === 0}>
            {isPending ? t('submitting') : t('post_comment')}
          </Button>
        </div>
      </div>
    </div>
  );
};
