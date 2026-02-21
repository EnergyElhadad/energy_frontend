import { Axios } from '@/core/lib/axios';

export type VerifyOtpValues = {
  phone_number: string;
  otp: string;
};

export type VerifyOtpResponse = {
  detail?: string;
  message?: string;
};

export async function tryVerifyOtp(formData: VerifyOtpValues): Promise<VerifyOtpResponse> {
  try {
    const response = await Axios.post<VerifyOtpResponse>('/users/verify/', formData);
    return response.data;
  } catch (error) {
    throw error;
  }
}
