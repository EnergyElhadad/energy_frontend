"use client";
import { useLocale, useTranslations } from "next-intl";

import { forwardRef, ComponentProps } from "react";
import { CheckMark } from "@/shared/components/icons/CheckMark";

export const TermsCheckbox = forwardRef<
  HTMLInputElement,
  ComponentProps<"input">
>(({ className, ...props }, ref) => {
  const t = useTranslations("Auth");
  const locale = useLocale();

  return (
    <div
      className={`mx-auto my-6 flex w-fit items-center justify-center gap-2 @max-sm:my-4 ${className || ""}`}
    >
      <label className="flex cursor-pointer items-center gap-2 select-none">
        <input type="checkbox" className="peer sr-only" ref={ref} {...props} />

        <span
          className={`border-Stroke peer-checked:bg-primary flex h-4 w-4 items-center justify-center rounded-sm border bg-gray-200 transition-colors`}
        >
          <CheckMark className="opacity-0 peer-checked:opacity-100" />
        </span>

        <span className="text-signalGray text-sm @max-xs:text-xs">
          {t("agree_terms")}
        </span>
      </label>

      <a
        href={`/${locale}/terms-and-conditions`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary text-sm underline @max-xs:text-xs"
      >
        {t("terms_link")}
      </a>
    </div>
  );
});
TermsCheckbox.displayName = "TermsCheckbox";
