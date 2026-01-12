import { ReviewsSwiper } from "./components/ReviewsSwiper";

export const CustomerReviews = () => {
  return (
    <section className="w-full overflow-hidden bg-white pt-18 pb-14">
      <div className="container">
        <div className="mx-auto">
          <h2 className="text-WetGray mb-10 text-center text-xl font-bold md:text-[32px]">
            تقييمات العملاء
          </h2>
          <ReviewsSwiper />
        </div>
      </div>
    </section>
  );
};
