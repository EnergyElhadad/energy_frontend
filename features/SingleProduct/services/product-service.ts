import { Axios } from "@/core/lib/axios-server";
import { ProductData } from "../types";
import { cache } from "react";

export const getProductById = cache(
  async (id: string): Promise<ProductData> => {
    const axios = await Axios();
    const res = await axios(`/products/items/${id}`);
    return res.data.result as ProductData;
  },
);
