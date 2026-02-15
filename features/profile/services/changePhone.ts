import { Axios } from '@/core/lib/axios';
import { RequestChangePhonePayload, ConfirmChangePhonePayload, RequestChangePhoneResponse, ConfirmChangePhoneResponse } from './types';

export const requestChangePhone = async (data: RequestChangePhonePayload, token: string) => {
  const response = await Axios.post<RequestChangePhoneResponse>('/users/profile/phone/request/', data, {
    headers: {
      Authorization: `token ${token}`,
    },
  });
  return response.data;
};

export const confirmChangePhone = async (data: ConfirmChangePhonePayload, token: string) => {
  const response = await Axios.post<ConfirmChangePhoneResponse>('/users/profile/phone/confirm/', data, {
    headers: {
      Authorization: `token ${token}`,
    },
  });
  return response.data;
};
