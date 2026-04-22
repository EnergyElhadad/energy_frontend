'use client';

import { ProductData } from '../../types';
import { ProductHeader } from './ProductHeader';
import { ProductMeta } from './ProductMeta';
import { ProductInfo } from './ProductInfo';
import { ProductCounter } from '../ProductCounter';
import { Actions } from '../Actions';
import { useProductCounter } from '../ProductCounter/hooks/useProductCounter';
import { useProductActions } from '../Actions/hooks/useProductActions';
import { Display } from '@/shared/components/layout/Display';
import { useTranslations } from 'next-intl';

interface ProductDetailsProps {
  product: ProductData;
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const t = useTranslations('SingleProduct');
  const { name, available_stock, short_description, price, id, ratings_count, offer_price, discount_percentage, discount_label } = product;

  const hasDiscount = discount_percentage > 0 && offer_price > 0 && offer_price < Number(price);
  const effectivePrice = hasDiscount ? offer_price : Number(price);

  const { count, setCount } = useProductCounter({
    initialValue: 1,
    min: 1,
    max: Number(available_stock),
  });

  const { handleAddToCart, handleQuickBuy, isAddToCartLoading, isQuickBuyLoading } = useProductActions();

  return (
    <>
      <ProductHeader name={name} available_stock={available_stock} />
      <ProductMeta name={name} rate_count={ratings_count} reviews_count={ratings_count} id={id} is_in_wishlist={product.is_in_wishlist} />
      <ProductInfo description={short_description} />

      {/* Price & Discount Section */}
      <div className="mt-5 flex items-center gap-3">
        <span className="text-primary text-2xl font-bold">
          {effectivePrice} {t('currency')}
        </span>

        {hasDiscount && (
          <>
            <span className="text-signalGray relative text-base line-through">
              {Number(price)} {t('currency')}
            </span>
            <span className="rounded-md bg-red-500 px-2 py-0.5 text-xs font-semibold text-white">{discount_label || `${discount_percentage}%`}</span>
          </>
        )}
      </div>

      <Display when={available_stock > 0}>
        <div className="mt-3 md:mt-auto">
          <ProductCounter value={count} onChange={setCount} variant="large" max={Number(available_stock)} price={effectivePrice} />
        </div>

        <Actions
          onAddToCart={() =>
            handleAddToCart(
              {
                id: product.id,
                title: product.name,
                price: Number(product.price),
                image: product.images?.[0]?.image || '',
                category: product.category?.name || '',
              },
              count
            )
          }
          onQuickBuy={() =>
            handleQuickBuy(
              {
                id: product.id,
                title: product.name,
                price: Number(product.price),
                image: product.images?.[0]?.image || '',
                category: product.category?.name || '',
              },
              count
            )
          }
          isAddToCartLoading={isAddToCartLoading}
          isQuickBuyLoading={isQuickBuyLoading}
        />
      </Display>

      <Display when={available_stock === 0 || !available_stock}>
        <p className="mt-4 text-base font-bold text-red-500">{t('out_of_stock')}</p>
      </Display>
    </>
  );
};
