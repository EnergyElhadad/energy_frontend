"use client";

import { useState } from "react";
interface RatingOption {
  label: string;
  stars: number;
  count: number;
}

interface FilterOptions {
  priceRange: [number, number];
  categories: string[];
  ratings: number[];
  searchQuery: string;
}

interface RatingOption {
  label: string;
  stars: number;
  count: number;
}


export const useSidebarProducts = ({onFilterChange}:{onFilterChange?: (filters: FilterOptions) => void}) => {

  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [5000, 50000],
    categories: ["الكل"],
    ratings: [],
    searchQuery: "",
  });

  const [showAllCategories, setShowAllCategories] = useState(false);


  const handlePriceInputChange: (type: "min" | "max", value: number) => void = (
    type: "min" | "max",
    value: number,
  ) => {
    const newRange = [...filters.priceRange] as [number, number];
    if (type === "min") {
      newRange[0] = Math.min(value, filters.priceRange[1]);
    } else {
      newRange[1] = Math.max(value, filters.priceRange[0]);
    }
    const updated = { ...filters, priceRange: newRange };
    setFilters(updated);
    onFilterChange?.(updated);
  };

const handleCategoryToggle = (category: string) => {
  const updated = {
    ...filters,
    categories: [category],
  };

  setFilters(updated);
  onFilterChange?.(updated);
};


const handleRatingToggle = (rating: number) => {
  const updated = {
    ...filters,
    ratings: [rating],
  };

  setFilters(updated);
  onFilterChange?.(updated);
};


  const handleSearchChange = (query: string) => {
    const updated = { ...filters, searchQuery: query };
    setFilters(updated);
    onFilterChange?.(updated);
  };

  const categories = [
      {id:"1", label: "الكل", count: 100 },
      {id:"2", label:   "لمبات LED", count: 60 },
      {id:"3", label:  "شواحن", count: 25 },
      {id:"4", label:   "فيش ومقابس", count: 30 },
      {id:"5", label:  "كابلات", count: 36 },
      {id:"6", label:"شاشات", count: 10 },
      {id:"7", label: "سلوك", count: 35 },
      {id:"8", label:   " مقابس", count: 46 },
  ];

  const visibleCategories = showAllCategories
    ? categories
    : categories.slice(0, 4);

  const ratingOptions: RatingOption[] = [
    { label: "الكل", stars: 0, count: 100 },
    { label: "5 نجوم", stars: 5, count: 32 },
    { label: "4 نجوم", stars: 4, count: 36 },
    { label: "3 نجوم", stars: 3, count: 21 },
    { label: "نجمتين", stars: 2, count: 2 },
  ];

  return {
  setShowAllCategories,
onFilterChange,
handlePriceInputChange,
handleCategoryToggle,
handleRatingToggle,
handleSearchChange,
visibleCategories,
ratingOptions,
filters,
showAllCategories,
categories,
  };
};
