import { Axios } from '@/core/lib/axios';
import { AutocompleteResponse } from '../types/autocompleteResponse';

export const getAutocomplete = async (search: string): Promise<AutocompleteResponse> => {
  const response = await Axios.get<AutocompleteResponse>(`/products/autocomplete/`, {
    params: { search },
  });

  return response.data;
};
