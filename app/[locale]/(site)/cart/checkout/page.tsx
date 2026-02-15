import { CheckoutContent } from '@/features/checkout/components/CheckoutContent';
import { Breadcrumb } from '@/shared/components/layout/Breadcrumb';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'سلة التسوق',
};

export default function CheckoutPage() {
  return (
    <main className="bg-Background pb-4 md:pb-20">
      <div className="container">
        <Breadcrumb className="pt-4 pb-10" items={[{ label: 'سلة التسوق' }]} homeAsFirstItem />
        <CheckoutContent />
      </div>
    </main>
  );
}
