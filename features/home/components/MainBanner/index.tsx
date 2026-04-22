import Image from 'next/image';
import { MainBannerContent } from './components/MainBannerContent';
import { useTranslations } from 'next-intl';
import { Banner } from '@/features/home/types/banner';

interface MainBannerProps {
  data: Banner[];
}

export const MainBanner = ({ data }: MainBannerProps) => {
  const t = useTranslations('HomePage');
  const banner = data?.[0];
  return (
    <section className="bg-Background py-12.5">
      <div className="container">
        <div className="overflow-hidden rounded-lg" aria-label="main banner ">
          <div className="relative z-2 min-h-81.25 w-full items-center">
            <picture>
              <source media="(max-width: 767px)" srcSet={banner?.mobile_image ?? banner?.image ?? '/images/banner-mobile.webp'} />
              <source media="(min-width: 768px)" srcSet={banner?.image ?? '/images/hero.webp'} />
              <Image src={banner?.image ?? '/images/hero.webp'} fill alt={banner?.title ?? 'main banner'} className="absolute inset-0 h-full w-full object-cover" />
            </picture>

            <div className="absolute inset-0 bg-black/50" />
            <MainBannerContent
              title={banner?.title ?? t('main_banner_title')}
              desc1={banner?.banner_text ?? t('main_banner_desc1')}
              // desc2={t('main_banner_desc2')}
              linkUrl={banner?.link ?? '#'}
              linkText={banner?.button}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
