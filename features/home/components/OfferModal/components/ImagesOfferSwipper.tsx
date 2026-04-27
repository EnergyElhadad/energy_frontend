import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { CheveronLeftIcon } from '@/shared/components/icons/CheveronLeft';
import { CheveronRightIcon } from '@/shared/components/icons/CheveronRight';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';

type Image = {
  id: number;
  image: string;
};

export const ImagesOfferSwipper = ({ images }: { images: Image[] }) => {
  console.log(images);
  return (
    <div className="swiperWrapper relative h-full w-full max-w-127.5 rounded-sm border border-[#eeeee] bg-white sm:max-h-111">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        loop={false}
        // autoplay={{ delay: 5000 }}
        navigation={{
          nextEl: '.imageOffer-next',
          prevEl: '.imageOffer-prev',
        }}
        pagination={{
          el: '.imageOffer-pagination ',
          clickable: true,
        }}
        spaceBetween={16}
        slidesPerView={1}
        className="imageOffer-swiper"
      >
        {images.map(image => (
          <SwiperSlide key={image.id} className="max-w-full">
            <div className="flex h-100 w-100 items-center justify-center">
              <Image src={image.image} alt={'image'} fill className="" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination */}

      <div className="imageOffer-pagination -translate-x-[calc(50% + 32px)]! absolute bottom-4! z-50! flex w-fit! gap-2 space-x-0 ltr:right-1/2! ltr:left-1/2! rtl:right-1/2! rtl:left-1/2!" />

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
