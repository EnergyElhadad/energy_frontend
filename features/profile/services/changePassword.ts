import { Axios } from '@/core/lib/axios';
import { ChangePasswordPayload, ChangePasswordResponse } from './types';

export const changePassword = async (data: ChangePasswordPayload, token: string) => {
  const response = await Axios.post<ChangePasswordResponse>('/users/profile/password/', data, {
    headers: {
      Authorization: `token ${token}`,
    },
  });
  return response.data;
};
