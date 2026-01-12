"use client";

import { useLanguageSwitcher } from "@/shared/hooks/useLanguageSwitcher";
import Image from "next/image";

export function LanguageSwitcher() {
  const { toggleLanguage, isArabic } = useLanguageSwitcher();

  return (
    <button
      onClick={toggleLanguage}
      className="flex cursor-pointer items-center gap-[4px]"
      aria-label={isArabic ? "Switch to English" : "التبديل إلى العربية"}
    >
      <span className="text-WetGray text-[14px]">
        {isArabic ? "English" : "العربية"}
      </span>
      <Image
        src={
          isArabic ? "/images/flags/english.svg" : "/images/flags/arabic.svg"
        }
        alt="Language Flag"
        width={24}
        height={24}
      />
    </button>
  );
}
