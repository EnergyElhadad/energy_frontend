import { Breadcrumb } from '@/shared/components/layout/Breadcrumb';
import { CartContent } from '@/features/shopingCart/components/CartContent';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Cart' });
  return {
    title: t('title'),
  };
}

export default async function cartPage() {
  const t = await getTranslations('Cart');
  const d = await getTranslations('Common');

  return (
    <main className="bg-Background overflow-hidden pb-20">
      <div className="container">
        <Breadcrumb items={[{ label: d('home'), href: '/' }, { label: t('title') }]} className="pt-4 pb-10" />
        <CartContent />
      </div>
    </main>
  );
}
