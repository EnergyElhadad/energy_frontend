import React from 'react';
import { Slider } from '@/shared/components/ui/slider';
import { DisplayPrice } from './components/DisplayPrice';
import { useLocale } from 'next-intl';

interface PriceFilterProps {
  priceRange: [number, number];
  onPriceChange: (value: number[]) => void;
  onPriceInputChange: (type: 'min' | 'max', value: number) => void;
}

export const PriceFilter: React.FC<PriceFilterProps> = ({ priceRange, onPriceChange, onPriceInputChange }) => {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <Slider dir={isRTL ? 'rtl' : 'ltr'} max={1000000} min={0} onValueChange={onPriceChange} value={priceRange} className="py-6" />
      <DisplayPrice
        fromValue={priceRange[0]}
        toValue={priceRange[1]}
        onChangeFrom={e => {
          const val = Math.max(0, Math.min(1000000, parseInt(e.target.value) || 0));
          onPriceInputChange('min', val);
        }}
        onChangeTo={e => {
          const val = Math.max(0, Math.min(1000000, parseInt(e.target.value) || 0));
          onPriceInputChange('max', val);
        }}
        min={0}
        max={1000000}
      />
    </div>
  );
};
