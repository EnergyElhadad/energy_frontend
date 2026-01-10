'use client';

import { useTranslations } from 'next-intl';
import { HeartIcon } from '@/shared/components/icons/Heart';
import { useWishlist } from '../hooks/useWishlist';
import { CartItem } from './CartItem';
import { Dropdown } from '@/shared/components/ui/Dropdown';

import { Link } from '@/core/i18n';
import { HeaderActionButton } from './HeaderActionButton';

export const WishlistDropdown = () => {
  const t = useTranslations('Header');
  const { items, updateQuantity } = useWishlist();

  return (
    <Dropdown
      trigger={
        <HeaderActionButton
          icon={<HeartIcon className="text-primary" />}
          badgeCount={items.length}
          aria-label={t('wishlist')}
        />
      }
      triggerMode="hover"
    >
      <div className="">
        <h3 className="text-[14px] font-semibold mb-[7px]">{t('wishlist')}</h3>
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
        <Link href='/wishlist' className="text-[14px] font-semibold h-[42px] w-full flex items-center justify-center border border-primary rounded-[8px] text-primary mt-[12px] transition-all duration-300 ease-in-out hover:bg-primary hover:text-white">
          {t('got_to_wishlist')}
        </Link>
      </div>
    </Dropdown>
  );
};
