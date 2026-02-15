"use client";

import { toast } from "sonner";
import { useTranslations } from "next-intl";

interface ShareOptions {
  title?: string;
  text?: string;
  url?: string;
}

export const useShare = () => {
  const t = useTranslations("Common");

  const handleShare = async ({ title, text, url }: ShareOptions) => {
    const shareData = {
      title: title || document.title,
      text: text,
      url: url || window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        toast.success(t("link_copied"));
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return { handleShare };
};
