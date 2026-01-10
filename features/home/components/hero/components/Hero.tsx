"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { ArrowLeftIcon } from "@/shared/components/icons/ArrowLeft";
import { ArrowRightIcon } from "@/shared/components/icons/ArrowRight";
import HeroContent from "./HeroContent";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        loop={false}
        // autoplay={{ delay: 5000 }}
        navigation={{
          nextEl: ".hero-next",
          prevEl: ".hero-prev",
        }}
        pagination={{
          el: ".hero-pagination",
          clickable: true,
        }}
        className="h-105 w-screen"
      >
        <SwiperSlide className="h-full">
          <HeroContent />
        </SwiperSlide>
        <SwiperSlide>
          <HeroContent />
        </SwiperSlide>
      </Swiper>

      {/* Navigation */}
      <button
        aria-label="Previous slide"
        className="hero-prev absolute top-1/2 left-6 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 text-white hover:bg-white/20 md:flex"
      >
        <ArrowLeftIcon />
      </button>

      <button
        aria-label="Next slide"
        className="hero-next absolute top-1/2 right-6 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 text-white hover:bg-white/20 md:flex"
      >
        <ArrowRightIcon />
      </button>

      {/* Pagination */}
      <div className="hero-pagination absolute bottom-6 z-31 flex w-fit -translate-x-1/2 gap-2 space-x-0 ltr:right-1/2 ltr:left-1/2 rtl:right-1/2 rtl:left-1/2" />
    </section>
  );
}
