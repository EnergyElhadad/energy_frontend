'use client';

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/Button';
import { PasswordInput } from '@/features/auth/components/PasswordInput';
import { useChangePassword } from '@/features/profile/hooks/useChangePassword';

const makeChangePasswordSchema = (t: ReturnType<typeof useTranslations<'Profile'>>) =>
  z
    .object({
      current_password: z.string().min(1, t('current_password_required')),
      new_password: z.string().min(8, t('new_password_min')),
      confirm_new_password: z.string().min(1, t('confirm_password_required')),
    })
    .refine(data => data.new_password === data.confirm_new_password, {
      message: t('passwords_not_match'),
      path: ['confirm_new_password'],
    });

type ChangePasswordFormValues = z.infer<ReturnType<typeof makeChangePasswordSchema>>;

interface ChangePasswordModalProps {
  trigger: React.ReactNode;
}

export const ChangePasswordModal = ({ trigger }: ChangePasswordModalProps) => {
  const t = useTranslations('Profile');
  const [open, setOpen] = useState(false);
  const { mutateAsync: changePassword, isPending } = useChangePassword();

  const schema = useMemo(() => makeChangePasswordSchema(t), [t]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ChangePasswordFormValues) => {
    try {
      await changePassword(data);
      reset();
      setOpen(false);
    } catch {
      // Error handling is done in the hook
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="flex max-w-[480px] flex-col rounded-3xl border-0 bg-white p-0 shadow-2xl">
        <DialogTitle className="sr-only">{t('change_password')}</DialogTitle>

        <div className="relative p-10">
          <h2 className="mb-2 text-sm font-semibold text-black">{t('change_password')}</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold" htmlFor="current_password">
                {t('current_password')}
              </label>
              <PasswordInput id="current_password" {...register('current_password')} className={errors.current_password ? 'border-red-500 focus:ring-red-500' : ''} />
              {errors.current_password && <p className="mt-1 text-xs text-red-500">{errors.current_password.message}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold" htmlFor="new_password">
                {t('new_password')}
              </label>
              <PasswordInput id="new_password" {...register('new_password')} className={errors.new_password ? 'border-red-500 focus:ring-red-500' : ''} />
              {errors.new_password && <p className="mt-1 text-xs text-red-500">{errors.new_password.message}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold" htmlFor="confirm_new_password">
                {t('confirm_new_password')}
              </label>
              <PasswordInput
                id="confirm_new_password"
                {...register('confirm_new_password')}
                className={errors.confirm_new_password ? 'border-red-500 focus:ring-red-500' : ''}
              />
              {errors.confirm_new_password && <p className="mt-1 text-xs text-red-500">{errors.confirm_new_password.message}</p>}
            </div>

            <Button type="submit" disabled={isPending} className="mt-6 h-11.25 w-full">
              <span className="relative z-10">{isPending ? t('saving') : t('save')}</span>
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
