import { CategoriesContent } from '@/features/categories/components/CategoriesContent';
import { getCategories, CategoriesResponse } from '@/shared/services/categories';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Breadcrumb } from '@/shared/components/layout/Breadcrumb';

export const dynamic = 'force-dynamic';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Header' });

  return {
    title: t('all_categories'),
  };
}

export default async function CategoriesPage({ params: { locale } }: Props) {
  const commonT = await getTranslations({ locale, namespace: 'Header' });

  let initialCategories: CategoriesResponse | null = null;
  try {
    initialCategories = await getCategories(1);
  } catch (error) {
    console.error('Failed to fetch initial categories:', error);
  }

  const breadcrumbItems = [
    { label: commonT('home'), href: '/' },
    { label: commonT('all_categories'), href: '/categories' },
  ];

  return (
    <main className="bg-Background min-h-screen">
      <div className="container">
        <Breadcrumb className="py-5" items={breadcrumbItems} />

        {/* Main Content */}
        <div className="mx-auto max-w-7xl px-4 pt-4 pb-33">
          <h1 className="mb-8 text-3xl font-bold text-black dark:text-white">{commonT('all_categories')}</h1>
          <CategoriesContent initialCategories={initialCategories} />
        </div>
      </div>
    </main>
  );
}
