import { Axios } from '@/core/lib/axios';
import { VerifyOtpValues, VerifyOtpResponse } from './verifyOtp';

export async function tryVerifyForgotPasswordOtp(formData: VerifyOtpValues): Promise<VerifyOtpResponse> {
  try {
    const response = await Axios.post<VerifyOtpResponse>('/users/verify/otp/', formData);
    return response.data;
  } catch (error) {
    throw error;
  }
}
