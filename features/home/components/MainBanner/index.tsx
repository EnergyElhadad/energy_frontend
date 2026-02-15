import Image from 'next/image';
import { MainBannerContent } from './components/MainBannerContent';

export const MainBanner = () => {
  return (
    <section className="bg-Background py-12.5">
      <div className="container">
        <div className="overflow-hidden rounded-lg" aria-label="main banner ">
          <div className="relative z-2 min-h-81.25 w-full items-center">
            <picture>
              <source media="(min-width: 768px)" srcSet="/images/hero.webp" />
              <Image src={'/images/banner-mobile.webp'} fill alt="main banner" className="absolute inset-0 h-full w-full object-cover" />
            </picture>

            <div className="absolute inset-0 bg-black/50" />
            <MainBannerContent
              title="عرض لفترة محدودة"
              desc1="وفر حتى 50% على جميع المنتجات"
              desc2="احصل على أفضل الأسعار على المنتجات الكهربائية عالية الجودة"
              linkUrl="#"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
