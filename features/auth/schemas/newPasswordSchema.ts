import * as z from 'zod';

export const createNewPasswordSchema = (t: (key: string) => string) =>
  z
    .object({
      new_password: z.string().min(8, t('password_min_length')),
      confirm_password: z.string().min(8, t('password_min_length')),
    })
    .refine(data => data.new_password === data.confirm_password, {
      message: t('passwords_do_not_match'),
      path: ['confirm_password'],
    });

export type NewPasswordValues = z.infer<ReturnType<typeof createNewPasswordSchema>>;
