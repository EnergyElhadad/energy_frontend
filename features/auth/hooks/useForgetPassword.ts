import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { createForgetPasswordSchema, ForgetPasswordValues } from '../schemas/forgetPasswordSchema';
import { tryForgetPassword } from '../services/forgetPassword';
import { isAxiosError } from 'axios';
import { useRouter } from '@/core/i18n';

export function useForgetPassword() {
  const t = useTranslations('Auth');
  const router = useRouter();

  const forgetPasswordSchema = createForgetPasswordSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgetPasswordValues>({
    resolver: zodResolver(forgetPasswordSchema),
  });

  const onSubmit = async (data: ForgetPasswordValues) => {
    try {
      await tryForgetPassword(data);
      localStorage.setItem('verify_phone_number', data.phone_number);
      toast.success(t('otp_sent_successfully'));
      router.push('/verify-forgot-password');
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const { message } = error.response?.data || {};
        if (message) toast.error(message);
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
