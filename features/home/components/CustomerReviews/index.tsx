import { HeaderReviewsSection } from './components/HeaderReviewsSection';
import { ReviewsSwiper } from './components/ReviewsSwiper';
import { useTranslations } from 'next-intl';

export const CustomerReviews = () => {
  const t = useTranslations('HomePage');
  return (
    <section className="w-full overflow-hidden bg-white pt-18 pb-14">
      <div className="container">
        <div className="mx-auto">
          <HeaderReviewsSection text={t('customer_reviews')} />
          <ReviewsSwiper />
        </div>
      </div>
    </section>
  );
};
