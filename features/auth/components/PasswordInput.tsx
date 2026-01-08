"use client";

import { useTranslations } from "next-intl";

import { useState } from "react";
import { EyeIcon } from "@/shared/components/icons/EyeIcon";
import { EyeOffIcon } from "@/shared/components/icons/EyeOffIcon";

export function PasswordInput() {
  const t = useTranslations('Auth');
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        className="w-full min-h-11.25 rounded-sm bg-Background border border-Stroke px-3 py-2  focus:outline-none focus:ring-2 focus:ring-primary  @max-sm:min-h-8"
      />

      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        className="absolute inset-y-0 end-3 flex items-center text-gray-500"
        aria-label={show ? t('password_hide') : t('password_show')}
      >
        {show ? <EyeOffIcon /> : <EyeIcon />}
      </button>
    </div>
  );
}
