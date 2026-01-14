"use client";

import { PasswordInput } from "./PasswordInput";
import { SubmitButton } from "./SubmitButton";
import { useSignin } from "../hooks/useSignin";
import { useLocale } from "next-intl";

export function SigninForm() {
  const {
    t,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    globalError,
  } = useSignin();

  const locale = useLocale();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto w-full max-w-md">
      <div className="mb-2">
        <label
          className="@max-sm: mb-2 block text-sm font-semibold @max-sm:text-xs"
          htmlFor="phone_number"
        >
          {t("phone_label") || "Phone Number"}
        </label>
        <input
          type="tel"
          dir={locale === "ar" ? "rtl" : "ltr"}
          id="phone_number"
          {...register("phone_number")}
          className={`bg-Background border-Stroke focus:ring-primary min-h-11.25 w-full rounded-sm border px-3 py-2 focus:ring-2 focus:outline-none @max-sm:min-h-8 ${
            errors.phone_number ? "border-red-500 focus:ring-red-500" : ""
          }`}
        />
        {errors.phone_number && (
          <p className="mt-1 text-xs text-red-500">
            {errors.phone_number.message}
          </p>
        )}
      </div>

      <div className="mb-2">
        <label
          className="mb-2 block text-sm font-semibold @max-sm:text-xs"
          htmlFor="password"
        >
          {t("password_label")}
        </label>
        <PasswordInput
          id="password"
          {...register("password")}
          className={errors.password ? "border-red-500 focus:ring-red-500" : ""}
        />
        {errors.password && (
          <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="mb-6 @max-sm:mb-4">
        <a
          href="#"
          className="text-signalGray text-sm hover:underline @max-sm:text-xs"
        >
          {t("forgot_password")}
        </a>
      </div>

      {globalError && (
        <div className="mb-4 text-center text-sm font-medium text-red-500">
          {globalError}
        </div>
      )}

      <SubmitButton
        text={t("login_button")}
        disabled={isSubmitting}
        isLoading={isSubmitting}
      />
    </form>
  );
}
