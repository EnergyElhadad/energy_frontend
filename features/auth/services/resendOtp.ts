import { Axios } from '@/core/lib/axios';

export type ResendOtpValues = {
  phone_number: string;
};

export type ResendOtpResponse = {
  message: string;
  status: boolean;
  phone_number?: string[];
};

export async function tryResendOtp(formData: ResendOtpValues): Promise<ResendOtpResponse> {
  try {
    const response = await Axios.post<ResendOtpResponse>('/users/resend-otp/', formData);
    return response.data;
  } catch (error) {
    throw error;
  }
}
