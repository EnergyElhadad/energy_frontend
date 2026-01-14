import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { CheveronLeftIcon } from "@/shared/components/icons/CheveronLeft";
import { CheveronRightIcon } from "@/shared/components/icons/CheveronRight";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";

const categories = [
  { id: 1, name: "سماعات", image: "/images/weekOffers/show-1.webp" },
  { id: 2, name: "ساعات", image: "/images/products/product1.webp" },
  { id: 3, name: "شواحن", image: "/images/products/product1.webp" },
  { id: 4, name: "كابلات", image: "/images/products/product1.webp" },
];

export const ImagesOfferSwipper = () => {
  return (
    <div className="swiperWrapper relative h-full w-full rounded-sm border border-[#eeeee] bg-white">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        loop={false}
        // autoplay={{ delay: 5000 }}
        navigation={{
          nextEl: ".imageOffer-next",
          prevEl: ".imageOffer-prev",
        }}
        pagination={{
          el: ".imageOffer-pagination ",
          clickable: true,
        }}
        spaceBetween={16}
        slidesPerView={1}
        className="imageOffer-swiper"
      >
        {categories.map((category) => (
          <SwiperSlide key={category.id} className="max-w-full">
            <Image
              src={category.image}
              alt={category.name}
              width={400}
              height={400}
              className="mx-auto overflow-hidden border-none"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination */}
      <div className="imageOffer-pagination absolute bottom-0! z-31! flex w-fit! -translate-x-1/2! gap-2 space-x-0 ltr:right-1/2! ltr:left-1/2! rtl:right-1/2! rtl:left-1/2!" />

      {/* Navigation */}
      <div className="imageOffer-navigation-wrapper">
        <button
          aria-label="Previous imageOffer"
          className="imageOffer-prev text-SingalGray hover:text-primary absolute top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full lg:left-1 lg:flex"
        >
          <CheveronLeftIcon />
        </button>

        <button
          aria-label="Next imageOffer"
          className="imageOffer-next text-SingalGray hover:text-primary absolute top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full lg:right-1 lg:flex"
        >
          <CheveronRightIcon />
        </button>
      </div>
    </div>
  );
};
