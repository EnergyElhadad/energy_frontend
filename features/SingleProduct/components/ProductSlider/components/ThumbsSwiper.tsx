import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperClass } from "swiper/react";
import { Thumbs, FreeMode } from "swiper/modules";
import Image from "next/image";

interface ThumbsSwiperProps {
  images: string[];
  setThumbsSwiper: (swiper: SwiperClass) => void;
  activeIndex: number;
}

export const ThumbsSwiper = ({
  images,
  setThumbsSwiper,
  activeIndex,
}: ThumbsSwiperProps) => {
  return (
    <div className="hidden w-[119px] md:block">
      <Swiper
        onSwiper={setThumbsSwiper}
        direction="vertical"
        spaceBetween={8}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Thumbs]}
        className="h-[444px] w-full"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div
              className={`group hover:border-primary relative h-[105px] w-full cursor-pointer overflow-hidden rounded-lg border transition-all ${
                activeIndex === index
                  ? "border-primary opacity-100"
                  : "border-transparent opacity-40"
              }`}
            >
              <Image
                src={src}
                alt={`Product thumb ${index}`}
                fill
                className="object-contain"
                preload
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
