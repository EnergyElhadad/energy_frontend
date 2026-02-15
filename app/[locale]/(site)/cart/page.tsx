import { Breadcrumb } from '@/shared/components/layout/Breadcrumb';
import { CartContent } from '@/features/shopingCart/components/CartContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'سلة التسوق',
};

export default async function cartPage() {
  return (
    <main className="bg-Background overflow-hidden pb-20">
      <div className="container">
        <Breadcrumb items={[{ label: 'الرئيسية', href: '/' }, { label: 'سلة التسوق' }]} className="pt-4 pb-10" />
        <CartContent />
      </div>
    </main>
  );
}
