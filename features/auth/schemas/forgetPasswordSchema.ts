import * as z from 'zod';

export const createForgetPasswordSchema = (t: (key: string) => string) =>
  z.object({
    phone_number: z.string().regex(/^(01[0125][0-9]{8}|201[0125][0-9]{8})$/, t('invalid_phone_number')),
  });

export type ForgetPasswordValues = z.infer<ReturnType<typeof createForgetPasswordSchema>>;
