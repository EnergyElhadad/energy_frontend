'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { ArrowLeftIcon } from '@/shared/components/icons/ArrowLeft';
import { ArrowRightIcon } from '@/shared/components/icons/ArrowRight';
import { HeroContent } from './components/HeroContent';
import { Banner } from '@/features/home/types/banner';

interface HeroProps {
  data: Banner[];
}

export const Hero: React.FC<HeroProps> = ({ data }) => {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          loop={false}
          autoplay={{ delay: 5000 }}
          navigation={{
            nextEl: '.hero-next',
            prevEl: '.hero-prev',
          }}
          pagination={{
            el: '.hero-pagination',
            clickable: true,
          }}
          className="h-105 w-full"
        >
          {data?.map(item => (
            <SwiperSlide key={item.id}>
              <HeroContent title={item.title} imageUrl={item.image} linkUrl={item.link} linkText={item.button} description={item.banner_text} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation */}
        <button
          aria-label="Previous slide"
          className="hero-prev absolute top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 text-white hover:bg-white/20 xl:left-6 xl:flex"
        >
          <ArrowLeftIcon />
        </button>

        <button
          aria-label="Next slide"
          className="hero-next absolute top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 text-white hover:bg-white/20 xl:right-6 xl:flex"
        >
          <ArrowRightIcon />
        </button>

        {/* Pagination */}
        <div className="hero-pagination absolute bottom-6! z-50! flex w-fit! -translate-x-1/2! gap-2 space-x-0 ltr:right-1/2! ltr:left-1/2! rtl:right-1/2! rtl:left-1/2!" />
      </div>
    </section>
  );
};
