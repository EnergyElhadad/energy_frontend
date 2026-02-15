'use client';

import { PasswordInput } from './PasswordInput';
import { TermsCheckbox } from './TermsCheckbox';
import { useSignup } from '../hooks/useSignup';
import { Spinner } from '@/shared/components/ui/spinner';
import { Button } from '@/shared/components/ui/Button';
import { Display } from '@/shared/components/layout/Display';

export function SignupForm() {
  const { t, register, handleSubmit, onSubmit, errors, isSubmitting, phone_number } = useSignup();

  const maxLength = phone_number?.toString().startsWith('20') ? 12 : 11;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto w-full max-w-md">
      <div className="mb-2">
        <label className="mb-2 block text-sm font-semibold @max-sm:text-xs">{t('full_name_label')}</label>
        <input
          type="text"
          {...register('full_name')}
          className="bg-Background border-Stroke focus:ring-primary min-h-11.25 w-full rounded-sm border px-3 py-2 focus:ring-2 focus:outline-none @max-sm:min-h-8"
        />
        {errors.full_name && <span className="text-sm text-red-500">{errors.full_name.message}</span>}
      </div>

      <div className="mb-2">
        <label className="mb-2 block text-sm font-semibold @max-sm:text-xs">{t('mobile_label')}</label>
        <input
          type="tel"
          {...register('phone_number')}
          maxLength={maxLength}
          className="bg-Background border-Stroke focus:ring-primary min-h-11.25 w-full rounded-sm border px-3 py-2 focus:ring-2 focus:outline-none @max-sm:min-h-8"
        />
        {errors.phone_number && <span className="text-sm text-red-500">{errors.phone_number.message}</span>}
      </div>

      <div className="mb-2">
        <label className="mb-2 block text-sm font-semibold @max-sm:text-xs">{t('signup_email_label')}</label>
        <input
          type="email"
          {...register('email')}
          className="bg-Background border-Stroke focus:ring-primary min-h-11.25 w-full rounded-sm border px-3 py-2 focus:ring-2 focus:outline-none @max-sm:min-h-8"
        />
        {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
      </div>

      <div className="mb-2">
        <label className="mb-2 block text-sm font-semibold @max-sm:text-xs">{t('password_label')}</label>
        <PasswordInput {...register('password')} />
        {errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}
      </div>

      <div className="mb-2">
        <label className="mb-2 block text-sm font-semibold @max-sm:text-xs">{t('confirm_password_label')}</label>
        <PasswordInput {...register('confirm_password')} />
        {errors.confirm_password && <span className="text-sm text-red-500">{errors.confirm_password.message}</span>}
      </div>

      <TermsCheckbox {...register('terms')} />
      {errors.terms && <span className="-mt-4 mb-4 block text-center text-sm text-red-500">{errors.terms.message}</span>}

      <Button className="h-11.25 w-full">
        <Display when={isSubmitting}>
          <Spinner />
        </Display>
        {t('signup_button')}
      </Button>
    </form>
  );
}
