import * as z from 'zod';
import { useRouter } from '@/core/i18n';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { createSigninSchema } from '../schemas/signinSchema';
import { isAxiosError } from 'axios';

export function useSignin() {
  const t = useTranslations('Auth');
  const router = useRouter();

  const signInSchema = createSigninSchema(t);

  type SignInValues = z.infer<typeof signInSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInValues) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        phone_number: data.phone_number,
        password: data.password,
      });

      if (result?.error) {
        toast.error(t('invalid_credentials'));
        return;
      }

      router.refresh();
      router.push('/');
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
