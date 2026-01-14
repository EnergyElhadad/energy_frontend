import Rating from "@/features/home/components/CustomerReviews/components/Rating";
import { HeartIcon } from "@/shared/components/icons/Heart";
import { ShareProductIcon } from "@/shared/components/icons/ShareProduct";
import React from "react";

export const Reviews = () => {
  return (
    <div className="mb-4 flex flex-wrap space-x-8 gap-y-2">
      <div className="flex space-x-2">
        <Rating rating={4} />
        <p className="text-signalGray text-sm font-normal">
          <span>(10) تقييمات</span>
        </p>
      </div>
      <div className="flex space-x-2 border-s ps-4">
        <div className="text-signalGray hover:text-primary cursor-pointer">
          <HeartIcon />
        </div>
        <p className="text-signalGray text-sm font-normal">أضف للمفضلة</p>
      </div>
      <div className="flex space-x-2 border-s ps-4">
        <div className="text-signalGray hover:text-primary cursor-pointer">
          <ShareProductIcon />
        </div>
        <p className="text-signalGray text-sm font-normal">مشاركة المنتج</p>
      </div>
    </div>
  );
};
