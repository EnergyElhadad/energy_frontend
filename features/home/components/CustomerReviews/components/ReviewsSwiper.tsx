'use client';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ReviewCard } from './ReviewCard';
import { useQuery } from '@tanstack/react-query';
import { getHomepageRatings } from '@/features/home/services/ratings';

import { ArrowLeftIcon } from '@/shared/components/icons/ArrowLeft';
import { ArrowRightIcon } from '@/shared/components/icons/ArrowRight';
import 'swiper/css';
import 'swiper/css/pagination';

export const ReviewsSwiper = () => {
  const { data: response, isLoading } = useQuery({
    queryKey: ['homepage-ratings'],
    queryFn: getHomepageRatings,
  });

  const reviews = response?.result || [];

  if (isLoading) {
    return (
      <div className="flex justify-center p-12">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-t-2 border-b-2"></div>
      </div>
    );
  }

  if (reviews.length === 0) return null;

  return (
    <div className="swiperWrapper relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 5000 }}
        navigation={{
          nextEl: '.review-next',
          prevEl: '.review-prev',
        }}
        pagination={{
          el: '.review-pagination ',
          clickable: true,
        }}
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 2 },
          1250: { slidesPerView: 3 },
        }}
        className="review-swiper"
      >
        {reviews.map(review => (
          <SwiperSlide key={review.id}>
            <ReviewCard review={review} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination */}
      <div className="review-pagination absolute -bottom-9.5! z-31! flex w-fit! -translate-x-1/2! gap-2 space-x-0 ltr:right-1/2! ltr:left-1/2! rtl:right-1/2! rtl:left-1/2!" />

      {/* Navigation */}
      <div className="review-navigation-wrapper">
        <button
          aria-label="Previous review"
          className="review-prev text-primary border-primary absolute top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border hover:bg-white/20 lg:left-0 lg:flex xl:-left-21"
        >
          <ArrowLeftIcon />
        </button>

        <button
          aria-label="Next review"
          className="review-next text-primary border-primary absolute top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border hover:bg-white/20 lg:right-0 lg:flex xl:-right-21"
        >
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
};
