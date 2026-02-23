import { Axios } from '@/core/lib/axios';
import { ContactUsValues } from '../schemas/contactUsSchema';

export async function tryContactUs(formData: ContactUsValues) {
  try {
    const response = await Axios.post('/content/contact-us/', formData);
    return response.data;
  } catch (error) {
    throw error;
  }
}
