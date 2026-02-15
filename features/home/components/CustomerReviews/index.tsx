import { HeaderReviewsSection } from './components/HeaderReviewsSection';
import { ReviewsSwiper } from './components/ReviewsSwiper';

export const CustomerReviews = () => {
  return (
    <section className="w-full overflow-hidden bg-white pt-18 pb-14">
      <div className="container">
        <div className="mx-auto">
          <HeaderReviewsSection text="تقييمات العملاء" />
          <ReviewsSwiper />
        </div>
      </div>
    </section>
  );
};
