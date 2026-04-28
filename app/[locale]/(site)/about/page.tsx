import { AboutSection } from '@/features/about/AboutSection';
import { WhySection } from '@/features/about/WhySection';
import aboutImage from '@/public/images/about.webp';
import { HeaderPage } from '@/shared/components/ui/HeaderPage';
import { getTranslations, setRequestLocale } from 'next-intl/server';

const imagePath: string = aboutImage.src;

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  // Required for static rendering with next-intl — see (home)/page.tsx note.
  setRequestLocale(locale);
  const t = await getTranslations('About');

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
