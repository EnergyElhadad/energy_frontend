'use client';

import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { HeaderSection } from '@/shared/components/ui/HeaderSection';
import { ArrowLeftIcon } from '@/shared/components/icons/ArrowLeft';
import { ArrowRightIcon } from '@/shared/components/icons/ArrowRight';
import 'swiper/css';
import 'swiper/css/navigation';
import { CategoryCard } from '@/features/categories/components/CategoryCard';
import { Category } from '@/shared/types/category';
import { useTranslations } from 'next-intl';

export const ShopByCategory = ({ categories }: { categories: Category[] }) => {
  const t = useTranslations('HomePage');
  return (
    <section className="relative container py-16">
      <HeaderSection title={t('shop_by_category')} textlink={t('view_all')} urlLink="/categories" />
      <div className="swiperWrapper relative">
        <Swiper
          modules={[Navigation]}
          autoplay={{ delay: 5000 }}
          loop={false}
          navigation={{
            nextEl: '.category-next',
            prevEl: '.category-prev',
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
          {categories.map(({ id, name, image }) => (
            <SwiperSlide key={id}>
              <CategoryCard name={name} image={image || ''} id={id} />
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
