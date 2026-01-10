import Hero from "@/features/home/components/hero/components/Hero";
import ShopByCategory from "@/features/home/components/marketing/components/ShopByCategory";
import WeeklyOffers from "@/features/home/components/weeklyOffers/components/WeeklyOffers";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations('HomePage');
  return (

    <main className="space-y-8">
      <Hero />
      <ShopByCategory />
      <WeeklyOffers />
    </main>

  );
}
