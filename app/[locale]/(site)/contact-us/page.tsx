import { ContactUsSection } from '@/features/contact-us/ContactUsSection';
import { HeaderPage } from '@/shared/components/ui/HeaderPage';
import { useTranslations } from 'next-intl';

export default function ContactUsPage() {
  const t = useTranslations('ContactUs');

  return (
    <main className="bg-Background pb-10">
      <div className="container">
        <HeaderPage pageTitle={t('page_title')} />
        <ContactUsSection />
      </div>
    </main>
  );
}
