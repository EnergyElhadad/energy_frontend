import { useTranslations } from 'next-intl';
import { ContactForm } from './components/ContactForm';

export function ContactUsSection() {
  const t = useTranslations('ContactUs');

  return (
    <section className="rounded-lg bg-white py-10 shadow-sm dark:bg-neutral-900">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t('section_title')}</h2>
            <p className="mt-4 text-gray-500 dark:text-gray-400">{t('section_description')}</p>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
