import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations('HomePage');
  return (

    <main className="space-y-8">
      <h1 className="text-4xl font-bold text-center text-primary">{t('welcome')}</h1>
    </main>

  );
}
