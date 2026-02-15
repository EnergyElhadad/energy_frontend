import { Axios } from '@/core/lib/axios';

export const updateProfile = async (
  data: {
    full_name?: string;
    email?: string;
  },
  token: string
) => {
  const response = await Axios.patch('/users/profile/update/', data, {
    headers: {
      Authorization: `token ${token}`,
    },
  });
  return response.data;
};
