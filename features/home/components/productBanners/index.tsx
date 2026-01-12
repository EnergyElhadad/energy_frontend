import { BannerCard } from "./components/BannerCard";

export const ProductBanners = () => {
  return (
    <section className="bg-Background py-10" aria-label="Featured Products">
      <div className="container">
        <div className="grid grid-cols-1 place-items-center gap-6 lg:grid-cols-2">
          <BannerCard
            title="سماعات"
            descritption="أفضل صوت نقي"
            textLink="تسوق الأن"
            urlImage="/images/banners/banner1.webp"
          />
          <BannerCard
            title="سماعات"
            descritption="أفضل صوت نقي"
            textLink="تسوق الأن"
            urlImage="/images/banners/banner2.webp"
          />
        </div>
      </div>
    </section>
  );
};
