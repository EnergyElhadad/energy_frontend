import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { createContactUsSchema, ContactUsValues } from '../schemas/contactUsSchema';
import { tryContactUs } from '../services/contactUs';
import { isAxiosError } from 'axios';

export function useContactUs() {
  const t = useTranslations('ContactUs');

  const contactUsSchema = createContactUsSchema(t);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactUsValues>({
    resolver: zodResolver(contactUsSchema),
  });

  const onSubmit = async (data: ContactUsValues) => {
    try {
      const response = await tryContactUs(data);
      if (response.status) {
        toast.success(response.message || t('success_message'));
        reset();
      } else {
        toast.error(response.message || t('error_message'));
      }
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const { message } = error.response?.data || {};
        if (message) toast.error(message);
        else toast.error(t('error_message'));
      } else {
        toast.error(t('error_message'));
      }
    }
  };

  return {
    t,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
  };
}
