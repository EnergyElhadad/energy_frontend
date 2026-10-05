'use client';

import { useEffect, useState } from 'react';
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

// Slides 2..N are mounted only after the page has loaded and the main thread
// is idle. Native loading="lazy" uses a ~1250px+ distance threshold, so a slide
// sitting just off-screen beside slide 1 would otherwise start downloading
// immediately and compete with the LCP image.
const useDeferredMount = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const schedule = () => {
      if ('requestIdleCallback' in window) idleId = window.requestIdleCallback(() => setReady(true), { timeout: 2000 });
      else timeoutId = setTimeout(() => setReady(true), 1500);
    };

    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });

    return () => {
      window.removeEventListener('load', schedule);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  return ready;
};

export const Hero: React.FC<HeroProps> = ({ data }) => {
  const showAllSlides = useDeferredMount();
  const slides = showAllSlides ? data : data?.slice(0, 1);

  return (
    <section className="relative w-full overflow-hidden">
      <div className="group relative aspect-square lg:aspect-1440/405">
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
          className="h-full w-full"
        >
          {slides?.map((item, index) => (
            <SwiperSlide key={item.id}>
              <HeroContent
                title={item.title}
                imageUrl={item.image}
                mobileImageUrl={item.mobile_image}
                linkUrl={item.link}
                linkText={item.button}
                description={item.banner_text}
                // First slide is the LCP candidate — priority preloads it. Every
                // other slide is offscreen behind Swiper's transform, so leave
                // them at the default (lazy).
                priority={index === 0}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation */}
        <button
          aria-label="Previous slide"
          className="hero-prev absolute top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 text-white opacity-0 transition-opacity hover:bg-white/20 group-hover:opacity-100 xl:left-6 xl:flex"
        >
          <ArrowLeftIcon />
        </button>

        <button
          aria-label="Next slide"
          className="hero-next absolute top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 text-white opacity-0 transition-opacity hover:bg-white/20 group-hover:opacity-100 xl:right-6 xl:flex"
        >
          <ArrowRightIcon />
        </button>

        {/* Pagination */}
        <div className="hero-pagination absolute bottom-6! z-50! flex w-fit! -translate-x-1/2! gap-2 space-x-0 ltr:right-1/2! ltr:left-1/2! rtl:right-1/2! rtl:left-1/2!" />
      </div>
    </section>
  );
};
