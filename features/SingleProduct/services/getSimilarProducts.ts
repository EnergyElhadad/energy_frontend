import { Axios } from "@/core/lib/axios-server";
import { Product } from "@/shared/types/product";

export const getSimilarProducts = async (productId: number): Promise<Product[]> => {
  const axios = await Axios();
  const response = await axios.get<{ result: Product[] }>(
    `/products/items/${productId}/similar/`
  );

  return response.data.result;
};
