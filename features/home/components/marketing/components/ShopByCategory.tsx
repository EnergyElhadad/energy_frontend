"use client";

import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import HeaderSection from "@/shared/components/HeaderSection";
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
  { id: 6, name: "كابلات", image: "/images/category/cat-3.webp" },
];

export default function ShopByCategory() {
  return (
    <section className="relative container overflow-x-hidden py-16">
      <HeaderSection title="تسوق حسب الفئة" textlink="عرض الكل" urlLink="#" />
      <div className="swiperWrapper relative">
        <Swiper
          modules={[Navigation]}
          loop={false}
          navigation={{
            nextEl: ".category-next",
            prevEl: ".category-prev",
          }}
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            400: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1250: { slidesPerView: 6 },
          }}
          className="category-swiper"
        >
          {categories.map((item) => (
            <SwiperSlide key={item.id}>
              <Link href={"#"}>
                <div className="border-Stroke hover:border-primary mx-auto max-w-43.5 cursor-pointer rounded-2xl border bg-white px-5 py-6 text-center transition hover:shadow-md">
                  <div className="relative mx-auto mb-2 flex h-33.75 w-33.75 items-center justify-center overflow-hidden rounded-full bg-black/4">
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
            className="category-prev text-primary border-primary absolute top-1/2 left-[-13] z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border hover:bg-white/20 md:flex"
          >
            <ArrowLeftIcon />
          </button>

          <button
            aria-label="Next category"
            className="category-next text-primary border-primary absolute top-1/2 right-[-13] z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border hover:bg-white/20 md:flex"
          >
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </section>
  );
}
