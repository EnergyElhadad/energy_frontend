import { TermsContent } from '@/features/terms/TermsContent';
import { HeaderPage } from '@/shared/components/ui/HeaderPage';
import { useTranslations } from 'next-intl';

export default function TermsAndConditionsPage() {
  const t = useTranslations('Terms');

  const sections = t.raw('sections') as { title: string; items: string[] }[];

  return (
    <main className="bg-Background pb-10">
      <div className="container">
        <HeaderPage pageTitle={t('page_title')} />

        <div className="mt-8">
          <TermsContent sections={sections} />
        </div>
      </div>
    </main>
  );
}
