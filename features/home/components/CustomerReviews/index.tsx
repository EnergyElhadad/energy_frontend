import { HeaderReviewsSection } from './components/HeaderReviewsSection';
import { ReviewsSwiper } from './components/ReviewsSwiper';
import { useTranslations } from 'next-intl';
import { HomepageReview } from '../../services/ratings';

interface CustomerReviewsProps {
  reviews: HomepageReview[];
}

export const CustomerReviews = ({ reviews }: CustomerReviewsProps) => {
  const t = useTranslations('HomePage');

  if (!reviews || reviews.length === 0) return null;

  return (
    <section className="w-full overflow-hidden bg-white pt-18 pb-14">
      <div className="container">
        <div className="mx-auto">
          <HeaderReviewsSection text={t('customer_reviews')} />
          <ReviewsSwiper initialReviews={reviews} />
        </div>
      </div>
    </section>
  );
};
