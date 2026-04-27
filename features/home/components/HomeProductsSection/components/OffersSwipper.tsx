"use client";
import type { ProductT } from "@/shared/components/ProductCard";
import { ProductCard } from "@/shared/components/ProductCard";
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
        autoplay={{ delay: 5000 }}
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          370: { slidesPerView: 1.4 },
          400: { slidesPerView: 2 },
          550: { slidesPerView: 2 },
          700: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
        }}
        className="category-swiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard {...product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
