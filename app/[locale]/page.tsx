import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/shared/components/LanguageSwitcher";

export default function Home() {
  const t = useTranslations('HomePage');
  return (

  <main className="space-y-8">
    <div className="flex justify-end">
      <LanguageSwitcher />
    </div>
    <h1 className="text-4xl font-bold text-center text-primary">{t('welcome')}</h1>
  </main>
   
  );
}
