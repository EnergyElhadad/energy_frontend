import { CheckoutContent } from '@/features/checkout/components/CheckoutContent';
import { Breadcrumb } from '@/shared/components/layout/Breadcrumb';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Cart' });
  return {
    title: t('title'),
  };
}

export default async function CheckoutPage() {
  const t = await getTranslations('Cart');

  return (
    <main className="bg-Background pb-4 md:pb-20">
      <div className="container">
        <Breadcrumb className="pt-4 pb-10" items={[{ label: t('title') }]} homeAsFirstItem />
        <CheckoutContent />
      </div>
    </main>
  );
}
