import { ContactUsSection } from '@/features/contact-us/ContactUsSection';
import { HeaderPage } from '@/shared/components/ui/HeaderPage';
import { getTranslations, setRequestLocale } from 'next-intl/server';

interface ContactUsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ContactUsPage({ params }: ContactUsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('ContactUs');

  return (
    <main className="bg-Background pb-10">
      <div className="container">
        <HeaderPage pageTitle={t('page_title')} />
        <ContactUsSection />
      </div>
    </main>
  );
}
