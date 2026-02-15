import * as z from 'zod';

export const createSignupSchema = (t: (key: string) => string) =>
  z
    .object({
      full_name: z.string().min(2, t('name_required')),
      phone_number: z.string().regex(/^(01[0125][0-9]{8}|201[0125][0-9]{8})$/, t('invalid_phone_number')),
      email: z.string().email(t('invalid_email')),
      password: z.string().min(8, t('password_min_length')),
      confirm_password: z.string().min(8, t('password_min_length')),
      terms: z.literal(true, {
        message: t('terms_required'),
      }),
    })
    .refine(data => data.password === data.confirm_password, {
      message: t('passwords_do_not_match'),
      path: ['confirm_password'],
    });

export type SignupValues = z.infer<ReturnType<typeof createSignupSchema>>;
