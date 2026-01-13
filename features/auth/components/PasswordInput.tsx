"use client";

import { useTranslations } from "next-intl";
import { useState, forwardRef, ComponentProps } from "react";
import { EyeIcon } from "@/shared/components/icons/Eye";
import { EyeOffIcon } from "@/shared/components/icons/EyeOffIcon";

export const PasswordInput = forwardRef<
  HTMLInputElement,
  ComponentProps<"input">
>(({ className, ...props }, ref) => {
  const t = useTranslations("Auth");
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        {...props}
        ref={ref}
        type={show ? "text" : "password"}
        className={`bg-Background border-Stroke focus:ring-primary min-h-11.25 w-full rounded-sm border px-3 py-2 focus:ring-2 focus:outline-none @max-sm:min-h-8 ${className || ""}`}
      />

      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        className="absolute inset-y-0 end-3 flex items-center text-gray-500"
        aria-label={show ? t("password_hide") : t("password_show")}
        tabIndex={-1}
      >
        {show ? <EyeOffIcon /> : <EyeIcon />}
      </button>
    </div>
  );
});
PasswordInput.displayName = "PasswordInput";
