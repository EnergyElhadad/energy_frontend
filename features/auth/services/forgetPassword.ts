import { Axios } from '@/core/lib/axios';
import { ForgetPasswordValues } from '../schemas/forgetPasswordSchema';

export async function tryForgetPassword(formData: ForgetPasswordValues) {
  try {
    const response = await Axios.post('/users/auth/password/reset/request/', formData);
    return response.data;
  } catch (error) {
    throw error;
  }
}
