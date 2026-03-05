/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/core/i18n';
import { toSlug } from '@/shared/utils/slug';

interface Props {
  item: any;
}

export const OrderItemCard = ({ item }: Props) => {
  const t = useTranslations('OrderDetail');
  const { product, quantity, unit_price_at_purchase, total_price } = item;

  return (
    <Link href={`/products/${product.id}-${toSlug(product.name)}`} className="flex border-b border-gray-100 bg-white p-4 last:border-0 hover:bg-gray-50">
      {/* Image */}
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border border-gray-100 bg-gray-50 md:h-24 md:w-24">
        <Image src={product.primary_image || '/images/logo.png'} alt={product.name} fill className="object-contain p-2" sizes="96px" />
      </div>

      {/* Details */}
      <div className="ms-4 flex flex-1 flex-col sm:flex-row sm:justify-between">
        <div className="flex flex-col">
          <h3 className="line-clamp-2 text-sm font-semibold text-gray-900 md:text-base">{product.name}</h3>
          <p className="mt-1 text-sm text-gray-500">
            {t('quantity')}: <span className="font-semibold text-gray-900">{quantity}</span>
          </p>
          <p className="mt-1 text-sm text-gray-500">
            {t('unit_price')}: {parseFloat(unit_price_at_purchase)} {t('currency')}
          </p>
        </div>

        {/* Total Item Price */}
        <div className="mt-3 flex items-end sm:mt-0 sm:flex-col sm:justify-center">
          <span className="text-primary text-base font-bold md:text-lg">
            {parseFloat(total_price)} {t('currency')}
          </span>
        </div>
      </div>
    </Link>
  );
};
