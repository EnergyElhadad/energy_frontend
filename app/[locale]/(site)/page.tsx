import Hero from "@/features/home/components/hero/components/Hero";
import MainBanner from "@/features/home/components/MainBanner";
import ShopByCategory from "@/features/home/components/marketing/components/ShopByCategory";
import ProductBanners from "@/features/home/components/productBanners/components/ProductBanners";
import WeeklyOffers from "@/features/home/components/weeklyOffers/components/WeeklyOffers";
import { WhyChooseUs } from "@/features/home/components/WhyChooseUs";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("HomePage");

  return (
    <main className="space-y-8">
      <Hero />
      <ShopByCategory />
      <WeeklyOffers />
      <ProductBanners />
      <WhyChooseUs />
      <MainBanner />
    </main>
  );
}
