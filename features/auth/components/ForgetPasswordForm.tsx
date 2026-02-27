'use client';

import { Button } from '@/shared/components/ui/Button';
import { Spinner } from '@/shared/components/ui/spinner';
import { Display } from '@/shared/components/layout/Display';
import { useForgetPassword } from '../hooks/useForgetPassword';

export function ForgetPasswordForm() {
  const { t, register, handleSubmit, onSubmit, errors, isSubmitting } = useForgetPassword();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto w-full max-w-md">
      <div className="mb-6">
        <label className="@max-sm: mb-2 block text-sm font-semibold @max-sm:text-xs" htmlFor="phone_number">
          {t('phone_label')}
        </label>
        <input
          type="tel"
          id="phone_number"
          {...register('phone_number')}
          className={`bg-Background border-Stroke focus:ring-primary min-h-11.25 w-full rounded-sm border px-3 py-2 focus:ring-2 focus:outline-none @max-sm:min-h-8 ${
            errors.phone_number ? 'border-red-500 focus:ring-red-500' : ''
          }`}
        />
        {errors.phone_number && <p className="mt-1 text-xs text-red-500">{errors.phone_number.message}</p>}
      </div>

      <Button className="h-11.25 w-full">
        <Display when={isSubmitting}>
          <Spinner />
        </Display>
        {t('send_button')}
      </Button>
    </form>
  );
}
