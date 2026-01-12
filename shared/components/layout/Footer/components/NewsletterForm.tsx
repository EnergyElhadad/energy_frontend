import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/input";
import { useTranslations } from "next-intl";

export const NewsletterForm = () => {
  const t = useTranslations("Footer");

  return (
    <div className="mt-4">
      <h4 className="text-WetGray mb-2 text-[16px]">{t("subscribe_title")}</h4>

      <div className="flex gap-2">
        <Input
          type="email"
          placeholder={t("email_placeholder")}
          aria-label={t("email_placeholder")}
          className="bg-Stroke h-auto rounded-[8px] border-none px-3 py-1.5 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Button type="submit" className="w-fit text-white">
          {t("subscribe_button")}
        </Button>
      </div>
    </div>
  );
};
