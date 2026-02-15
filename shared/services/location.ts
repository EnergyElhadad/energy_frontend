import { Axios } from '@/core/lib/axios';

export interface Country {
  id: number;
  name: string;
}

export interface City {
  id: number;
  name: string;
  country_id: number;
}

// Assuming similar structure for countries as cities
export const getCountries = async (): Promise<Country[]> => {
  const res = await Axios.get('/countries/');
  if (Array.isArray(res.data)) {
    return res.data;
  }
  if (res.data && Array.isArray(res.data.result)) {
    return res.data.result;
  }
  return [];
};

export const getCities = async (countryId: number): Promise<City[]> => {
  const res = await Axios.get(`/cities/?country_id=${countryId}`);
  if (Array.isArray(res.data)) {
    return res.data;
  }
  if (res.data && Array.isArray(res.data.result)) {
    return res.data.result;
  }
  if (res.data && Array.isArray(res.data.data)) {
    return res.data.data;
  }
  return [];
};
