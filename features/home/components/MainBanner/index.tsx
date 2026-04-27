import Image from 'next/image';
import { MainBannerContent } from './components/MainBannerContent';
import { useTranslations } from 'next-intl';

export const MainBanner = () => {
  const t = useTranslations('HomePage');
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
            <MainBannerContent title={t('main_banner_title')} desc1={t('main_banner_desc1')} desc2={t('main_banner_desc2')} linkUrl="#" />
          </div>
        </div>
      </div>
    </section>
  );
};
