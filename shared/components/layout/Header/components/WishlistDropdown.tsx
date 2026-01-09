'use client';

import { useTranslations } from 'next-intl';
import { HeartIcon } from '@/shared/components/icons/Heart';
import { useWishlist } from '../hooks/useWishlist';
import { CartItem } from './CartItem';
import { HeaderDropdownButton } from './HeaderDropdownButton';

export const WishlistDropdown = () => {
  const t = useTranslations('Header');
  const { items, updateQuantity } = useWishlist();

  return (
    <HeaderDropdownButton
      icon={<HeartIcon className="text-primary" />}
      badgeCount={items.length}
      href='/wishlist'
      linkText={t('got_to_wishlist')}
      aria-label={t('wishlist')}
      dropdownTitle={t('wishlist')}

      trigger="hover"
    >
      {items.map((item) => (
        <CartItem
          key={item.id}
          product={item}
          quantity={item.quantity}
          onQuantityChange={(val) => updateQuantity(item.id, val)}
        />
      ))}
    </HeaderDropdownButton>
  );
};
