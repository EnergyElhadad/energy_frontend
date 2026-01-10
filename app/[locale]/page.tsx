import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/shared/components/LanguageSwitcher";
import Hero from "@/features/home/components/hero/components/Hero";
import ShopByCategory from "@/features/home/components/marketing/components/ShopByCategory";
import WeeklyOffers from "@/features/home/components/weeklyOffers/components/WeeklyOffers";

export default function Home() {
  const t = useTranslations("HomePage");
  return (
    <main className="space-y-8">
      <div className="container mx-auto flex justify-end overflow-hidden pt-4">
        <LanguageSwitcher />
      </div>
      <Hero />
      <ShopByCategory />
      <WeeklyOffers />
    </main>
  );
}
