import { Axios } from "@/core/lib/axios";
import { ProductsResponse } from "@/features/products/types/productsResponse";
import { ProductsQueryParams } from "../types/productsQueryParams";

export const getProducts = async (
  params: ProductsQueryParams = {}
): Promise<ProductsResponse> => {


  const response = await Axios.get<ProductsResponse>(
    `/products/items/`,
    {
      params,
    }
  );

  return response.data;
};
