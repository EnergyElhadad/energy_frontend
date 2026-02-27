import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { trySignup } from '../services/signup';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';
import { signUpDefaultValues } from '../constants/signUpDefaultValues';
import { useRouter } from '@/core/i18n';
import { createSignupSchema, SignupValues } from '../schemas/signupSchema';
import { useFormPersistence } from '@/shared/hooks/useFormPersistence';

const STORAGE_KEY = 'signup_form_data';

export function useSignup() {
  const t = useTranslations('Auth');
  const router = useRouter();
  const signupSchema = createSignupSchema(t);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: signUpDefaultValues,
  });

  const watchedValues = useFormPersistence({
    control,
    setValue,
    storageKey: STORAGE_KEY,
    exclude: ['password', 'confirm_password', 'terms'],
  });

  const onSubmit = async (data: SignupValues) => {
    try {
      await trySignup(data);
      localStorage.setItem('verify_phone_number', data.phone_number);
      router.push('/verify-otp');
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const { password, phone_number, email, message, confirm_password } = error.response?.data || {};
        if (password) setError('password', { message: password });
        if (phone_number) setError('phone_number', { message: phone_number });
        if (email) setError('email', { message: email });
        if (confirm_password) setError('confirm_password', { message: confirm_password });
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
    phone_number: watchedValues.phone_number,
  };
}
