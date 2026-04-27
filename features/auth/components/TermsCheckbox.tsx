"use client";
import { useTranslations } from "next-intl";

import { forwardRef, ComponentProps } from "react";
import Link from "next/link";
import { CheckMark } from "@/shared/components/icons/CheckMark";

export const TermsCheckbox = forwardRef<
  HTMLInputElement,
  ComponentProps<"input">
>(({ className, ...props }, ref) => {
  const t = useTranslations("Auth");

  return (
    <label
      className={`mx-auto my-6 flex w-fit cursor-pointer items-center justify-center gap-2 select-none @max-sm:my-4 ${className || ""}`}
    >
      <input type="checkbox" className="peer sr-only" ref={ref} {...props} />

      <span
        className={`border-Stroke peer-checked:bg-primary flex h-4 w-4 items-center justify-center rounded-sm border bg-gray-200 transition-colors`}
      >
        <CheckMark className="opacity-0 peer-checked:opacity-100" />
      </span>

      <span className="text-signalGray text-sm @max-xs:text-xs">
        {t("agree_terms")}{" "}
        <Link href="/terms" className="text-primary underline">
          {t("terms_link")}
        </Link>
      </span>
    </label>
  );
});
TermsCheckbox.displayName = "TermsCheckbox";
