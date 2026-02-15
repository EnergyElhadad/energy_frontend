"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useSearchProduct = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") ?? "";

  const setSearch = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (!value) {
        params.delete("search");
      } else {
        params.set("search", value);
      }

      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  return {
    search,
    setSearch,
  };
};
