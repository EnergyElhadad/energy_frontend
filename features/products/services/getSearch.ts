import { Axios } from "@/core/lib/axios";
import { SearchQueryParams } from "../types/searchQueryParams";
import { SearchResponse } from "../types/searchResponse";

export const getSearch = async (
  params: SearchQueryParams
): Promise<SearchResponse> => {
  const response = await Axios.get<SearchResponse>(
    "/products/autocomplete/",
    {
      params,
    }
  );

  return response.data;
};
