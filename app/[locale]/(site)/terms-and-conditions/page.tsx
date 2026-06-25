import { TermsContent } from '@/features/terms/TermsContent';
import { HeaderPage } from '@/shared/components/ui/HeaderPage';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export const dynamic = 'force-static';

interface TermsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function TermsAndConditionsPage({ params }: TermsPageProps) {
  const { locale } = await params;
  // Required for static rendering with next-intl — without it the page renders
  // in the default locale regardless of the URL. See about/page.tsx.
  setRequestLocale(locale);
  const t = await getTranslations('Terms');

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
