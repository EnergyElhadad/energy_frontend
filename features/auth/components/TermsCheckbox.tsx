"use client";
import { useTranslations } from "next-intl";

import { useState } from "react";
import Link from "next/link";
import { CheckMark } from "@/shared/components/icons/CheckMark";

export function TermsCheckbox() {
  const t = useTranslations('Auth');
  const [checked, setChecked] = useState(false);

  return (
    <label className="flex items-center justify-center my-6 gap-2 cursor-pointer select-none w-fit mx-auto @max-sm:my-4 ">

      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        className="sr-only"
      />

      <span
        className={`
          h-4 w-4
          flex items-center justify-center
          rounded-sm border border-Stroke
          transition-colors
          ${checked ? "bg-primary" : "bg-gray-200"}
        `}
      >
        {checked && (
          <CheckMark />
        )}
      </span>

      <span className="text-sm text-signalGray @max-xs:text-xs">
        {t('agree_terms')}{" "}
        <Link href="/terms" className="text-primary underline">
          {t('terms_link')}
        </Link>
      </span>
    </label>
  );
}
