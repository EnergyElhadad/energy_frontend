import BannerCard from "./BannerCard";

export default function ProductBanners() {
  return (
    <section
      className="bg-Background hidden py-10 lg:block"
      aria-label="Featured Products"
    >
      <div className="container">
        <div className="grid grid-cols-2 gap-6">
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
}
