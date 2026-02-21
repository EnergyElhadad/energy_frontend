'use client';

import { Button } from '@/shared/components/ui/Button';
import { Spinner } from '@/shared/components/ui/spinner';
import { Display } from '@/shared/components/layout/Display';
import { useNewPassword } from '../hooks/useNewPassword';

export function NewPasswordForm() {
  const { t, register, handleSubmit, onSubmit, errors, isSubmitting } = useNewPassword();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto w-full max-w-md">
      <div className="mb-6">
        <label className="@max-sm: mb-2 block text-sm font-semibold @max-sm:text-xs" htmlFor="new_password">
          {t('new_password_label')}
        </label>
        <input
          type="password"
          id="new_password"
          {...register('new_password')}
          className={`bg-Background border-Stroke focus:ring-primary min-h-11.25 w-full rounded-sm border px-3 py-2 focus:ring-2 focus:outline-none @max-sm:min-h-8 ${
            errors.new_password ? 'border-red-500 focus:ring-red-500' : ''
          }`}
        />
        {errors.new_password && <p className="mt-1 text-xs text-red-500">{errors.new_password.message}</p>}
      </div>

      <div className="mb-6">
        <label className="@max-sm: mb-2 block text-sm font-semibold @max-sm:text-xs" htmlFor="confirm_password">
          {t('confirm_password_label')}
        </label>
        <input
          type="password"
          id="confirm_password"
          {...register('confirm_password')}
          className={`bg-Background border-Stroke focus:ring-primary min-h-11.25 w-full rounded-sm border px-3 py-2 focus:ring-2 focus:outline-none @max-sm:min-h-8 ${
            errors.confirm_password ? 'border-red-500 focus:ring-red-500' : ''
          }`}
        />
        {errors.confirm_password && <p className="mt-1 text-xs text-red-500">{errors.confirm_password.message}</p>}
      </div>

      <Button className="h-11.25 w-full">
        <Display when={isSubmitting}>
          <Spinner />
        </Display>
        {t('reset_password_button')}
      </Button>
    </form>
  );
}
