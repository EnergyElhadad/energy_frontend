import { CustomerReviews } from "@/features/home/components/CustomerReviews";
import { Hero } from "@/features/home/components/hero";
import { MainBanner } from "@/features/home/components/MainBanner";
import { ShopByCategory } from "@/features/home/components/ShopByCategory";
import { ProductBanners } from "@/features/home/components/productBanners";
import { WeeklyOffers } from "@/features/home/components/weeklyOffers";
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
      <CustomerReviews />
      <MainBanner />
    </main>
  );
}
