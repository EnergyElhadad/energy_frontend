
import axios from "axios";
import { ProductData } from "../types";

export const getProductById = async (
  id: number
): Promise<ProductData> => {
  const res = await axios.get(`/products/items/${id}/`);
  return res.data.result as ProductData;
};
