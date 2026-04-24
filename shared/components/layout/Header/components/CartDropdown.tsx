'use client';

import { useTranslations } from 'next-intl';
import { BagIcon } from '@/shared/components/icons/Bag';
import { useCart } from '../hooks/useCart';
import { CartItem } from './CartItem';
import { Dropdown } from '@/shared/components/ui/Dropdown';

import { Link } from '@/core/i18n';

export const CartDropdown = () => {
  const t = useTranslations('Header');
  const { items, updateQuantity } = useCart();

  return (
    <Dropdown
      trigger={
        <div
          aria-label={t('cart')}
          className="border-Stroke hover:bg-primary-20 relative flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full border transition-colors"
        >
          {/* Desktop-only overlay link: clicking the icon on lg+ navigates to /cart.
              On mobile the link is display:none so taps hit the div and toggle the dropdown. */}
          <Link href="/cart" aria-label={t('cart')} className="absolute inset-0 z-10 hidden rounded-full lg:block" />
          <BagIcon className="text-primary" />
          {items.length > 0 && (
            <span className="bg-Alert absolute top-[-2px] right-[-2px] flex h-[16px] w-[16px] items-center justify-center rounded-full text-[12px] text-white shadow-sm">
              {items.length}
            </span>
          )}
        </div>
      }
      triggerMode="hover"
    >
      <div className="">
        <h3 className="mb-[7px] text-[14px] font-semibold">{t('cart')}</h3>
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8">
            <BagIcon className="text-stroke mb-3 h-12 w-12" />
            <p className="text-signalGray text-[14px]">{t('empty_cart')}</p>
          </div>
        ) : (
          <>
            <div className="scrollbar-thin flex max-h-[300px] flex-col gap-[8px] overflow-y-auto">
              {items.map(item => (
                <CartItem key={item.id} product={item} quantity={item.quantity} onQuantityChange={val => updateQuantity(item.id, val)} />
              ))}
            </div>
          </>
        )}
        <Link
          href="/cart"
          className="border-primary text-primary hover:bg-primary mt-[12px] flex h-[42px] w-full items-center justify-center rounded-[8px] border text-[14px] font-semibold transition-all duration-300 ease-in-out hover:text-white"
        >
          {t('go_to_cart')}
        </Link>
      </div>
    </Dropdown>
  );
};
