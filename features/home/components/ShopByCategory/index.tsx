"use client";

import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { HeaderSection } from "@/shared/components/ui/HeaderSection";
import { ArrowLeftIcon } from "@/shared/components/icons/ArrowLeft";
import { ArrowRightIcon } from "@/shared/components/icons/ArrowRight";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";

const categories = [
  { id: 1, name: "سماعات", image: "/images/category/cat-1.webp" },
  { id: 2, name: "ساعات", image: "/images/category/cat-2.webp" },
  { id: 3, name: "شواحن", image: "/images/category/cat-2.webp" },
  { id: 4, name: "كابلات", image: "/images/category/cat-1.webp" },
  { id: 5, name: "سماعات", image: "/images/category/cat-2.webp" },
  { id: 7, name: "كابلات", image: "/images/category/cat-3.webp" },
  { id: 8, name: "كابلات", image: "/images/category/cat-3.webp" },
  { id: 9, name: "كابلات", image: "/images/category/cat-3.webp" },
];

export const ShopByCategory = () => {
  return (
    <section className="relative container py-16">
      <HeaderSection title="تسوق حسب الفئة" textlink="عرض الكل" urlLink="#" />
      <div className="swiperWrapper relative">
        <Swiper
          modules={[Navigation]}
          autoplay={{ delay: 5000 }}
          loop={false}
          navigation={{
            nextEl: ".category-next",
            prevEl: ".category-prev",
          }}
          spaceBetween={8}
          slidesPerView={1}
          breakpoints={{
            370: { slidesPerView: 2.4 },
            400: { slidesPerView: 2.5 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1250: { slidesPerView: 6 },
          }}
          className="category-swiper"
        >
          {categories.map((item) => (
            <SwiperSlide key={item.id}>
              <Link href={"#"}>
                <div className="border-Stroke hover:border-primary mx-auto max-w-43.5 cursor-pointer rounded-2xl border bg-white px-4 py-5 text-center transition hover:shadow-md md:px-5 md:py-6">
                  <div className="relative mx-auto mb-2 flex h-26 w-26 items-center justify-center overflow-hidden rounded-full bg-black/4 md:h-33.75 md:w-33.75">
                    <Image
                      src={item.image}
                      alt={item.name}
                      className="absolute inset-0 m-auto max-h-full max-w-full"
                      width={135}
                      height={135}
                    />
                  </div>

                  <p className="text-xl font-semibold text-black">
                    {item.name}
                  </p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Navigation */}
        <div className="catetgory-navigation-wrapper">
          <button
            aria-label="Previous category"
            className="category-prev text-primary border-primary absolute top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border hover:bg-white/20 lg:left-0 lg:flex xl:-left-21"
          >
            <ArrowLeftIcon />
          </button>

          <button
            aria-label="Next category"
            className="category-next text-primary border-primary absolute top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border hover:bg-white/20 lg:right-0 lg:flex xl:-right-21"
          >
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </section>
  );
};
