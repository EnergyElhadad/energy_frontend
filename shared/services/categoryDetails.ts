import { Axios } from "@/core/lib/axios";
import { Category } from "@/shared/types/category";

export const getCategoryDetails = async (
  id: number
): Promise<Category> => {
  try {
    const { data } = await Axios.get<{ result: Category }>(
      `/products/categories/${id}`
    );
    return data.result;
  } catch (error) {
    console.error("Failed to fetch category details:", error);
    throw error;
  }
};
