import { AboutSection } from '@/features/about/AboutSection';
import { WhySection } from '@/features/about/WhySection';
import aboutImage from '@/public/images/about.webp';
import { HeaderPage } from '@/shared/components/ui/HeaderPage';
import { useTranslations } from 'next-intl';

const imagePath: string = aboutImage.src;

export default function AboutPage() {
  const t = useTranslations('About');

  return (
    <main className="bg-Background pb-10">
      <div className="container">
        <HeaderPage pageTitle={t('page_title')} />

        <AboutSection aboutImage={imagePath} title={t('section_title')} text={t('section_text')} />
        <WhySection />
      </div>
    </main>
  );
}
