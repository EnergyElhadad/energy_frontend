"use client";
import { useTranslations } from "next-intl";
import { PasswordInput } from "./PasswordInput";
import { FooterForm } from "./FooterForm";
import { TermsCheckbox } from "./TermsCheckbox";
import { SubmitButton } from "./SubmitButton";


export function SignupForm() {
  const t = useTranslations('Auth');
  return (
    <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-md mx-auto">
      <div className="mb-2">
        <label className="block text-sm mb-2 font-semibold @max-sm:text-xs">
          {t('name_label')}
        </label>
        <input
          type="text"
          className="w-full min-h-11.25 rounded-sm border bg-Background border-Stroke px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary  @max-sm:min-h-8"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm mb-2 font-semibold @max-sm:text-xs">
          {t('mobile_label')}
        </label>
        <input
          type="number"
          className="w-full min-h-11.25 rounded-sm border bg-Background border-Stroke px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary  @max-sm:min-h-8"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm mb-2 font-semibold @max-sm:text-xs">
          {t('signup_email_label')}
        </label>
        <input
          type="text"
          className="w-full min-h-11.25 rounded-sm border bg-Background border-Stroke px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary  @max-sm:min-h-8"
        />
      </div>

      <div className="mb-2">
        <label className="block text-sm mb-2 font-semibold  @max-sm:text-xs">{t('password_label')}</label>
        <PasswordInput />
      </div>


      <TermsCheckbox />

      <SubmitButton text={t('signup_button')} />
    </form>
  );
}
