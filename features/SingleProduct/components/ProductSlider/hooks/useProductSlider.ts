import { useState } from "react";
import type { SwiperClass } from "swiper/react";

export const useProductSlider = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleSlideChange = (swiper: SwiperClass) => {
    setActiveIndex(swiper.activeIndex);
  };

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return {
    thumbsSwiper,
    setThumbsSwiper,
    activeIndex,
    handleSlideChange,
    isPopupOpen,
    openPopup,
    closePopup,
  };
};
