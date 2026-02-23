'use client';

import { useContactUs } from '../hooks/useContactUs';
import { Button } from '@/shared/components/ui/Button';
import { Spinner } from '@/shared/components/ui/spinner';
import { Display } from '@/shared/components/layout/Display';

export function ContactForm() {
  const { t, register, handleSubmit, onSubmit, errors, isSubmitting } = useContactUs();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="mb-4">
        <label className="mb-2 block text-sm font-semibold" htmlFor="name">
          {t('name_label')}
        </label>
        <input
          type="text"
          id="name"
          {...register('name')}
          className={`bg-Background border-Stroke focus:ring-primary min-h-11.25 w-full rounded-sm border px-3 py-2 focus:ring-2 focus:outline-none ${
            errors.name ? 'border-red-500 focus:ring-red-500' : ''
          }`}
        />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-semibold" htmlFor="email">
          {t('email_label')}
        </label>
        <input
          type="email"
          dir="ltr"
          id="email"
          {...register('email')}
          className={`bg-Background border-Stroke focus:ring-primary min-h-11.25 w-full rounded-sm border px-3 py-2 focus:ring-2 focus:outline-none ${
            errors.email ? 'border-red-500 focus:ring-red-500' : ''
          }`}
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-semibold" htmlFor="phone_number">
          {t('phone_label')}
        </label>
        <input
          type="tel"
          dir="ltr"
          id="phone_number"
          {...register('phone_number')}
          className={`bg-Background border-Stroke focus:ring-primary min-h-11.25 w-full rounded-sm border px-3 py-2 focus:ring-2 focus:outline-none ${
            errors.phone_number ? 'border-red-500 focus:ring-red-500' : ''
          }`}
        />
        {errors.phone_number && <p className="mt-1 text-xs text-red-500">{errors.phone_number.message}</p>}
      </div>

      <div className="mb-6">
        <label className="mb-2 block text-sm font-semibold" htmlFor="message">
          {t('message_label')}
        </label>
        <textarea
          id="message"
          rows={5}
          {...register('message')}
          className={`bg-Background border-Stroke focus:ring-primary w-full resize-none rounded-sm border px-3 py-2 focus:ring-2 focus:outline-none ${
            errors.message ? 'border-red-500 focus:ring-red-500' : ''
          }`}
        ></textarea>
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
      </div>

      <Button className="h-11.25 w-full px-8 sm:w-auto" disabled={isSubmitting}>
        <Display when={isSubmitting}>
          <Spinner />
        </Display>
        {t('submit_button')}
      </Button>
    </form>
  );
}
