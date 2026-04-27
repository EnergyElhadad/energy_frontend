import { Banner } from '@/features/home/types/banner';
import { BannerCard } from './components/BannerCard';

interface ProductBannersProps {
  banners: Banner[];
}

export const ProductBanners = ({ banners }: ProductBannersProps) => {
  if (!banners || banners.length === 0) return null;

  return (
    <section className="bg-Background py-10" aria-label="Featured Products">
      <div className="container">
        <div className="grid grid-cols-1 place-items-center gap-6 lg:grid-cols-2">
          {banners.map(banner => (
            <BannerCard key={banner.id} title={banner.title} descritption={banner.banner_text} textLink={banner.button} urlImage={banner.image} link={banner.link} />
          ))}
        </div>
      </div>
    </section>
  );
};
