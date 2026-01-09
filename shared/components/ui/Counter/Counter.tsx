'use client';

import { MinusIcon } from '@/shared/components/icons/Minus';
import { PlusIcon } from '@/shared/components/icons/Plus';

interface CounterProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export const Counter = ({
  value,
  onChange,
  min = 1,
  max
}: CounterProps) => {
  const handleIncrease = () => {
    if (max === undefined || value < max) {
      onChange(value + 1);
    }
  };

  const handleDecrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  return (
    <div className="flex items-center border border-Stroke rounded-[8px] h-9 sm:h-[40px]">
      <button
        onClick={handleIncrease}
        className="flex items-center justify-center w-9 sm:w-[45px] h-9 sm:h-[40px] cursor-pointer border-e border-Stroke transition-all duration-300 ease-in-out hover:bg-[#F5F5F5] hover:text-[#000]"
      >
        <PlusIcon />
      </button>
      <div className="flex items-center justify-center w-9 sm:w-[45px] h-9 sm:h-[40px]">
        <span className="text-[13px] sm:text-[14px]">{value}</span>
      </div>
      <button
        onClick={handleDecrease}
        className="flex items-center justify-center w-9 sm:w-[45px] h-9 sm:h-[40px] cursor-pointer border-s border-Stroke transition-all duration-300 ease-in-out hover:bg-[#F5F5F5] hover:text-[#000]"
      >
        <MinusIcon />
      </button>
    </div>
  );
};
