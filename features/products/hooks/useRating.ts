import { useState } from "react";

export const useRating = () => {
  const [selectedRating, setSelectedRating] = useState<number>(0); 

  const handleRatingChange = (rating: number | string) => {
    setSelectedRating(Number(rating));
  };

  return {
    selectedRating,
    handleRatingChange,
  };
};
