import Rating from '@/features/home/components/CustomerReviews/components/Rating';
import { Label } from '@/shared/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group';
import { useRating } from '../../../hooks/useRating';

import React from 'react';

interface RatingOption {
  label: string;
  stars: number;
  count: number;
}

interface RatingFilterProps {
  ratingOptions: RatingOption[];
}

export const RatingFilter: React.FC<RatingFilterProps> = ({ ratingOptions }) => {
  const { selectedRating, handleRatingChange } = useRating();

  return (
    <div className="space-y-2">
      <RadioGroup value={selectedRating.toString()} onValueChange={value => handleRatingChange(Number(value))} className="group w-full">
        {ratingOptions.map(option => {
          return (
            <div key={option.stars} className="flex items-center gap-2">
              <RadioGroupItem value={option.stars.toString()} id={`rating-${option.stars}`} className="size-4.5" />
              <div className="flex flex-1 items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label htmlFor={`rating-${option.stars}`} className="group flex cursor-pointer items-center gap-2 py-1">
                    {option.stars > 0 ? <Rating rating={option.stars} /> : <span className="text-darkGray text-sm">{option.label}</span>}
                  </Label>
                </div>
                <span className="text-xs text-[#666]">({option.count})</span>
              </div>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};
