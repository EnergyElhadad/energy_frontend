import { Axios } from '@/core/lib/axios';

export type SignupValues = {
  full_name: string;
  phone_number: string;
  email: string;
  password: string;
  confirm_password: string;
};

export async function trySignup(formData: SignupValues) {
  try {
    const response = await Axios.post('/users/register/', formData);
    return response.data;
  } catch (error) {
    throw error;
  }
}
