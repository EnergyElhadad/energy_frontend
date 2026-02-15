'use client';

import { useTranslations } from 'next-intl';
import { BagIcon } from '@/shared/components/icons/Bag';
import { useCart } from '../hooks/useCart';
import { CartItem } from './CartItem';
import { Dropdown } from '@/shared/components/ui/Dropdown';
import { HeaderActionButton } from './HeaderActionButton';

import { Link } from '@/core/i18n';

export const CartDropdown = () => {
  const t = useTranslations('Header');
  const { items, updateQuantity } = useCart();

  return (
    <Dropdown trigger={<HeaderActionButton icon={<BagIcon className="text-primary" />} badgeCount={items.length} aria-label={t('cart')} />} triggerMode="hover">
      <div className="">
        <h3 className="mb-[7px] text-[14px] font-semibold">{t('cart')}</h3>
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8">
            <BagIcon className="text-stroke mb-3 h-12 w-12" />
            <p className="text-signalGray text-[14px]">{t('empty_cart')}</p>
          </div>
        ) : (
          <>
            <div className="custom-scrollbar flex max-h-[300px] flex-col gap-[8px] overflow-y-auto">
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
