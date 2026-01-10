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
    <Dropdown
      trigger={
        <HeaderActionButton
          icon={<BagIcon className="text-primary" />}
          badgeCount={items.length}
          aria-label={t('cart')}
        />
      }
      triggerMode="hover"
    >
      <div className="">
        <h3 className="text-[14px] font-semibold mb-[7px]">{t('cart')}</h3>
        <div className="flex flex-col gap-[8px] max-h-[300px] overflow-y-auto custom-scrollbar">
          {items.map((item) => (
            <CartItem
              key={item.id}
              product={item}
              quantity={item.quantity}
              onQuantityChange={(val) => updateQuantity(item.id, val)}
            />
          ))}
        </div>
        <Link href='/cart' className="text-[14px] font-semibold h-[42px] w-full flex items-center justify-center border border-primary rounded-[8px] text-primary mt-[12px] transition-all duration-300 ease-in-out hover:bg-primary hover:text-white">
          {t('go_to_cart')}
        </Link>
      </div>
    </Dropdown>
  );
};
