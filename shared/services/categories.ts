import { Axios } from "@/core/lib/axios";
import { Category } from "@/shared/types/category";

export interface CategoriesResponse {
  result: Category[];
  status: boolean;
  message: string;
  next: string | null;
  prev: string | null;
  current_page: number;
  num_pages: number;
  count: number;
}

export const getCategories = async (
  page: number = 1,
): Promise<CategoriesResponse> => {
  try {
    const { data } = await Axios.get<CategoriesResponse>(
      `/products/categories/`,
      {
        params: {
          page,
        },
      },
    );
    return data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return {
      result: [],
      status: false,
      message: "Failed to fetch categories",
      next: null,
      prev: null,
      current_page: 1,
      num_pages: 1,
      count: 0,
    };
  }
};
