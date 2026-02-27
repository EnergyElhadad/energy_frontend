'use client';

import { useState, useEffect } from 'react';

import { MinusIcon } from '@/shared/components/icons/Minus';
import { PlusIcon } from '@/shared/components/icons/Plus';

export interface CounterProps {
  value: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  variant?: 'default' | 'large';
  onLimitReached?: () => void;
}

const variantStyles = {
  default: {
    container: 'h-9 sm:h-[40px] rounded-[8px]',
    button: 'w-9 sm:w-[45px] h-9 sm:h-[40px] text-sm',
    value: 'w-9 sm:w-[45px] h-9 sm:h-[40px] text-[13px] sm:text-[14px]',
  },

  large: {
    container: 'h-[25px]   sm:h-[30px] md:h-[50px] bg-white rounded-[4px]',
    button: 'w-8 h-[25px] sm:w-10 sm:h-[30px]  md:w-14 md:h-[50px] text-[10px]  sm:text-sm md:text-base',
    value: ' w-8 h-[25px]   sm:w-10 sm:h-[30px]   md:w-17 md:h-[50px] text-[10px] sm:text-sm md:text-base',
  },
};

export const Counter = ({ value, onChange, min = 1, max, variant = 'default', onLimitReached }: CounterProps) => {
  const styles = variantStyles[variant];

  const handleIncrease = () => {
    if (max !== undefined && value >= max) {
      if (onLimitReached) onLimitReached();
      return;
    }
    if (max === undefined || value < max) {
      onChange?.(value + 1);
    }
  };

  const handleDecrease = () => {
    if (value > min) {
      onChange?.(value - 1);
    }
  };

  const [inputValue, setInputValue] = useState(value.toString());

  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    if (val !== '') {
      const parsed = parseInt(val, 10);
      if (!isNaN(parsed)) {
        if (max !== undefined && parsed > max) {
          onChange?.(max);
          if (onLimitReached) onLimitReached();
        } else if (parsed >= min) {
          onChange?.(parsed);
        }
      }
    }
  };

  const handleBlur = () => {
    let parsed = parseInt(inputValue, 10);
    if (isNaN(parsed) || parsed < min) {
      parsed = min;
    } else if (max !== undefined && parsed > max) {
      parsed = max;
      if (onLimitReached) onLimitReached();
    }
    onChange?.(parsed);
    setInputValue(parsed.toString());
  };

  return (
    <div className={`border-Stroke flex w-fit items-center border ${styles.container}`}>
      <button
        onClick={handleIncrease}
        className={`border-Stroke flex cursor-pointer items-center justify-center border-e transition-all duration-300 ease-in-out hover:bg-[#F5F5F5] hover:text-[#000] ${styles.button}`}
      >
        <PlusIcon />
      </button>
      <div className={`flex items-center justify-center overflow-hidden ${styles.value}`}>
        <input
          type="number"
          min={min}
          max={max}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          className="m-0 w-full [appearance:textfield] bg-transparent p-0 text-center outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
      </div>
      <button
        onClick={handleDecrease}
        className={`border-Stroke flex cursor-pointer items-center justify-center border-s transition-all duration-300 ease-in-out hover:bg-[#F5F5F5] hover:text-[#000] ${styles.button}`}
      >
        <MinusIcon />
      </button>
    </div>
  );
};
