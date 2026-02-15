"use client";
import React from "react";
import { useProductSlider } from "./hooks/useProductSlider";
import { ThumbsSwiper } from "./components/ThumbsSwiper";
import { MainSwiper } from "./components/MainSwiper";
import { Lightbox } from "./components/Lightbox";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

const ProductSlider: React.FC<{ images: string[]; name: string }> = ({
  images,
  name,
}) => {
  const {
    thumbsSwiper,
    setThumbsSwiper,
    activeIndex,
    handleSlideChange,
    isPopupOpen,
    openPopup,
    closePopup,
  } = useProductSlider();

  return (
    <div className="flex gap-4">
      <ThumbsSwiper
        images={images}
        setThumbsSwiper={setThumbsSwiper}
        activeIndex={activeIndex}
      />

      <MainSwiper
        images={images}
        name={name}
        thumbsSwiper={thumbsSwiper}
        onSlideChange={handleSlideChange}
        onOpenPopup={openPopup}
      />

      <Lightbox
        image={images[activeIndex]}
        isOpen={isPopupOpen}
        onClose={closePopup}
      />
    </div>
  );
};

export default ProductSlider;
