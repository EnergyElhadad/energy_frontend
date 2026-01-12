import Hero from "@/features/home/components/hero/components/Hero";
import ShopByCategory from "@/features/home/components/marketing/components/ShopByCategory";
import WeeklyOffers from "@/features/home/components/weeklyOffers/components/WeeklyOffers";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations('HomePage');

  return (

    <main className="space-y-8">
      <Hero />
      <ShopByCategory />
      <WeeklyOffers />
    </main>

  );
}
