import * as z from 'zod';

export const createSigninSchema = (t: (key: string) => string) =>
  z
    .object({
      phone_number: z.string().regex(/^(01[0125][0-9]{8}|201[0125][0-9]{8})$/, t('invalid_phone_number')),
      password: z.string().min(8, t('password_min_length')),
    });

export type SigninValues = z.infer<ReturnType<typeof createSigninSchema>>;
