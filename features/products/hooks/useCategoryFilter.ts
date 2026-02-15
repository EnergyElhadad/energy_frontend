"use client";

import { useSearchParams,useRouter } from "next/navigation";



export const useCategoryFilter = () => {


  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryToggle = (id: string, name: string) => {
    const current = new URLSearchParams(searchParams.toString());

    if (!id || id === 'all') {
      current.delete('categoryId');
      current.delete('categoryName');
    } else {
      current.set('categoryId', id);
      current.set('categoryName', name);
    }

    router.push(`?${current.toString()}`);
  };
  

  return {
 handleCategoryToggle
  };
};
