'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/Button';
import { PasswordInput } from '@/features/auth/components/PasswordInput';
import { useChangePassword } from '@/features/profile/hooks/useChangePassword';

const changePasswordSchema = z
  .object({
    current_password: z.string().min(1, 'كلمة المرور الحالية مطلوبة'),
    new_password: z.string().min(8, 'كلمة المرور الجديدة يجب أن تكون 8 أحرف على الأقل'),
    confirm_new_password: z.string().min(1, 'تأكيد كلمة المرور مطلوب'),
  })
  .refine(data => data.new_password === data.confirm_new_password, {
    message: 'كلمات المرور غير متطابقة',
    path: ['confirm_new_password'],
  });

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

interface ChangePasswordModalProps {
  trigger: React.ReactNode;
}

export const ChangePasswordModal = ({ trigger }: ChangePasswordModalProps) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync: changePassword, isPending } = useChangePassword();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
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
        <DialogTitle className="sr-only">تغيير كلمة المرور</DialogTitle>

        <div className="relative p-10">
          <h2 className="mb-2 text-sm font-semibold text-black">تغيير كلمة المرور</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold" htmlFor="current_password">
                كلمة المرور الحالية
              </label>
              <PasswordInput id="current_password" {...register('current_password')} className={errors.current_password ? 'border-red-500 focus:ring-red-500' : ''} />
              {errors.current_password && <p className="mt-1 text-xs text-red-500">{errors.current_password.message}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold" htmlFor="new_password">
                كلمة المرور الجديدة
              </label>
              <PasswordInput id="new_password" {...register('new_password')} className={errors.new_password ? 'border-red-500 focus:ring-red-500' : ''} />
              {errors.new_password && <p className="mt-1 text-xs text-red-500">{errors.new_password.message}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold" htmlFor="confirm_new_password">
                تأكيد كلمة المرور الجديدة
              </label>
              <PasswordInput
                id="confirm_new_password"
                {...register('confirm_new_password')}
                className={errors.confirm_new_password ? 'border-red-500 focus:ring-red-500' : ''}
              />
              {errors.confirm_new_password && <p className="mt-1 text-xs text-red-500">{errors.confirm_new_password.message}</p>}
            </div>

            <Button type="submit" disabled={isPending} className="mt-6 h-11.25 w-full">
              <span className="relative z-10">{isPending ? 'جاري الحفظ...' : 'حفظ'}</span>
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
