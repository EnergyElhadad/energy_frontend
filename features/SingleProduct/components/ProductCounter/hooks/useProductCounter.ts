import { useState, useEffect } from "react";

interface UseProductCounterProps {
  initialValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

export const useProductCounter = ({
  initialValue = 1,
  min = 1,
  max = 100,
  onChange,
}: UseProductCounterProps = {}) => {
  const [count, setCount] = useState(initialValue);

  // Sync internal state if initialValue changes
  useEffect(() => {
    setCount(initialValue);
  }, [initialValue]);

  const handleSequenceChange = (value: number) => {
    const newValue = Math.min(Math.max(value, min), max);
    setCount(newValue);
    onChange?.(newValue);
  };

  return {
    count,
    setCount: handleSequenceChange,
  };
};
