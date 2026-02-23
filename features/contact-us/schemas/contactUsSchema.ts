import * as z from 'zod';

export const createContactUsSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(2, t('invalid_name')),
    email: z.string().email(t('invalid_email')),
    phone_number: z.string().regex(/^(01[0125][0-9]{8}|201[0125][0-9]{8})$/, t('invalid_phone_number')),
    message: z.string().min(10, t('invalid_message')),
  });

export type ContactUsValues = z.infer<ReturnType<typeof createContactUsSchema>>;
