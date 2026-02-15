import { Axios } from '@/core/lib/axios';

export interface City {
  id: number;
  name: string;
}

export interface Address {
  id: number;
  city: City;
  area: string;
  street: string;
  building: string;
  apartment: string;
  notes: string;
  is_default: boolean;
  created_at: string;
}

// API returns an array of addresses directly
export type AddressesResponse = Address[];

export const getAddresses = async (): Promise<AddressesResponse> => {
  const res = await Axios.get('/addresses/');
  return res.data;
};

export interface AddAddressPayload {
  city_id: number;
  area: string;
  street: string;
  building: string;
  apartment: string;
  notes: string;
  is_default: boolean;
}

export const addAddress = async (data: AddAddressPayload) => {
  const res = await Axios.post('/addresses/', data);
  return res.data;
};

export const deleteAddress = async (id: number) => {
  const res = await Axios.delete(`/addresses/${id}/`);
  return res.data;
};

export const updateAddress = async (id: number, data: AddAddressPayload) => {
  const res = await Axios.patch(`/addresses/${id}/`, data);
  return res.data;
};

export const getAddress = async (id: number): Promise<Address> => {
  const res = await Axios.get(`/addresses/${id}/`);
  return res.data;
};
