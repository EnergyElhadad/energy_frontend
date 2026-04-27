import { CategoriesContent } from '@/features/categories/components/CategoriesContent';
import { getCategories, CategoriesResponse } from '@/shared/services/categories';
import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Breadcrumb } from '@/shared/components/layout/Breadcrumb';
import { CollectionJsonLd, type CollectionItem } from '@/shared/components/seo/CollectionJsonLd';

export const revalidate = 600;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Header' });

  return {
    title: t('all_categories'),
  };
}

export default async function CategoriesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
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

  // Each category links to its filtered /products view — the same URL the
  // header/sidebar uses, so the breadcrumb and link target stay consistent.
  const collectionItems: CollectionItem[] = (initialCategories?.result || []).map(c => ({
    name: c.name,
    path: `/products?categoryId=${c.id}&categoryName=${encodeURIComponent(c.name)}`,
    image: c.image,
  }));

  return (
    <main className="bg-Background min-h-screen">
      {collectionItems.length > 0 && (
        <CollectionJsonLd
          locale={locale}
          path="/categories"
          name={commonT('all_categories')}
          items={collectionItems}
          itemType="Thing"
        />
      )}
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
