import { Axios } from '@/core/lib/axios';

export type ResetPasswordValues = {
  phone_number: string;
  otp: string;
  new_password: string;
};

export type ResetPasswordUser = {
  id: number;
  phone_number: string;
  first_name: string;
  last_name: string;
  email: string;
};

export type ResetPasswordResponse = {
  message: string;
  status: boolean;
  result?: {
    user: ResetPasswordUser;
  };
};

export async function tryResetPassword(formData: ResetPasswordValues): Promise<ResetPasswordResponse> {
  try {
    const response = await Axios.post<ResetPasswordResponse>('/users/auth/password/reset/confirm/', formData);
    return response.data;
  } catch (error) {
    throw error;
  }
}
