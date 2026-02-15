'use client';

import { Link } from '@/core/i18n';
import { BagIcon } from '@/shared/components/icons/Bag';

export const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-gray-50">
        <BagIcon className="text-stroke h-16 w-16" />
      </div>
      <h2 className="mb-2 text-2xl font-bold text-gray-900">سلة التسوق فارغة</h2>
      <p className="text-signalGray mb-8 max-w-md">لم تقم بإضافة أي منتجات إلى سلة التسوق الخاصة بك بعد. تصفح منتجاتنا وأضف ما يعجبك.</p>
      <Link
        href="/products"
        className="bg-primary hover:bg-primary/90 inline-flex h-12 w-full max-w-[200px] items-center justify-center rounded-lg px-6 font-semibold text-white transition-colors"
      >
        تصفح المنتجات
      </Link>
    </div>
  );
};
