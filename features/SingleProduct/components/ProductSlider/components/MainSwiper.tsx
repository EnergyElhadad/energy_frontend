import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperClass } from "swiper/react";
import { Thumbs, FreeMode } from "swiper/modules";
import Image from "next/image";
import { Maximize2 } from "lucide-react";

interface MainSwiperProps {
  images: string[];
  name: string;
  thumbsSwiper: SwiperClass | null;
  onSlideChange: (swiper: SwiperClass) => void;
  onOpenPopup: () => void;
}

export const MainSwiper = ({
  images,
  name,
  thumbsSwiper,
  onSlideChange,
  onOpenPopup,
}: MainSwiperProps) => {
  return (
    <div className="border-Stroke relative flex-1 overflow-hidden rounded-xl border bg-white p-4 shadow-sm">
      <Swiper
        spaceBetween={10}
        onSlideChange={onSlideChange}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Thumbs]}
        className="h-[412px] w-full"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="relative flex h-full w-full items-center justify-center">
              <Image
                src={src}
                alt={`${name} - Image ${index + 1}`}
                fill
                className="object-contain"
                preload
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        onClick={onOpenPopup}
        className="border-Stroke text-signalGray hover:text-primary absolute bottom-4 left-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border bg-white/80 transition-all hover:bg-white"
        aria-label="Zoom image"
      >
        <Maximize2 size={20} />
      </button>
    </div>
  );
};
