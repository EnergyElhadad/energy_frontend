"use client";
import type { ProductT } from "@/shared/components/OfferCard";
import OfferCard from "@/shared/components/OfferCard";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

type ProductsT = {
  products: ProductT[];
};

export const OffersSwipper: React.FC<ProductsT> = ({ products }) => {
  return (
    <div className="swiperWrapper relative lg:hidden">
      <Swiper
        loop={false}
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          550: { slidesPerView: 2 },
          700: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
        }}
        className="category-swiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <OfferCard {...product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default OffersSwipper;
