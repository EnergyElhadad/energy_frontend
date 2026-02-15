import { useSearchParams,useRouter } from "next/navigation";
import {useState } from "react";

export const usePriceRange = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const minFromUrl = Number(searchParams.get("min_price")) || 0;
  const maxFromUrl = Number(searchParams.get("max_price")) || 1000000;

  const [priceRange, setPriceRange] = useState<[number, number]>([
    minFromUrl,
    maxFromUrl,
  ]);

  

  const updateUrl = (min: number, max: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (min > 0) {
      params.set("min_price", String(min));
    } else {
      params.delete("min_price");
    }
    if (max < 1000000) {
      params.set("max_price", String(max));
    } else {
      params.delete("max_price");
    }

    router.push(`?${params.toString()}`);
  };

  const handlePriceRangeChange = (value: number[]) => {
    updateUrl(value[0], value[1]);
    setPriceRange([value[0], value[1]]);
  };

  const handlePriceInputChange = (type: "min" | "max", value: number) => {
    setPriceRange(prev => {
      const range: [number, number] = [...prev];
      if (type === "min") {
        range[0] = Math.min(value, range[1]);
      } else {
        range[1] = Math.max(value, range[0]);
      }

      updateUrl(range[0], range[1]);
      return range;
    });
  };

  const resetPriceRange = () => {
  const DEFAULT_MIN = 5000;
  const DEFAULT_MAX = 10000;

  setPriceRange([DEFAULT_MIN, DEFAULT_MAX]);

  const params = new URLSearchParams(searchParams.toString());
  params.delete("min_price");
  params.delete("max_price");

  router.push(`?${params.toString()}`);
};

  return {
    priceRange,
    resetPriceRange,
    handlePriceRangeChange,
    handlePriceInputChange,
  };
};
