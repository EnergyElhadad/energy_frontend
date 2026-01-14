"use client";

import { MinusIcon } from "@/shared/components/icons/Minus";
import { PlusIcon } from "@/shared/components/icons/Plus";

interface CounterProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  variant?: "default" | "large";
}

const variantStyles = {
  default: {
    container: "h-9 sm:h-[40px] rounded-[8px]",
    button: "w-9 sm:w-[45px] h-9 sm:h-[40px]",
    value: "w-9 sm:w-[45px] h-9 sm:h-[40px] text-[13px] sm:text-[14px]",
  },

  large: {
    container: "h-[50px] bg-white rounded-[4px]",
    button: "w-14 h-[50px]",
    value: "w-17 h-[50px] text-[16px]",
  },
};

export const Counter = ({
  value,
  onChange,
  min = 1,
  max,
  variant = "default",
}: CounterProps) => {
  const styles = variantStyles[variant];

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
    <div
      className={`border-Stroke flex w-fit items-center border ${styles.container}`}
    >
      <button
        onClick={handleIncrease}
        className={`border-Stroke flex cursor-pointer items-center justify-center border-e transition-all duration-300 ease-in-out hover:bg-[#F5F5F5] hover:text-[#000] ${styles.button}`}
      >
        <PlusIcon />
      </button>
      <div className={`flex items-center justify-center ${styles.value}`}>
        <span>{value}</span>
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
